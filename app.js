/* ---------------- helmet asset map ---------------- */
const VIEW_FILES = { F: 'front', BK: 'back', T: 'top', L: 'left', R: 'right', BT: 'bottom' };

/* ---------------- data ---------------- */
const VIEWS = [['F', 'Front'], ['BK', 'Back'], ['T', 'Top'], ['L', 'Left'], ['R', 'Right'], ['BT', 'Bottom']];
const PARTS = {
  F:  [['visor', 'Visor / kaca'], ['karet', 'Karet list'], ['logo', 'Logo depan']],
  BK: [['logo_b', 'Logo Belakang'], ['shell_b', 'Shell Belakang']],
  T:  [['topvent', 'Top Vent'], ['shell_t', 'Shell Atas']],
  L:  [['vmount_l', 'Visor Mount'], ['intercom', 'Intercom']],
  R:  [['vmount_r', 'Visor Mount']],
  BT: [['crown', 'Crown Pad'], ['cheek', 'Cheek Pad'], ['neck', 'Neck Roll'], ['strap', 'Chin Strap']],
};
const HS = {
  F:  { logo: [171, 134], visor: [171, 183], karet: [105, 229] },
  BK: { logo_b: [171, 141], shell_b: [105, 229] },
  T:  { topvent: [171, 138], shell_t: [171, 229] },
  L:  { vmount_l: [199, 159], intercom: [111, 214] },
  R:  { vmount_r: [142, 159] },
  BT: { crown: [171, 141], cheek: [103, 229], strap: [171, 229], neck: [171, 300] },
};
/* a = mitigasi (langkah pencegahan agar risiko tak terjadi saat dicuci)
   k = kompensasi bila risiko tetap terjadi — bisa berupa uang, service tambahan gratis, atau tidak ada */
const RISK = {
  visor:    { n: 'Visor / Kaca',       p: 'Prioritas Tinggi', d: 'Visor sudah tergores dalam dan retak; rawan pecah atau makin parah saat dibersihkan.',              a: 'Bersihkan manual pakai kain microfiber lembut; hindari sikat dan air bertekanan tinggi.', k: 'Ganti unit visor (Rp 150.000)' },
  karet:    { n: 'Karet List',         p: 'Sedang',           d: 'Karet list mengeras dan getas; rawan sobek atau terlepas saat terkena air.',                       a: 'Cuci lembut di sekitar list; hindari semprotan air bertekanan langsung ke karet.',       k: 'Rekat ulang gratis'            },
  logo:     { n: 'Logo Depan',         p: 'Rendah',           d: 'Stiker logo depan sudah terkelupas sebagian; bersifat kosmetik.',                                  a: 'Lap searah dengan pelan di area stiker; tidak digosok.',                                  k: 'Tidak ada'                     },
  logo_b:   { n: 'Logo Belakang',      p: 'Rendah',           d: 'Stiker logo belakang mulai terkelupas; bersifat kosmetik.',                                        a: 'Lap searah dengan pelan di area stiker; tidak digosok.',                                  k: 'Tidak ada'                     },
  shell_b:  { n: 'Shell Belakang',     p: 'Sedang',           d: 'Ada baret halus pada shell belakang; bisa bertambah bila salah poles.',                            a: 'Gunakan kain microfiber dan cairan poles non-abrasif.',                                   k: 'Poles ulang gratis'            },
  topvent:  { n: 'Top Vent',           p: 'Sedang',           d: 'Klip top vent longgar; rawan patah atau hilang saat dibuka untuk dibersihkan.',                    a: 'Bersihkan tanpa membongkar paksa; lepas-pasang klip dengan hati-hati.',                   k: 'Ganti klip vent (Rp 30.000)'   },
  shell_t:  { n: 'Shell Atas',         p: 'Sedang',           d: 'Ada baret halus pada shell atas; bisa bertambah bila salah poles.',                                a: 'Gunakan kain microfiber dan cairan poles non-abrasif.',                                   k: 'Poles ulang gratis'            },
  vmount_l: { n: 'Visor Mount Kiri',   p: 'Sedang',           d: 'Dudukan visor kiri longgar; sekrup rawan lepas atau hilang saat visor dilepas.',                   a: 'Tandai dan simpan sekrup; kencangkan kembali setelah dicuci.',                            k: 'Ganti dudukan (Rp 35.000)'     },
  vmount_r: { n: 'Visor Mount Kanan',  p: 'Sedang',           d: 'Dudukan visor kanan longgar; sekrup rawan lepas atau hilang saat visor dilepas.',                  a: 'Tandai dan simpan sekrup; kencangkan kembali setelah dicuci.',                            k: 'Ganti dudukan (Rp 35.000)'     },
  intercom: { n: 'Intercom',           p: 'Prioritas Tinggi', d: 'Modul elektronik; rawan rusak permanen bila terkena air saat pencucian.',                          a: 'Lepas intercom dari helm sebelum proses cuci dimulai.',                                   k: 'Tidak ada'                     },
  crown:    { n: 'Crown Pad',          p: 'Sedang',           d: 'Crown pad sobek atau lepas dari dudukan; bisa makin lepas saat dicuci.',                           a: 'Cuci pad secara terpisah dengan tangan; tidak diperas keras.',                            k: 'Jahit ulang gratis'            },
  cheek:    { n: 'Cheek Pad',          p: 'Rendah',           d: 'Cheek pad berbau atau kotor berlebih.',                                                            a: 'Rendam dan cuci terpisah dengan sabun lembut.',                                           k: 'Cuci ulang gratis'             },
  neck:     { n: 'Neck Roll',          p: 'Rendah',           d: 'Neck roll sedikit lepas dari jahitan; rawan tertarik saat dicuci.',                                a: 'Cuci dengan tangan; hindari tarikan pada bagian yang lepas.',                             k: 'Jahit ulang gratis'            },
  strap:    { n: 'Chin Strap',         p: 'Sedang',           d: 'Chin strap aus dan kunci D-ring perlu diperiksa; menyangkut keamanan.',                            a: 'Hindari rendam terlalu lama; keringkan menyeluruh agar tidak lembap.',                    k: 'Ganti tali/D-ring (Rp 25.000)' },
};
const prColor = p => p === 'Prioritas Tinggi' ? 'var(--red)' : p === 'Sedang' ? 'var(--amber)' : '#9aa0a6';

/* ---------------- service pricing ---------------- */
const TYPE_PRICE = { 'Standar': 35000, 'Full Face': 45000 };
const FINISH = {
  none:   { n: 'Tanpa', delta: 0,     t: 'Tanpa treatment finish khusus.' },
  glossy: { n: 'Glossy', delta: 0,     t: 'Poles standar agar cat kembali berkilau.' },
  doff:   { n: 'Doff',   delta: 15000, t: 'Treatment khusus matte-safe tanpa poles mengkilap.' },
};
const EXTRA_PRICE = 15000;

/* bagian yang disembunyikan per tipe helm (cabang inspeksi).
   Standar = half face (tanpa visor, dudukan visor, dan cheek pad). */
const HIDDEN_PARTS = {
  'Full Face': new Set(),
  'Standar':   new Set(['visor', 'vmount_l', 'vmount_r', 'cheek']),
};
function activeParts(view) {
  const hidden = HIDDEN_PARTS[helmType] || new Set();
  return (PARTS[view] || []).filter(([id]) => !hidden.has(id));
}
/* folder gambar helm per tipe (Standar/half face punya set gambar sendiri) */
function helmDir() { return helmType === 'Standar' ? 'half_face/' : ''; }

/* PIN known only to the seller (prototype). Change to your shop's PIN. */
const SELLER_PIN = '2468';

function rupiah(n) { return 'Rp ' + n.toLocaleString('id-ID'); }

function miniIcon(v) { return `<img src="assets/helm/${helmDir()}${VIEW_FILES[v]}.svg" alt="">`; }

/* ---------------- buyer selections ---------------- */
let curView = 'F';
const tagged = new Set();
let helmType = 'Standar';
let helmFinish = 'none';
let extraOn = false;
let notesOpen = false;
let estimasi = 'Hari ini';
const customNotes = [];
const EST_IDS = { 'Hari ini': 'est-today', 'Besok': 'est-besok', 'Lusa': 'est-lusa' };

/* ---------------- queue / order ---------------- */
const orderCode = 'D-0106-00' + (Math.floor(Math.random() * 7) + 3);
let queueNum = 'A-' + String(Math.floor(Math.random() * 18) + 4).padStart(2, '0');
const params = new URLSearchParams(location.search);
if (params.get('antrian')) queueNum = params.get('antrian');

function submitData() {
  const nama = document.getElementById('in-nama').value.trim();
  if (!nama) { toast('Isi nama dulu ya'); return; }
  const ahead = parseInt(queueNum.replace(/[^0-9]/g, ''), 10) - 1;
  const eta = Math.max(5, ahead * 12);
  document.getElementById('q-num').textContent = queueNum;
  document.getElementById('q-ahead').textContent = ahead + ' helm';
  document.getElementById('q-eta').textContent = '± ' + eta + ' menit';
  document.getElementById('q-code').textContent = orderCode;
  go('s-antrian');
}

/* ---------------- inspeksi ---------------- */
function hotspotSVG(id, x, y) {
  const on = tagged.has(id), w = 30, h = 22;
  let s = `<g style="cursor:pointer" onclick="toggleTag('${id}')">`;
  s += `<rect x="${x - w / 2 - 3}" y="${y - h / 2 - 3}" width="${w + 6}" height="${h + 6}" rx="15" fill="#fff"/>`;
  s += `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="11" fill="${on ? 'var(--green)' : '#eafaef'}" stroke="var(--green)" stroke-width="${on ? 0 : 2.5}"/>`;
  if (on) s += `<path d="M${x - 7},${y} l5,6 l9,-12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  return s + `</g>`;
}

function notesBlock() {
  const chips = customNotes.length
    ? customNotes.map((t, i) => `<span class="chip">${t}<span class="x" onclick="removeNote(${i})">✕</span></span>`).join('')
    : '';
  const body = notesOpen
    ? `<div class="note-add">
         <input class="input" id="note-in" placeholder="mis. Cat ears di top" onkeydown="if(event.key==='Enter')addNote()">
         <button class="note-btn" onclick="addNote()">＋</button>
       </div>
       <div class="chips">${chips}</div>`
    : '';
  return `<div class="toggle-row">
      <div class="switch ${notesOpen ? 'on' : ''}" onclick="toggleNotes()"><div class="knob"></div></div>
      <div>
        <div class="tt">Aksesori Khusus</div>
        <div class="ts">Non-standar, mis. cat ears</div>
      </div>
    </div>${body}<div style="height:8px"></div>`;
}

function renderInspeksi() {
  const parts = activeParts(curView), pos = HS[curView] || {};
  let hot = '';
  parts.forEach(([id]) => { if (pos[id]) hot += hotspotSVG(id, pos[id][0], pos[id][1]); });
  const viewBtns = VIEWS.map(([k, lab]) => `<div class="view-b ${k === curView ? 'sel' : ''}" onclick="setView('${k}')">${miniIcon(k)}${lab}</div>`).join('');
  const n = parts.filter(([id]) => tagged.has(id)).length;
  const checks = parts.map(([id, lab]) => `<div class="check ${tagged.has(id) ? 'on' : ''}" onclick="toggleTag('${id}')"><div class="box">${tagged.has(id) ? '✓' : ''}</div><div class="cl">${lab}</div></div>`).join('');
  const curLabel = VIEWS.find(v => v[0] === curView)[1];
  document.getElementById('insp-visual').innerHTML =
    `<div class="helmet-card">
       <img src="assets/helm/${helmDir()}${VIEW_FILES[curView]}.svg" alt="${curLabel}">
       <svg class="hotspot-overlay" viewBox="0 0 342 367">${hot}</svg>
     </div>
     <div class="views">${viewBtns}</div>`;

  document.getElementById('insp-body').innerHTML =
    `<div class="bagian-h">${curLabel} (${n} ditandai)</div>${checks}${notesBlock()}`;
}

function setView(v) { curView = v; renderInspeksi(); }
function toggleTag(id) { tagged.has(id) ? tagged.delete(id) : tagged.add(id); renderInspeksi(); }
function openInspeksi() {
  document.getElementById('insp-title').textContent = 'Inspeksi Helm ' + helmType;
  curView = 'F'; renderInspeksi(); go('s-inspeksi');
}

function toggleNotes() { notesOpen = !notesOpen; renderInspeksi(); }
function addNote() {
  const el = document.getElementById('note-in');
  const v = (el.value || '').trim();
  if (!v) return;
  customNotes.push(v);
  renderInspeksi();
}
function removeNote(i) { customNotes.splice(i, 1); renderInspeksi(); }

/* ---------------- service selection ---------------- */
function pickType(t) {
  helmType = t;
  document.getElementById('opt-std').classList.toggle('sel', t === 'Standar');
  document.getElementById('opt-full').classList.toggle('sel', t === 'Full Face');
  updateSpoiler();
}
function pickFinish(f) {
  helmFinish = f;
  ['none', 'glossy', 'doff'].forEach(k => {
    const el = document.getElementById('fin-' + k);
    if (el) el.classList.toggle('sel', k === f);
  });
  const ap = document.getElementById('ap-total');
  if (ap) ap.textContent = rupiah(computeTotal());
}
function pickEst(v) {
  estimasi = v;
  Object.entries(EST_IDS).forEach(([val, id]) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('sel', val === v);
  });
  const ae = document.getElementById('ap-est');
  if (ae) ae.textContent = v;
}
function toggleExtra() {
  extraOn = !extraOn;
  document.getElementById('sw-extra').classList.toggle('on', extraOn);
  const ap = document.getElementById('ap-total');
  if (ap) ap.textContent = rupiah(computeTotal());
}
function computeTotal() {
  // Service cost only. Risk amounts are seller compensation, not a customer charge.
  return (TYPE_PRICE[helmType] || 0) + FINISH[helmFinish].delta + (extraOn ? EXTRA_PRICE : 0);
}
function updateSpoiler() {
  const el = document.getElementById('sp-total');
  if (el) el.textContent = rupiah(computeTotal());
}

/* ---------------- risiko ---------------- */
function allTagged() {
  const out = [];
  VIEWS.forEach(([v]) => activeParts(v).forEach(([id]) => { if (tagged.has(id)) out.push(id); }));
  return out;
}
function goRisiko() {
  const ids = allTagged(), list = document.getElementById('risk-list');
  if (ids.length === 0) {
    list.innerHTML = `<div class="pad" style="color:var(--muted);font-size:14px;text-align:center;padding:36px 22px">Tidak ada bagian rawan yang ditandai.<br>Helm dalam kondisi standar. ✅</div>`;
  } else {
    list.innerHTML = ids.map(id => { const r = RISK[id]; return `
      <div class="risk">
        <div class="risk-head">
          <span class="pr-badge" style="background:${prColor(r.p)}">${r.p}</span>
          <span class="risk-name">${r.n}</span>
        </div>
        <div class="risk-row"><span class="risk-lbl">Risiko</span><span class="risk-val">${r.d}</span></div>
        <div class="risk-row"><span class="risk-lbl">Mitigasi</span><span class="risk-val">${r.a}</span></div>
        <div class="risk-row"><span class="risk-lbl">Kompensasi</span><span class="risk-val risk-cost">${r.k}</span></div>
      </div>`; }).join('');
  }
  const notes = document.getElementById('risk-notes');
  notes.innerHTML = customNotes.length
    ? `<div class="risk">
         <div class="risk-head"><span class="pr-badge" style="background:#6f757b">Catatan</span><span class="risk-name">Aksesori / Catatan Khusus</span></div>
         <div class="risk-row"><span class="risk-lbl">Catatan</span><span class="risk-val">${customNotes.join(', ')}</span></div>
       </div>`
    : '';
  go('s-risiko');
}

/* ---------------- navigation ---------------- */
let stack = ['s-welcome'];
function render(dir) {
  const cur = stack[stack.length - 1];
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'back'));
  const el = document.getElementById(cur);
  el.classList.add('active');
  if (dir === 'back') el.classList.add('back');
  const sc = el.querySelector('.scroll');
  if (sc) sc.scrollTop = 0;
  if (cur === 's-tipe') updateSpoiler();
  if (cur === 's-approval') renderApproval();
  if (cur === 's-konfirmasi') fillKonfirmasi();
}
function go(id) { if (stack[stack.length - 1] === id) return; stack.push(id); history.pushState({}, ''); render('fwd'); }
function back() { if (stack.length > 1) history.back(); }
function resetToHome() {
  stack = ['s-welcome']; tagged.clear(); customNotes.length = 0; curView = 'F';
  notesOpen = false; extraOn = false; helmFinish = 'none'; estimasi = 'Hari ini';
  pickType('Standar');
  history.pushState({}, ''); render('back');
}
window.addEventListener('popstate', () => { if (stack.length > 1) { stack.pop(); render('back'); } else { history.pushState({}, ''); render('back'); } });
history.replaceState({}, '');

/* ---------------- seller PIN approval (on buyer phone) ---------------- */
function renderApproval() {
  const ids = allTagged();
  document.getElementById('ap-q').textContent = queueNum;
  document.getElementById('ap-tipe').textContent = helmType + ' · ' + FINISH[helmFinish].n;
  document.getElementById('ap-tags').textContent = ids.length ? ids.map(i => RISK[i].n).join(', ') : 'kondisi standar';
  document.getElementById('ap-est').textContent = estimasi;
  document.getElementById('ap-total').textContent = rupiah(computeTotal());
  document.getElementById('sw-extra').classList.toggle('on', extraOn);
  ['none', 'glossy', 'doff'].forEach(k => {
    const el = document.getElementById('fin-' + k);
    if (el) el.classList.toggle('sel', k === helmFinish);
  });
  Object.entries(EST_IDS).forEach(([val, id]) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('sel', val === estimasi);
  });
  document.getElementById('pin-in').value = '';
}
function approve() {
  const v = (document.getElementById('pin-in').value || '').trim();
  if (v === SELLER_PIN) {
    toast('Disetujui ✓ — dikirim ke aplikasi seller');
    setTimeout(() => go('s-konfirmasi'), 450);
  } else {
    toast('PIN salah');
  }
}

function fillKonfirmasi() {
  const ids = allTagged();
  document.getElementById('konf-code').textContent = orderCode;
  document.getElementById('konf-q').textContent = queueNum;
  document.getElementById('konf-tipe').textContent = helmType + ' · ' + FINISH[helmFinish].n;
  document.getElementById('konf-tags').textContent = ids.length ? ids.map(i => RISK[i].n).join(', ') : 'kondisi standar';
  document.getElementById('konf-notes').textContent = customNotes.length ? customNotes.join(', ') : '—';
  document.getElementById('konf-est').textContent = estimasi;
  document.getElementById('konf-total').textContent = rupiah(computeTotal());
}

let tt;
function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 1500); }

renderInspeksi();

/* ---------------- fit device frame on desktop only ---------------- */
function fitDevice() {
  const el = document.querySelector('.device');
  if (window.innerWidth <= 767) {
    el.style.transform = '';
    el.style.margin = '';
    return;
  }
  const s = Math.min(1,
    (window.innerWidth - 8) / 360,
    (window.innerHeight - 8) / 780
  );
  if (s < 1) {
    el.style.transform = `scale(${s.toFixed(4)})`;
    el.style.margin = `${Math.round(780 * (s - 1) / 2)}px ${Math.round(360 * (s - 1) / 2)}px`;
  } else {
    el.style.transform = '';
    el.style.margin = '';
  }
}
fitDevice();
window.addEventListener('resize', fitDevice);
