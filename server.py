import json, os, threading, uuid, datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs, unquote

BASE = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE, "db.json")
LOCK = threading.Lock()
DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]  # date.weekday(): Monday = 0
MAX_DAYS_AHEAD = 14
STATIC = {  # the website files this server hands to the browser
    "/": ("index.html", "text/html; charset=utf-8"),
    "/index.html": ("index.html", "text/html; charset=utf-8"),
    "/style.css": ("style.css", "text/css; charset=utf-8"),
    "/app.js": ("app.js", "application/javascript; charset=utf-8"),
}


class ApiError(Exception):
    def __init__(self, code, msg):
        self.code, self.msg = code, msg


def load():
    with open(DB_FILE, encoding="utf-8") as f:
        return json.load(f)


def save(db):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, indent=2, ensure_ascii=False)


def slots_for(doc, date, appts):
    try:
        d = datetime.datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise ApiError(400, "Date must look like 2026-10-25.")
    if DAYS[d.weekday()] not in doc["days"]:
        return []
    sh, sm = map(int, doc["start"].split(":"))
    eh, em = map(int, doc["end"].split(":"))
    out, m = [], sh * 60 + sm
    while m + doc["slot"] <= eh * 60 + em:
        t = f"{m // 60:02d}:{m % 60:02d}"
        booked = any(a["doctorId"] == doc["id"] and a["date"] == date and a["time"] == t for a in appts)
        out.append({"time": t, "booked": booked})
        m += doc["slot"]
    return out


def digits(s):
    return "".join(c for c in str(s or "") if c.isdigit())


def route(method, path, query, body):
    db = load()
    p = [unquote(x) for x in path.strip("/").split("/")]
    if p[0] != "api":
        raise ApiError(404, "Not found.")
    p = p[1:]

    if method == "GET" and p == ["organs"]:
        return 200, [dict(o, doctorCount=sum(1 for d in db["doctors"] if d["organ"] == o["id"])) for o in db["organs"]]

    if method == "GET" and len(p) == 3 and p[0] == "organs" and p[2] == "doctors":
        organ = next((o for o in db["organs"] if o["id"] == p[1]), None)
        if not organ:
            raise ApiError(404, "This body part was not found.")
        return 200, {"organ": organ, "doctors": [d for d in db["doctors"] if d["organ"] == organ["id"]]}

    if method == "GET" and len(p) >= 2 and p[0] == "doctors":
        doc = next((d for d in db["doctors"] if d["id"] == p[1]), None)
        if not doc:
            raise ApiError(404, "This doctor was not found.")
        if len(p) == 3 and p[2] == "slots":
            date = query.get("date", [""])[0]
            return 200, {"date": date, "slots": slots_for(doc, date, db["appointments"])}
        return 200, {"doctor": doc, "organ": next(o for o in db["organs"] if o["id"] == doc["organ"])}

    if method == "POST" and p == ["appointments"]:
        name = str(body.get("patientName", "")).strip()
        phone = digits(body.get("phone"))
        if len(name) < 2:
            raise ApiError(400, "Enter the patient name.")
        if len(phone) < 10:
            raise ApiError(400, "Enter a 10-digit mobile number.")
        doc = next((d for d in db["doctors"] if d["id"] == body.get("doctorId")), None)
        if not doc:
            raise ApiError(404, "This doctor was not found.")
        date, time_ = str(body.get("date", "")), body.get("time")
        today = datetime.date.today()
        try:
            day = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            raise ApiError(400, "Date must look like 2026-10-25.")
        if not (today <= day <= today + datetime.timedelta(days=MAX_DAYS_AHEAD)):
            raise ApiError(400, f"Choose a date within the next {MAX_DAYS_AHEAD} days.")
        slot = next((s for s in slots_for(doc, date, db["appointments"]) if s["time"] == time_), None)
        if not slot:
            raise ApiError(400, "The doctor does not see patients at this time.")
        if slot["booked"]:
            raise ApiError(409, "This time was just taken. Please choose another.")
        appt = {"id": "APT" + uuid.uuid4().hex[:6].upper(), "doctorId": doc["id"], "date": date, "time": time_,
                "patientName": name, "phone": phone, "fee": doc["fee"],
                "createdAt": datetime.datetime.now().isoformat()}
        db["appointments"].append(appt)
        save(db)
        return 201, appt

    if method == "GET" and p == ["appointments"]:
        phone = digits(query.get("phone", [""])[0])
        if len(phone) < 10:
            raise ApiError(400, "Enter a 10-digit mobile number.")
        return 200, [a for a in db["appointments"] if a["phone"] == phone]

    if method == "DELETE" and len(p) == 2 and p[0] == "appointments":
        phone = digits(query.get("phone", [""])[0])
        keep = [a for a in db["appointments"] if not (a["id"] == p[1] and a["phone"] == phone)]
        if len(keep) == len(db["appointments"]):
            raise ApiError(404, "No booking found with this ID and mobile number.")
        db["appointments"] = keep
        save(db)
        return 200, {"cancelled": True}

    raise ApiError(404, "Not found.")


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, payload, ctype="application/json; charset=utf-8"):
        data = payload if isinstance(payload, bytes) else json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _handle(self, method):
        url = urlparse(self.path)
        if method == "GET" and url.path in STATIC:
            fname, ctype = STATIC[url.path]
            with open(os.path.join(BASE, fname), "rb") as f:
                return self._send(200, f.read(), ctype)
        try:
            body = {}
            if method == "POST":
                n = int(self.headers.get("Content-Length", 0))
                body = json.loads(self.rfile.read(n) or b"{}")
            with LOCK:
                code, payload = route(method, url.path, parse_qs(url.query), body)
            self._send(code, payload)
        except ApiError as e:
            self._send(e.code, {"error": e.msg})
        except Exception as e:
            self._send(500, {"error": "Server error. Please try again."})
            print("Error:", e)

    def do_GET(self): self._handle("GET")
    def do_POST(self): self._handle("POST")
    def do_DELETE(self): self._handle("DELETE")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    print(f"Hospital app running at http://localhost:{port}")
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()