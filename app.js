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
        { id: 'd6', organ: 'heart', name: 'Dr. Neha Joshi', qualification: 'MBBS, MD (Medicine), Fellowship Cardiology', experience: 9, fee: 600, days: ['Tue', 'Thu', 'Sat'], start: '16:00', end: '19:00', slot: 30, languages: ['Urdu', 'English'] },
        { id: 'd7', organ: 'bones', name: 'Dr. Harpreet Singh', qualification: 'MBBS, MS (Orthopaedics)', experience: 15, fee: 500, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], start: '11:00', end: '14:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd8', organ: 'bones', name: 'Dr. Kavita Rao', qualification: 'MBBS, DNB (Orthopaedics)', experience: 7, fee: 400, days: ['Sat', 'Sun'], start: '10:00', end: '13:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd9', organ: 'skin', name: 'Dr. Imran Khan', qualification: 'MBBS, MD (Dermatology)', experience: 11, fee: 350, days: ['Mon', 'Thu', 'Sat'], start: '10:00', end: '13:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd10', organ: 'skin', name: 'Dr. Sunita Das', qualification: 'MBBS, DVD', experience: 6, fee: 300, days: ['Tue', 'Fri'], start: '15:00', end: '18:00', slot: 15, languages: ['Urdu', 'English'] },
        { id: 'd11', organ: 'teeth', name: 'Dr. Vikram Patel', qualification: 'BDS, MDS (Oral Surgery)', experience: 13, fee: 300, days: ['Mon', 'Wed', 'Fri', 'Sat'], start: '10:00', end: '14:00', slot: 30, languages: ['Urdu', 'English'] },
        { id: 'd12', organ: 'teeth', name: 'Dr. Meera Iyer', qualification: 'BDS', experience: 5, fee: 200, days: ['Tue', 'Thu'], start: '14:00', end: '17:00', slot: 30, languages: ['Urdu', 'English'] }
    ]
};

/* ---------- Languages: English and Urdu only ---------- */
const UR_ORGAN = { eye: 'آنکھ', kidney: 'گردہ', heart: 'دل', bones: 'ہڈیاں اور جوڑ', skin: 'جلد', teeth: 'دانت' };
const UR_DOC = {
    d1: 'ڈاکٹر انیتا شرما', d2: 'ڈاکٹر راکیش ورما', d3: 'ڈاکٹر سریش مینن', d4: 'ڈاکٹر پوجا نائر',
    d5: 'ڈاکٹر امت کپور', d6: 'ڈاکٹر نیہا جوشی', d7: 'ڈاکٹر ہرپریت سنگھ', d8: 'ڈاکٹر کویتا راؤ',
    d9: 'ڈاکٹر عمران خان', d10: 'ڈاکٹر سنیتا داس', d11: 'ڈاکٹر وکرم پٹیل', d12: 'ڈاکٹر میرا آئر'
};
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_UR = { Sun: 'اتوار', Mon: 'پیر', Tue: 'منگل', Wed: 'بدھ', Thu: 'جمعرات', Fri: 'جمعہ', Sat: 'ہفتہ' };
const LANG_UR = { Urdu: 'اردو', English: 'انگریزی' };

const STR = {
    en: {
        brand: 'Clinic Details Finder', foot: 'Book trusted doctors in a few taps.',
        homeTitle: 'Which part of your body needs a doctor?', homeSub: 'Tap one to see the doctors for it.',
        b1: '12 specialist doctors', b2: 'Online payment', b3: 'Urdu & English',
        doctors: (n) => `${n} doctors`, allParts: '‹ All body parts', organTitle: (n) => `${n} doctors`,
        organSub: 'Tap a doctor to see timings, fees and book a visit.', available: 'Available', to: 'to',
        yrs: (n) => `${n} years experience`, seeBook: 'See details and book', backTo: (n) => `‹ ${n} doctors`,
        fee: 'Consultation fee', exp: 'Experience', years: (n) => `${n} years`, days: 'Days', timings: 'Timings',
        howTo: 'How to book', s1: 'Choose a day.', s2: 'Choose a time.', s3: 'Enter patient name and mobile number.',
        s4: 'Choose how to pay.', s5: 'Confirm and note your booking ID.',
        chooseDay: 'Choose a day', grey: 'Greyed days: the doctor is not available.',
        chooseTime: 'Choose a time', freeOf: (f, n) => `${f} of ${n} times free. Crossed-out times are taken.`,
        noTimes: 'No times on this day.', loadingT: 'Loading times…', loading: 'Loading…',
        details: 'Patient details', pname: 'Patient name', mobile: 'Mobile number',
        payment: 'Payment', card: 'Debit / Credit card', cardS: 'Visa, Mastercard', jazz: 'JazzCash', jazzS: 'Mobile wallet',
        easy: 'Easypaisa', easyS: 'Mobile wallet', clinic: 'Pay at clinic', clinicS: 'Cash on the visit day',
        cardNo: 'Card number', cardName: 'Name on card', expiry: 'Expiry (MM/YY)', cvv: 'CVV',
        walletNo: 'Wallet mobile number (03XXXXXXXXX)',
        demo: 'Demo mode: no real money is charged and card details are never saved.',
        total: 'Total', payBook: (a) => `Pay ${a} and book`, book: 'Book appointment', processing: 'Processing…',
        okTitle: 'Appointment booked', bookingId: 'Booking ID', writeDown: 'Write this down.',
        rDoctor: 'Doctor', rWhen: 'Date and time', rPatient: 'Patient', rFee: 'Fee', rMethod: 'Payment method',
        rStatus: 'Payment status', rTxn: 'Transaction ID', paid: 'Paid', due: 'Pay at clinic',
        home: 'Back to home', print: 'Print receipt', money: (n) => `Rs ${n}`,
        e_name: 'Enter the patient name.', e_phone: 'Enter a valid mobile number (10 to 12 digits).',
        e_doctor: 'This doctor was not found.', e_organ: 'This body part was not found.',
        e_date: 'Date must look like 2026-10-25.', e_range: 'Choose a date within the next 14 days.',
        e_closed: 'The doctor does not see patients at this time.', e_taken: 'This time was just taken. Please choose another.',
        e_method: 'Choose a payment method.', e_card: 'Enter a valid card number.', e_cardname: 'Enter the name on the card.',
        e_expiry: 'Enter a valid expiry date (MM/YY).', e_cvv: 'Enter the 3 or 4 digit CVV.',
        e_wallet: 'Enter a valid wallet number starting with 03 (11 digits).', e_generic: 'Something went wrong. Please try again.'
    },
    ur: {
        brand: 'کلینک معلومات', foot: 'چند ٹیپ میں قابلِ اعتماد ڈاکٹر سے ملاقات بُک کریں۔',
        homeTitle: 'آپ کے جسم کے کس حصے کے لیے ڈاکٹر چاہیے؟', homeSub: 'کسی ایک پر ٹیپ کریں اور اس کے ڈاکٹر دیکھیں۔',
        b1: '12 ماہر ڈاکٹر', b2: 'آن لائن ادائیگی', b3: 'اردو اور انگریزی',
        doctors: (n) => `${n} ڈاکٹر`, allParts: 'تمام اعضا ›', organTitle: (n) => `${n} کے ڈاکٹر`,
        organSub: 'اوقات اور فیس دیکھنے اور ملاقات بُک کرنے کے لیے ڈاکٹر پر ٹیپ کریں۔', available: 'دستیاب', to: 'تا',
        yrs: (n) => `${n} سال کا تجربہ`, seeBook: 'تفصیل دیکھیں اور بُک کریں', backTo: (n) => `${n} کے ڈاکٹر ›`,
        fee: 'مشاورتی فیس', exp: 'تجربہ', years: (n) => `${n} سال`, days: 'دن', timings: 'اوقات',
        howTo: 'بُک کرنے کا طریقہ', s1: 'دن منتخب کریں۔', s2: 'وقت منتخب کریں۔', s3: 'مریض کا نام اور موبائل نمبر لکھیں۔',
        s4: 'ادائیگی کا طریقہ منتخب کریں۔', s5: 'تصدیق کریں اور اپنا بکنگ آئی ڈی نوٹ کریں۔',
        chooseDay: 'دن منتخب کریں', grey: 'دھندلے دن: ڈاکٹر دستیاب نہیں۔',
        chooseTime: 'وقت منتخب کریں', freeOf: (f, n) => `${n} میں سے ${f} اوقات خالی ہیں۔ کٹے ہوئے اوقات بُک ہو چکے ہیں۔`,
        noTimes: 'اس دن کوئی وقت نہیں۔', loadingT: 'اوقات لوڈ ہو رہے ہیں…', loading: 'لوڈ ہو رہا ہے…',
        details: 'مریض کی تفصیل', pname: 'مریض کا نام', mobile: 'موبائل نمبر',
        payment: 'ادائیگی', card: 'ڈیبٹ / کریڈٹ کارڈ', cardS: 'ویزا، ماسٹر کارڈ', jazz: 'جاز کیش', jazzS: 'موبائل والیٹ',
        easy: 'ایزی پیسہ', easyS: 'موبائل والیٹ', clinic: 'کلینک میں ادائیگی', clinicS: 'ملاقات کے دن نقد',
        cardNo: 'کارڈ نمبر', cardName: 'کارڈ پر نام', expiry: 'میعاد (ماہ/سال)', cvv: 'سی وی وی',
        walletNo: 'والیٹ موبائل نمبر (03XXXXXXXXX)',
        demo: 'ڈیمو موڈ: کوئی حقیقی رقم نہیں کٹتی اور کارڈ کی تفصیل محفوظ نہیں کی جاتی۔',
        total: 'کل رقم', payBook: (a) => `${a} ادا کریں اور بُک کریں`, book: 'ملاقات بُک کریں', processing: 'پروسیس ہو رہا ہے…',
        okTitle: 'ملاقات بُک ہو گئی', bookingId: 'بکنگ آئی ڈی', writeDown: 'اسے نوٹ کر لیں۔',
        rDoctor: 'ڈاکٹر', rWhen: 'تاریخ اور وقت', rPatient: 'مریض', rFee: 'فیس', rMethod: 'ادائیگی کا طریقہ',
        rStatus: 'ادائیگی کی صورتحال', rTxn: 'ٹرانزیکشن آئی ڈی', paid: 'ادا شدہ', due: 'کلینک میں ادا کریں',
        home: 'ہوم پر واپس', print: 'رسید پرنٹ کریں', money: (n) => `${n} روپے`,
        e_name: 'مریض کا نام لکھیں۔', e_phone: 'درست موبائل نمبر لکھیں (10 سے 12 ہندسے)۔',
        e_doctor: 'یہ ڈاکٹر نہیں ملا۔', e_organ: 'یہ عضو نہیں ملا۔',
        e_date: 'تاریخ اس طرح ہو: 2026-10-25۔', e_range: 'اگلے 14 دنوں میں سے تاریخ منتخب کریں۔',
        e_closed: 'ڈاکٹر اس وقت مریض نہیں دیکھتے۔', e_taken: 'یہ وقت ابھی بُک ہو گیا ہے۔ براہ کرم دوسرا منتخب کریں۔',
        e_method: 'ادائیگی کا طریقہ منتخب کریں۔', e_card: 'درست کارڈ نمبر لکھیں۔', e_cardname: 'کارڈ پر درج نام لکھیں۔',
        e_expiry: 'درست میعاد لکھیں (ماہ/سال)۔', e_cvv: '3 یا 4 ہندسوں کا سی وی وی لکھیں۔',
        e_wallet: '03 سے شروع ہونے والا درست والیٹ نمبر لکھیں (11 ہندسے)۔', e_generic: 'کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔'
    }
};

let lang = 'en';
try { lang = localStorage.getItem('lang') === 'ur' ? 'ur' : 'en'; } catch (e) { }
const t = (k, ...a) => { const v = STR[lang][k] ?? STR.en[k] ?? k; return typeof v === 'function' ? v(...a) : v; };
const oName = (o) => lang === 'ur' ? UR_ORGAN[o.id] : o.name;
const dName = (d) => lang === 'ur' ? UR_DOC[d.id] : d.name;
const dayName = (d) => lang === 'ur' ? DAY_UR[d] : d;
const langName = (l) => lang === 'ur' ? LANG_UR[l] : l;
const money = (n) => t('money', n);
const METHOD = { card: 'card', jazzcash: 'jazz', easypaisa: 'easy', clinic: 'clinic' };

function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.getElementById('brandText').textContent = t('brand');
    document.getElementById('footText').textContent = t('foot');
    document.getElementById('langEn').setAttribute('aria-pressed', lang === 'en');
    document.getElementById('langUr').setAttribute('aria-pressed', lang === 'ur');
}
function setLang(l) { lang = l; try { localStorage.setItem('lang', l); } catch (e) { } applyLang(); route(); }
document.getElementById('langEn').addEventListener('click', () => setLang('en'));
document.getElementById('langUr').addEventListener('click', () => setLang('ur'));

const app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const to12 = (tm) => {
    let [h, m] = tm.split(':').map(Number);
    const pm = h >= 12; h = h % 12 || 12;
    const ap = lang === 'ur' ? (pm ? 'شام/دوپہر' : 'صبح') : (pm ? 'PM' : 'AM');
    return `${h}:${String(m).padStart(2, '0')} ${ap}`;
};

/* ---------- Data layer: uses the Python server if running, otherwise the sample data ---------- */
class ApiErr extends Error { constructor(msg, key) { super(msg); this.key = key; } }
const errMsg = (e) => (e.key && STR[lang]['e_' + e.key]) || STR[lang].e_generic;
let useLocal = false;
async function api(path, opts) {
    if (!useLocal) {
        try {
            const r = await fetch(path, opts);
            if ((r.headers.get('content-type') || '').includes('json')) {
                const j = await r.json();
                if (!r.ok) throw new ApiErr(j.error, j.key);
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
        const tm = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
        out.push({ time: tm, booked: appts.some((a) => a.doctorId === doc.id && a.date === date && a.time === tm) });
    }
    return out;
}

function luhn(n) {
    let s = 0;
    [...n].reverse().forEach((c, i) => { let d = +c; if (i % 2) { d *= 2; if (d > 9) d -= 9; } s += d; });
    return s % 10 === 0;
}

/* Demo payment processor. Replace with a real gateway (see server.py) before taking real money. */
function localPay(pay, fee) {
    const method = pay.method;
    if (!['card', 'jazzcash', 'easypaisa', 'clinic'].includes(method)) throw new ApiErr('Choose a payment method.', 'method');
    if (method === 'clinic') return { method, status: 'pay_at_clinic' };
    if (method === 'card') {
        const num = String(pay.cardNumber || '').replace(/\D/g, '');
        if (num.length < 13 || num.length > 19 || !luhn(num)) throw new ApiErr('Invalid card.', 'card');
        if (String(pay.cardName || '').trim().length < 2) throw new ApiErr('Name on card.', 'cardname');
        const m = /^(\d{2})\/(\d{2})$/.exec(String(pay.expiry || ''));
        const now = new Date();
        if (!m || +m[1] < 1 || +m[1] > 12 || (2000 + +m[2]) * 12 + +m[1] < now.getFullYear() * 12 + now.getMonth() + 1) throw new ApiErr('Invalid expiry.', 'expiry');
        if (!/^\d{3,4}$/.test(String(pay.cvv || ''))) throw new ApiErr('Invalid CVV.', 'cvv');
        return { method, status: 'paid', txnId: 'TXN' + Math.random().toString(36).slice(2, 10).toUpperCase(), cardLast4: num.slice(-4) };
    }
    const w = String(pay.walletPhone || '').replace(/\D/g, '');
    if (!/^03\d{9}$/.test(w)) throw new ApiErr('Invalid wallet number.', 'wallet');
    return { method, status: 'paid', txnId: 'TXN' + Math.random().toString(36).slice(2, 10).toUpperCase() };
}

function localApi(path, opts) {
    const [p, q] = path.split('?'), qs = new URLSearchParams(q || ''), x = p.split('/').filter(Boolean);
    const bad = (m, k) => { throw new ApiErr(m, k); };
    if (x[1] === 'organs' && !x[2]) return DATA.organs.map((o) => ({ ...o, doctorCount: DATA.doctors.filter((d) => d.organ === o.id).length }));
    if (x[1] === 'organs' && x[3] === 'doctors') {
        const organ = DATA.organs.find((o) => o.id === x[2]); if (!organ) bad('Not found.', 'organ');
        return { organ, doctors: DATA.doctors.filter((d) => d.organ === organ.id) };
    }
    if (x[1] === 'doctors') {
        const doc = DATA.doctors.find((d) => d.id === x[2]); if (!doc) bad('Not found.', 'doctor');
        if (x[3] === 'slots') {
            const s = slotsFor(doc, qs.get('date') || '', getAppts()); if (s === null) bad('Bad date.', 'date');
            return { date: qs.get('date'), slots: s };
        }
        return { doctor: doc, organ: DATA.organs.find((o) => o.id === doc.organ) };
    }
    if (x[1] === 'appointments' && opts && opts.method === 'POST') {
        const b = JSON.parse(opts.body), name = String(b.patientName || '').trim(), phone = String(b.phone || '').replace(/\D/g, '');
        if (name.length < 2) bad('Name.', 'name');
        if (phone.length < 10 || phone.length > 12) bad('Phone.', 'phone');
        const doc = DATA.doctors.find((d) => d.id === b.doctorId); if (!doc) bad('Not found.', 'doctor');
        const last = new Date(); last.setDate(last.getDate() + 14);
        if (b.date < iso(new Date()) || b.date > iso(last)) bad('Range.', 'range');
        const all = getAppts(), slot = (slotsFor(doc, b.date, all) || []).find((s) => s.time === b.time);
        if (!slot) bad('Closed.', 'closed');
        if (slot.booked) bad('Taken.', 'taken');
        const pay = localPay(b.payment || { method: 'clinic' }, doc.fee);
        const a = {
            id: 'APT' + Math.random().toString(36).slice(2, 8).toUpperCase(), doctorId: doc.id, date: b.date, time: b.time,
            patientName: name, phone, fee: doc.fee, paymentMethod: pay.method, paymentStatus: pay.status, txnId: pay.txnId || null, cardLast4: pay.cardLast4 || null
        };
        all.push(a); setAppts(all); return a;
    }
    bad('Not found.', 'generic');
}

/* ---------- Screens ---------- */
async function route() {
    const [, page, id] = location.hash.split('/');
    app.innerHTML = `<p class="note">${t('loading')}</p>`;
    try {
        if (page === 'organ') await organView(id);
        else if (page === 'doctor') await doctorView(id);
        else await home();
    } catch (e) {
        app.innerHTML = `<p class="err">${esc(errMsg(e))}</p><p><a class="back" href="#/">${t('home')}</a></p>`;
    }
    window.scrollTo(0, 0);
}

// Screen 1: choose a body part
async function home() {
    const organs = await api('/api/organs');
    app.innerHTML = `
    <section class="hero">
      <h1>${t('homeTitle')}</h1>
      <p>${t('homeSub')}</p>
      <div class="badges"><span class="badge">🩺 ${t('b1')}</span><span class="badge">💳 ${t('b2')}</span><span class="badge">🌐 ${t('b3')}</span></div>
    </section>
    <div class="grid">${organs.map((o) => `
      <a class="organ" href="#/organ/${o.id}"><span class="ico" aria-hidden="true">${o.icon}</span><b>${esc(oName(o))}</b><small>${t('doctors', o.doctorCount)}</small></a>`).join('')}
    </div>`;
}

// Screen 2: doctors for that body part
async function organView(id) {
    const { organ, doctors } = await api(`/api/organs/${encodeURIComponent(id)}/doctors`);
    app.innerHTML = `
    <a class="back" href="#/">${t('allParts')}</a>
    <h1>${organ.icon} ${esc(t('organTitle', oName(organ)))}</h1>
    <p class="sub">${t('organSub')}</p>
    ${doctors.map((d) => `
      <div class="card doc">
        <div class="avatar" aria-hidden="true">${organ.icon}</div>
        <div class="doc-body">
          <h3>${esc(dName(d))}</h3>
          <p>${esc(d.qualification)}</p>
          <div class="tags"><span class="tag">${t('yrs', d.experience)}</span>${d.languages.map((l) => `<span class="tag">${esc(langName(l))}</span>`).join('')}</div>
          <p>${t('available')}: ${d.days.map(dayName).join('، ').replace(/، /g, lang === 'ur' ? '، ' : ', ')} · ${to12(d.start)} ${t('to')} ${to12(d.end)}</p>
          <div class="row"><span class="fee">${money(d.fee)}</span><a class="btn" href="#/doctor/${d.id}">${t('seeBook')}</a></div>
        </div>
      </div>`).join('')}`;
}

// Screen 3: doctor details, booking and payment
async function doctorView(id) {
    const { doctor: d, organ } = await api(`/api/doctors/${encodeURIComponent(id)}`);
    const days = [];
    for (let i = 0; i < 7; i++) { const x = new Date(); x.setDate(x.getDate() + i); days.push(x); }
    const sep = lang === 'ur' ? '، ' : ', ';
    app.innerHTML = `
    <a class="back" href="#/organ/${organ.id}">${t('backTo', esc(oName(organ)))}</a>
    <h1>${esc(dName(d))}</h1>
    <p class="sub">${esc(d.qualification)} · ${d.languages.map(langName).join(sep)}</p>
    <div class="facts">
      <div class="fact"><small>${t('fee')}</small><b>${money(d.fee)}</b></div>
      <div class="fact"><small>${t('exp')}</small><b>${t('years', d.experience)}</b></div>
      <div class="fact"><small>${t('days')}</small><b>${d.days.map(dayName).join(sep)}</b></div>
      <div class="fact"><small>${t('timings')}</small><b>${to12(d.start)} ${t('to')} ${to12(d.end)}</b></div>
    </div>
    <div class="card">
      <h2>${t('howTo')}</h2>
      <ol class="steps"><li>${t('s1')}</li><li>${t('s2')}</li><li>${t('s3')}</li><li>${t('s4')}</li><li>${t('s5')}</li></ol>
    </div>
    <div class="card">
      <h2 class="sec-title"><span class="num">1</span>${t('chooseDay')}</h2>
      <div class="chips" id="days">${days.map((x) => {
        const ok = d.days.includes(DAY[x.getDay()]);
        return `<button class="chip" data-date="${iso(x)}" aria-pressed="false" ${ok ? '' : 'disabled'}>${dayName(DAY[x.getDay()])} ${x.getDate()}/${x.getMonth() + 1}</button>`;
    }).join('')}</div>
      <p class="note">${t('grey')}</p>
    </div>
    <div id="slotsBox"></div>
    <div id="formBox"></div>`;

    let date = '', time = '', method = 'card';
    const slotsBox = document.getElementById('slotsBox'), formBox = document.getElementById('formBox');

    document.getElementById('days').addEventListener('click', async (e) => {
        const b = e.target.closest('.chip');
        if (!b || b.disabled) return;
        document.querySelectorAll('#days .chip').forEach((c) => c.setAttribute('aria-pressed', c === b));
        date = b.dataset.date; time = ''; formBox.innerHTML = '';
        slotsBox.innerHTML = `<p class="note">${t('loadingT')}</p>`;
        try { renderSlots((await api(`/api/doctors/${d.id}/slots?date=${date}`)).slots); }
        catch (err) { slotsBox.innerHTML = `<p class="err">${esc(errMsg(err))}</p>`; }
    });

    function renderSlots(slots) {
        if (!slots.length) { slotsBox.innerHTML = `<div class="card"><p class="note">${t('noTimes')}</p></div>`; return; }
        const free = slots.filter((s) => !s.booked).length;
        slotsBox.innerHTML = `<div class="card"><h2 class="sec-title"><span class="num">2</span>${t('chooseTime')}</h2>
      <p class="note">${t('freeOf', free, slots.length)}</p>
      <div class="chips" id="slots">${slots.map((s) => `<button class="chip" data-time="${s.time}" aria-pressed="false" ${s.booked ? 'disabled' : ''}>${to12(s.time)}</button>`).join('')}</div></div>`;
        document.getElementById('slots').addEventListener('click', (e) => {
            const b = e.target.closest('.chip');
            if (!b || b.disabled) return;
            document.querySelectorAll('#slots .chip').forEach((c) => c.setAttribute('aria-pressed', c === b));
            time = b.dataset.time; renderForm();
        });
    }

    function payFields() {
        if (method === 'card') return `
        <label for="cn">${t('cardNo')}</label><input id="cn" class="ltr" inputmode="numeric" autocomplete="cc-number" maxlength="23" placeholder="1234 5678 9012 3456">
        <label for="cnm">${t('cardName')}</label><input id="cnm" class="ltr" autocomplete="cc-name">
        <div class="two"><div><label for="ce">${t('expiry')}</label><input id="ce" class="ltr" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/YY"></div>
        <div><label for="cv">${t('cvv')}</label><input id="cv" class="ltr" type="password" inputmode="numeric" autocomplete="cc-csc" maxlength="4"></div></div>`;
        if (method === 'clinic') return '';
        return `<label for="wn">${t('walletNo')}</label><input id="wn" class="ltr" type="tel" inputmode="numeric" maxlength="11" placeholder="03XXXXXXXXX">`;
    }

    function renderForm() {
        const opts = [['card', '💳', 'card', 'cardS'], ['jazzcash', '📱', 'jazz', 'jazzS'], ['easypaisa', '📲', 'easy', 'easyS'], ['clinic', '🏥', 'clinic', 'clinicS']];
        formBox.innerHTML = `<div class="card"><h2 class="sec-title"><span class="num">3</span>${t('details')}</h2>
      <form id="bookForm" novalidate>
        <label for="pn">${t('pname')}</label><input id="pn" autocomplete="name" required>
        <label for="ph">${t('mobile')}</label><input id="ph" class="ltr" type="tel" inputmode="numeric" maxlength="12" autocomplete="tel" required>
        <h2 class="sec-title" style="margin-top:26px"><span class="num">4</span>${t('payment')}</h2>
        <div class="pay-opts">${opts.map((o) => `<button type="button" class="pay-opt" data-m="${o[0]}" aria-pressed="${o[0] === method}"><span class="pi">${o[1]}</span><span><b>${t(o[2])}</b><small>${t(o[3])}</small></span></button>`).join('')}</div>
        <div id="payBox">${payFields()}</div>
        <div class="demo" id="demoNote" ${method === 'clinic' ? 'hidden' : ''}>${t('demo')}</div>
        <div class="summary"><span>${t('total')}</span><span>${money(d.fee)}</span></div>
        <div id="msg" role="alert"></div>
        <button class="btn block" type="submit" id="payBtn" style="margin-top:14px">${method === 'clinic' ? t('book') : t('payBook', money(d.fee))}</button>
      </form></div>`;
        wirePay();
        document.getElementById('bookForm').addEventListener('submit', submit);
        formBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function wirePay() {
        const cn = document.getElementById('cn'), ce = document.getElementById('ce');
        if (cn) cn.addEventListener('input', () => { cn.value = cn.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim(); });
        if (ce) ce.addEventListener('input', () => { let v = ce.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); ce.value = v; });
        document.querySelectorAll('.pay-opt').forEach((b) => b.addEventListener('click', () => {
            method = b.dataset.m;
            document.querySelectorAll('.pay-opt').forEach((x) => x.setAttribute('aria-pressed', x === b));
            document.getElementById('payBox').innerHTML = payFields();
            document.getElementById('demoNote').hidden = method === 'clinic';
            document.getElementById('payBtn').textContent = method === 'clinic' ? t('book') : t('payBook', money(d.fee));
            wirePay();
        }));
    }

    async function submit(e) {
        e.preventDefault();
        const btn = document.getElementById('payBtn'), label = btn.textContent;
        btn.disabled = true; btn.textContent = t('processing');
        const v = (i) => { const el = document.getElementById(i); return el ? el.value : ''; };
        try {
            const a = await api('/api/appointments', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId: d.id, date, time, patientName: v('pn'), phone: v('ph'),
                    payment: { method, cardNumber: v('cn'), cardName: v('cnm'), expiry: v('ce'), cvv: v('cv'), walletPhone: v('wn') }
                })
            });
            showReceipt(a);
        } catch (err) {
            document.getElementById('msg').innerHTML = `<span class="err">${esc(errMsg(err))}</span>`;
            btn.disabled = false; btn.textContent = label;
            if (err.key === 'taken') document.querySelector('#days .chip[aria-pressed="true"]').click();
        }
    }

    function showReceipt(a) {
        const paid = a.paymentStatus === 'paid';
        const via = t(METHOD[a.paymentMethod] || 'clinic') + (a.cardLast4 ? ` ····${a.cardLast4}` : '');
        app.innerHTML = `<div class="ok"><h2>✔ ${t('okTitle')}</h2>
          <p><b>${t('bookingId')}: ${esc(a.id)}</b> — ${t('writeDown')}</p>
          <table class="receipt">
            <tr><td>${t('rDoctor')}</td><td>${esc(dName(d))}</td></tr>
            <tr><td>${t('rWhen')}</td><td><span class="ltr">${esc(a.date)}</span> · ${to12(a.time)}</td></tr>
            <tr><td>${t('rPatient')}</td><td>${esc(a.patientName)} · <span class="ltr">${esc(a.phone)}</span></td></tr>
            <tr><td>${t('rFee')}</td><td>${money(a.fee)}</td></tr>
            <tr><td>${t('rMethod')}</td><td>${esc(via)}</td></tr>
            <tr><td>${t('rStatus')}</td><td><span class="status ${paid ? 'paid' : 'due'}">${paid ? t('paid') : t('due')}</span></td></tr>
            ${a.txnId ? `<tr><td>${t('rTxn')}</td><td class="ltr">${esc(a.txnId)}</td></tr>` : ''}
          </table>
          <div class="actions"><a class="btn" href="#/">${t('home')}</a><button class="btn ghost" onclick="window.print()">${t('print')}</button></div></div>`;
        window.scrollTo(0, 0);
    }
}

window.addEventListener('hashchange', route);
applyLang();
route();