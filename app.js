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
const RISK = {
  visor:    { n: 'Visor / kaca',        p: 'High Priority', d: 'Visor exhibits severe scratching and deep gouges, impairing visibility and compromising structural integrity. Requires immediate replacement.', k: 'Rp 150.000' },
  karet:    { n: 'Karet list',          p: 'Medium',        d: 'Karet list mengeras dan getas; berpotensi bocor air saat hujan dan mengurangi peredaman.',                                                       k: 'Rp 45.000' },
  logo:     { n: 'Logo depan',          p: 'Low',           d: 'Stiker logo depan terkelupas sebagian; bersifat kosmetik dan tidak memengaruhi keselamatan.',                                                   k: 'Rp 15.000' },
  logo_b:   { n: 'Logo Belakang',       p: 'Low',           d: 'Logo belakang mulai terkelupas; bersifat kosmetik.',                                                                                             k: 'Rp 15.000' },
  shell_b:  { n: 'Shell Belakang',      p: 'Medium',        d: 'Terdapat baret pada shell belakang; perlu poles ringan.',                                                                                        k: 'Rp 40.000' },
  topvent:  { n: 'Top Vent',            p: 'Medium',        d: 'Top vent tersumbat atau longgar; aliran udara berkurang.',                                                                                       k: 'Rp 30.000' },
  shell_t:  { n: 'Shell Atas',          p: 'Medium',        d: 'Baret permukaan pada shell atas; disarankan poles ringan.',                                                                                      k: 'Rp 40.000' },
  vmount_l: { n: 'Visor Mount (Kiri)',  p: 'Medium',        d: 'Dudukan visor sisi kiri longgar; visor dapat goyang.',                                                                                           k: 'Rp 35.000' },
  vmount_r: { n: 'Visor Mount (Kanan)', p: 'Medium',        d: 'Dudukan visor sisi kanan longgar; visor dapat goyang.',                                                                                          k: 'Rp 35.000' },
  intercom: { n: 'Intercom',            p: 'High Priority', d: 'Modul intercom berisiko rusak bila terkena air. Sebaiknya dilepas sebelum pencucian.',                                                           k: 'Rp 0 (dilepas dulu)' },
  crown:    { n: 'Crown Pad',           p: 'Medium',        d: 'Crown pad sobek atau lepas; perlu dijahit ulang.',                                                                                               k: 'Rp 35.000' },
  cheek:    { n: 'Cheek Pad',           p: 'Low',           d: 'Cheek pad berbau atau kotor; dapat dicuci ulang.',                                                                                               k: 'Cuci ulang gratis' },
  neck:     { n: 'Neck Roll',           p: 'Low',           d: 'Neck roll sedikit lepas; perlu jahit ringan.',                                                                                                   k: 'Rp 20.000' },
  strap:    { n: 'Chin Strap',          p: 'Medium',        d: 'Chin strap aus; periksa keamanan kunci D-ring.',                                                                                                 k: 'Rp 25.000' },
};
const prColor = p => p === 'High Priority' ? 'var(--red)' : p === 'Medium' ? 'var(--amber)' : '#9aa0a6';

function miniIcon(v) { return `<img src="assets/helm/${VIEW_FILES[v]}.svg" alt="">`; }

/* ---------------- inspeksi ---------------- */
let curView = 'F';
const tagged = new Set();
let helmType = 'Standar';

function hotspotSVG(id, x, y) {
  const on = tagged.has(id), w = 30, h = 22;
  let s = `<g style="cursor:pointer" onclick="toggleTag('${id}')">`;
  s += `<rect x="${x - w / 2 - 3}" y="${y - h / 2 - 3}" width="${w + 6}" height="${h + 6}" rx="15" fill="#fff"/>`;
  s += `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="11" fill="${on ? 'var(--green)' : '#eafaef'}" stroke="var(--green)" stroke-width="${on ? 0 : 2.5}"/>`;
  if (on) s += `<path d="M${x - 7},${y} l5,6 l9,-12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  return s + `</g>`;
}

function renderInspeksi() {
  const parts = PARTS[curView] || [], pos = HS[curView] || {};
  let hot = '';
  parts.forEach(([id]) => { if (pos[id]) hot += hotspotSVG(id, pos[id][0], pos[id][1]); });
  const viewBtns = VIEWS.map(([k, lab]) => `<div class="view-b ${k === curView ? 'sel' : ''}" onclick="setView('${k}')">${miniIcon(k)}${lab}</div>`).join('');
  const n = parts.filter(([id]) => tagged.has(id)).length;
  const checks = parts.map(([id, lab]) => `<div class="check ${tagged.has(id) ? 'on' : ''}" onclick="toggleTag('${id}')"><div class="box">${tagged.has(id) ? '✓' : ''}</div><div class="cl">${lab}</div></div>`).join('');
  const curLabel = VIEWS.find(v => v[0] === curView)[1];
  document.getElementById('insp-visual').innerHTML =
    `<div class="helmet-card">
       <img src="assets/helm/${VIEW_FILES[curView]}.svg" alt="${curLabel}">
       <svg class="hotspot-overlay" viewBox="0 0 342 367">${hot}</svg>
     </div>
     <div class="views">${viewBtns}</div>`;

  document.getElementById('insp-body').innerHTML =
    `<div class="bagian-h">${curLabel} (${n} ditandai)</div>${checks}<div style="height:8px"></div>`;
}

function setView(v) { curView = v; renderInspeksi(); }
function toggleTag(id) { tagged.has(id) ? tagged.delete(id) : tagged.add(id); renderInspeksi(); }
function openInspeksi() {
  document.getElementById('insp-title').textContent = 'Inspeksi Helm ' + helmType;
  curView = 'F'; renderInspeksi(); go('s-inspeksi');
}
function pickType(t) {
  helmType = t;
  document.getElementById('opt-std').classList.toggle('sel', t === 'Standar');
  document.getElementById('opt-full').classList.toggle('sel', t === 'Full Face');
}

/* ---------------- risiko ---------------- */
function allTagged() {
  const out = [];
  VIEWS.forEach(([v]) => (PARTS[v] || []).forEach(([id]) => { if (tagged.has(id)) out.push(id); }));
  return out;
}
function goRisiko() {
  const ids = allTagged(), list = document.getElementById('risk-list');
  if (ids.length === 0) {
    list.innerHTML = `<div class="pad" style="color:var(--muted);font-size:17px;text-align:center;padding:40px 22px">Tidak ada bagian rawan yang ditandai.<br>Helm dalam kondisi standar. ✅</div>`;
  } else {
    list.innerHTML = ids.map(id => { const r = RISK[id]; return `
      <div class="risk">
        <div class="head"><div class="warn">⚠️</div><div><div class="rt">${r.n}</div><span class="pr-badge" style="background:${prColor(r.p)}">${r.p}</span></div></div>
        <hr><div class="lbl">RISIKO</div><div class="desc">${r.d}</div>
        <div class="komp"><div class="kl">KOMPENSASI</div><div class="kv">💵 ${r.k}</div></div>
      </div>`; }).join('');
  }
  go('s-risiko');
}

/* ---------------- navigation ---------------- */
let stack = ['s-home'];
function render(dir) {
  const cur = stack[stack.length - 1];
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'back'));
  const el = document.getElementById(cur);
  el.classList.add('active');
  if (dir === 'back') el.classList.add('back');
  const sc = el.querySelector('.scroll');
  if (sc) sc.scrollTop = 0;
  if (cur === 's-konfirmasi') {
    const ids = allTagged();
    document.getElementById('konf-tags').textContent = ids.length ? ids.map(i => RISK[i].n).join(', ') : 'kondisi standar';
  }
}
function go(id) { if (stack[stack.length - 1] === id) return; stack.push(id); history.pushState({}, ''); render('fwd'); }
function back() { if (stack.length > 1) history.back(); }
function resetToHome() { stack = ['s-home']; tagged.clear(); curView = 'F'; history.pushState({}, ''); render('back'); }
window.addEventListener('popstate', () => { if (stack.length > 1) { stack.pop(); render('back'); } else { history.pushState({}, ''); render('back'); } });
history.replaceState({}, '');

function pickEst(el) { document.querySelectorAll('#s-estimasi .radio-opt').forEach(o => o.classList.remove('sel')); el.classList.add('sel'); }
let tt;
function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 1500); }

renderInspeksi();

/* ---------------- fit device to viewport ---------------- */
function fitDevice() {
  const el = document.querySelector('.device');
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
