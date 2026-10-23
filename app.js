/* ---------- Sample data (used when the Python server is not running) ---------- */
const DATA = {
    organs: [
        { id: 'eye', name: 'Eye', icon: '👁️' },
        { id: 'kidney', name: 'Kidney', icon: '🫘' },
        { id: 'heart', name: 'Heart', icon: '🫀' },
        { id: 'bones', name: 'Bones & Joints', icon: '🦴' },
        { id: 'skin', name: 'Skin', icon: '🧴' },
        { id: 'teeth', name: 'Teeth', icon: '🦷' }
    ],
    doctors: [
        { id: 'd1', organ: 'eye', name: 'Dr. Anita Sharma', qualification: 'MBBS, MS (Ophthalmology)', experience: 12, fee: 300, days: ['Mon', 'Wed', 'Fri'], start: '10:00', end: '13:00', slot: 20, languages: ['Urdu', 'English'] },
        { id: 'd2', organ: 'eye', name: 'Dr. Rakesh Verma', qualification: 'MBBS, DOMS', experience: 8, fee: 250, days: ['Tue', 'Thu', 'Sat'], start: '15:00', end: '18:00', slot: 20, languages: ['Urdu', 'English'] },
        { id: 'd3', organ: 'kidney', name: 'Dr. Suresh Menon', qualification: 'MD, DM (Nephrology)', experience: 18, fee: 700, days: ['Mon', 'Tue', 'Thu'], start: '09:00', end: '12:00', slot: 30, languages: ['Urdu', 'English'] },
        { id: 'd4', organ: 'kidney', name: 'Dr. Pooja Nair', qualification: 'MD, DNB (Nephrology)', experience: 10, fee: 600, days: ['Wed', 'Fri', 'Sat'], start: '14:00', end: '17:00', slot: 30, languages: ['Urdu', 'English'] },
        { id: 'd5', organ: 'heart', name: 'Dr. Amit Kapoor', qualification: 'MD, DM (Cardiology)', experience: 20, fee: 800, days: ['Mon', 'Wed', 'Fri'], start: '10:00', end: '13:00', slot: 30, languages: ['Urdu', 'English'] },
        { id: 'd6', organ: 'heart', name: 'Dr. Neha Joshi', qualification: 'MBBS, MD (Medicine), Fellowship Cardiology', experience: 9, fee: 600, days: ['Tue', 'Thu', 'Sat'], start: '16:00', end: '19:00', slot: 30, languages: ['Hindi', 'Marathi'] },
        { id: 'd7', organ: 'bones', name: 'Dr. Harpreet Singh', qualification: 'MBBS, MS (Orthopaedics)', experience: 15, fee: 500, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], start: '11:00', end: '14:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd8', organ: 'bones', name: 'Dr. Kavita Rao', qualification: 'MBBS, DNB (Orthopaedics)', experience: 7, fee: 400, days: ['Sat', 'Sun'], start: '10:00', end: '13:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd9', organ: 'skin', name: 'Dr. Imran Khan', qualification: 'MBBS, MD (Dermatology)', experience: 11, fee: 350, days: ['Mon', 'Thu', 'Sat'], start: '10:00', end: '13:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd10', organ: 'skin', name: 'Dr. Sunita Das', qualification: 'MBBS, DVD', experience: 6, fee: 300, days: ['Tue', 'Fri'], start: '15:00', end: '18:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd11', organ: 'teeth', name: 'Dr. Vikram Patel', qualification: 'BDS, MDS (Oral Surgery)', experience: 13, fee: 300, days: ['Mon', 'Wed', 'Fri', 'Sat'], start: '10:00', end: '14:00', slot: 30, languages: ['Urdu', 'English'] },
        { id: 'd12', organ: 'teeth', name: 'Dr. Meera Iyer', qualification: 'BDS', experience: 5, fee: 200, days: ['Tue', 'Thu'], start: '14:00', end: '17:00', slot: 30, languages: ['Urdu', 'English'] }
    ]
};

const app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const to12 = (t) => { let [h, m] = t.split(':').map(Number); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${String(m).padStart(2, '0')} ${ap}`; };

/* ---------- Data layer: uses the Python server if running, otherwise the sample data ---------- */
class ApiErr extends Error { }
let useLocal = false;
async function api(path, opts) {
    if (!useLocal) {
        try {
            const r = await fetch(path, opts);
            if ((r.headers.get('content-type') || '').includes('json')) {
                const j = await r.json();
                if (!r.ok) throw new ApiErr(j.error || 'Something went wrong. Please try again.');
                return j;
            }
        } catch (e) { if (e instanceof ApiErr) throw e; }
        useLocal = true;
    }
    return localApi(path, opts);
}

let mem = [];
const getAppts = () => { try { return JSON.parse(localStorage.getItem('appts') || '[]'); } catch (e) { return mem; } };
const setAppts = (a) => { mem = a; try { localStorage.setItem('appts', JSON.stringify(a)); } catch (e) { } };

function slotsFor(doc, date, appts) {
    const d = new Date(date + 'T00:00:00');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(d)) return null;
    if (!doc.days.includes(DAY[d.getDay()])) return [];
    const [sh, sm] = doc.start.split(':').map(Number), [eh, em] = doc.end.split(':').map(Number), out = [];
    for (let m = sh * 60 + sm; m + doc.slot <= eh * 60 + em; m += doc.slot) {
        const t = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
        out.push({ time: t, booked: appts.some((a) => a.doctorId === doc.id && a.date === date && a.time === t) });
    }
    return out;
}

function localApi(path, opts) {
    const [p, q] = path.split('?'), qs = new URLSearchParams(q || ''), x = p.split('/').filter(Boolean);
    const bad = (m) => { throw new ApiErr(m); };
    if (x[1] === 'organs' && !x[2]) return DATA.organs.map((o) => ({ ...o, doctorCount: DATA.doctors.filter((d) => d.organ === o.id).length }));
    if (x[1] === 'organs' && x[3] === 'doctors') {
        const organ = DATA.organs.find((o) => o.id === x[2]); if (!organ) bad('This body part was not found.');
        return { organ, doctors: DATA.doctors.filter((d) => d.organ === organ.id) };
    }
    if (x[1] === 'doctors') {
        const doc = DATA.doctors.find((d) => d.id === x[2]); if (!doc) bad('This doctor was not found.');
        if (x[3] === 'slots') {
            const s = slotsFor(doc, qs.get('date') || '', getAppts()); if (s === null) bad('Date must look like 2026-10-25.');
            return { date: qs.get('date'), slots: s };
        }
        return { doctor: doc, organ: DATA.organs.find((o) => o.id === doc.organ) };
    }
    if (x[1] === 'appointments' && opts && opts.method === 'POST') {
        const b = JSON.parse(opts.body), name = String(b.patientName || '').trim(), phone = String(b.phone || '').replace(/\D/g, '');
        if (name.length < 2) bad('Enter the patient name.');
        if (phone.length < 10) bad('Enter a 10-digit mobile number.');
        const doc = DATA.doctors.find((d) => d.id === b.doctorId); if (!doc) bad('This doctor was not found.');
        const last = new Date(); last.setDate(last.getDate() + 14);
        if (b.date < iso(new Date()) || b.date > iso(last)) bad('Choose a date within the next 14 days.');
        const all = getAppts(), slot = (slotsFor(doc, b.date, all) || []).find((s) => s.time === b.time);
        if (!slot) bad('The doctor does not see patients at this time.');
        if (slot.booked) bad('This time was just taken. Please choose another.');
        const a = { id: 'APT' + Math.random().toString(36).slice(2, 8).toUpperCase(), doctorId: doc.id, date: b.date, time: b.time, patientName: name, phone, fee: doc.fee };
        all.push(a); setAppts(all); return a;
    }
    bad('Not found.');
}

/* ---------- Screens ---------- */
async function route() {
    const [, page, id] = location.hash.split('/');
    app.innerHTML = '<p class="note">Loading…</p>';
    try {
        if (page === 'organ') await organView(id);
        else if (page === 'doctor') await doctorView(id);
        else await home();
    } catch (e) {
        app.innerHTML = `<p class="err">${esc(e.message)}</p><p><a class="back" href="#/">Back to home</a></p>`;
    }
    window.scrollTo(0, 0);
}

// Screen 1: choose a body part
async function home() {
    const organs = await api('/api/organs');
    app.innerHTML = `
    <h1>Which part of your body needs a doctor?</h1>
    <p class="sub">Tap one to see the doctors for it.</p>
    <div class="grid">${organs.map((o) => `
      <a class="organ" href="#/organ/${o.id}"><span class="ico" aria-hidden="true">${o.icon}</span><b>${esc(o.name)}</b><small>${o.doctorCount} doctors</small></a>`).join('')}
    </div>`;
}

// Screen 2: doctors for that body part
async function organView(id) {
    const { organ, doctors } = await api(`/api/organs/${encodeURIComponent(id)}/doctors`);
    app.innerHTML = `
    <a class="back" href="#/">‹ All body parts</a>
    <h1>${organ.icon} ${esc(organ.name)} doctors</h1>
    <p class="sub">Tap a doctor to see timings, fees and book a visit.</p>
    ${doctors.map((d) => `
      <div class="doc">
        <h3>${esc(d.name)}</h3>
        <p>${esc(d.qualification)} · ${d.experience} years experience</p>
        <p>Available: ${d.days.join(', ')}, ${to12(d.start)} to ${to12(d.end)}</p>
        <div class="row"><span class="fee">₹${d.fee}</span><a class="btn" href="#/doctor/${d.id}">See details and book</a></div>
      </div>`).join('')}`;
}

// Screen 3: doctor details and booking
async function doctorView(id) {
    const { doctor: d, organ } = await api(`/api/doctors/${encodeURIComponent(id)}`);
    const days = [];
    for (let i = 0; i < 7; i++) { const x = new Date(); x.setDate(x.getDate() + i); days.push(x); }
    app.innerHTML = `
    <a class="back" href="#/organ/${organ.id}">‹ ${esc(organ.name)} doctors</a>
    <h1>${esc(d.name)}</h1>
    <p class="sub">${esc(d.qualification)} · ${esc(d.languages.join(', '))}</p>
    <div class="facts">
      <div class="fact"><small>Consultation fee</small><b>₹${d.fee}</b></div>
      <div class="fact"><small>Experience</small><b>${d.experience} years</b></div>
      <div class="fact"><small>Days</small><b>${d.days.join(', ')}</b></div>
      <div class="fact"><small>Timings</small><b>${to12(d.start)} to ${to12(d.end)}</b></div>
    </div>
    <h2>How to book</h2>
    <ol class="steps"><li>Choose a day.</li><li>Choose a time.</li><li>Enter patient name and mobile number.</li><li>Tap "Book appointment" and note your booking ID.</li></ol>
    <h2>1. Choose a day</h2>
    <div class="chips" id="days">${days.map((x) => {
        const ok = d.days.includes(DAY[x.getDay()]);
        return `<button class="chip" data-date="${iso(x)}" aria-pressed="false" ${ok ? '' : 'disabled'}>${DAY[x.getDay()]} ${x.getDate()}/${x.getMonth() + 1}</button>`;
    }).join('')}</div>
    <p class="note">Greyed days: the doctor is not available.</p>
    <div id="slotsBox"></div>
    <div id="formBox"></div>`;

    let date = '', time = '';
    const slotsBox = document.getElementById('slotsBox'), formBox = document.getElementById('formBox');

    document.getElementById('days').addEventListener('click', async (e) => {
        const b = e.target.closest('.chip');
        if (!b || b.disabled) return;
        document.querySelectorAll('#days .chip').forEach((c) => c.setAttribute('aria-pressed', c === b));
        date = b.dataset.date; time = ''; formBox.innerHTML = '';
        slotsBox.innerHTML = '<p class="note">Loading times…</p>';
        try { renderSlots((await api(`/api/doctors/${d.id}/slots?date=${date}`)).slots); }
        catch (err) { slotsBox.innerHTML = `<p class="err">${esc(err.message)}</p>`; }
    });

    function renderSlots(slots) {
        if (!slots.length) { slotsBox.innerHTML = '<p class="note">No times on this day.</p>'; return; }
        const free = slots.filter((s) => !s.booked).length;
        slotsBox.innerHTML = `<h2>2. Choose a time</h2>
      <p class="note">${free} of ${slots.length} times free. Crossed-out times are taken.</p>
      <div class="chips" id="slots">${slots.map((s) => `<button class="chip" data-time="${s.time}" aria-pressed="false" ${s.booked ? 'disabled' : ''}>${to12(s.time)}</button>`).join('')}</div>`;
        document.getElementById('slots').addEventListener('click', (e) => {
            const b = e.target.closest('.chip');
            if (!b || b.disabled) return;
            document.querySelectorAll('#slots .chip').forEach((c) => c.setAttribute('aria-pressed', c === b));
            time = b.dataset.time; renderForm();
        });
    }

    function renderForm() {
        formBox.innerHTML = `<h2>3. Patient details</h2>
      <form id="bookForm" novalidate>
        <label for="pn">Patient name</label><input id="pn" autocomplete="name" required>
        <label for="ph">Mobile number</label><input id="ph" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel" required>
        <p id="msg" role="alert"></p>
        <button class="btn" type="submit">Book appointment</button>
      </form>`;
        document.getElementById('bookForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button'); btn.disabled = true;
            try {
                const a = await api('/api/appointments', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ doctorId: d.id, date, time, patientName: document.getElementById('pn').value, phone: document.getElementById('ph').value })
                });
                app.innerHTML = `<div class="ok"><h2>Appointment booked</h2>
          <p><b>Booking ID: ${esc(a.id)}</b> (write this down)</p>
          <p>${esc(d.name)}<br>${esc(a.date)} at ${to12(a.time)}<br>Patient: ${esc(a.patientName)} · ${esc(a.phone)}<br>Fee to pay at the clinic: ₹${a.fee}</p></div>
          <p><a class="btn" href="#/">Back to home</a></p>`;
                window.scrollTo(0, 0);
            } catch (err) {
                document.getElementById('msg').innerHTML = `<span class="err">${esc(err.message)}</span>`;
                btn.disabled = false;
                if (/taken/.test(err.message)) document.querySelector('#days .chip[aria-pressed="true"]').click();
            }
        });
    }
}

window.addEventListener('hashchange', route);
route();