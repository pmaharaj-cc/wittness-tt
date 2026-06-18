/**
 * WiTTness — Protect our kids. Interactive open-source demo.
 * No server: trips sync across tabs on the same origin via localStorage.
 * Deploy to GitHub Pages for a public link.
 */

const STORAGE_KEY = 'wittness_demo_v1';
const QUORUM = 3;
const MAX_CONFIRMS = 10;
const POINTS_CONFIRM = 12;

const ZONES = [
  'POS', 'San Fernando', 'Chaguanas', 'Arima', 'Tunapuna', 'Diego Martin',
  'St. Augustine', 'Couva', 'Point Fortin', 'Sangre Grande', 'Moruga',
  'Cedros', 'Tabaquite', 'Rio Claro', 'Scarborough', 'Crown Point',
];

const DEST_TYPES = {
  family: { label: 'Family home', icon: '🏠' },
  school: { label: 'School run', icon: '🏫' },
  lessons: { label: 'Lessons / classes', icon: '📚' },
  other: { label: 'Other zone', icon: '📍' },
};

const RURAL_ZONES = new Set(['Moruga', 'Cedros', 'Tabaquite', 'Rio Claro', 'Crown Point']);

/** Rush-hour traffic factor — see mvp/13-traffic-and-eta.md */
function trafficFactor(date = new Date()) {
  const h = date.getHours() + date.getMinutes() / 60;
  if (h >= 6.5 && h < 8.5) return { factor: 1.4, label: 'School / morning rush' };
  if (h >= 14 && h < 16.5) return { factor: 1.35, label: 'School pickup traffic' };
  if (h >= 16.5 && h < 19) return { factor: 1.25, label: 'Evening commute' };
  if (h >= 12 && h < 13.5) return { factor: 1.1, label: 'Lunch-hour ripple' };
  return { factor: 1.0, label: 'Normal traffic' };
}

function estimateDrive(from, to) {
  if (from === to) return { min: 5, max: 15 };
  const a = ZONES.indexOf(from);
  const b = ZONES.indexOf(to);
  const dist = Math.abs(a - b);
  let baseMin = 15 + dist * 8;
  let baseMax = baseMin + 22;
  if (RURAL_ZONES.has(from) || RURAL_ZONES.has(to)) {
    baseMin += 25;
    baseMax += 35;
  }
  const { factor, label: trafficLabel } = trafficFactor();
  return {
    min: Math.round(baseMin * factor),
    max: Math.round(baseMax * factor),
    trafficLabel,
    factor,
  };
}

function formatTime(ms) {
  return new Date(ms).toLocaleTimeString('en-TT', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function computeEtaEndMs(trip) {
  const base = trip.startedAt || Date.now();
  const mins = (trip.driveMax || 45) + (trip.paddingMin || 0) + (trip.extensionMin || 0);
  return base + mins * 60 * 1000;
}

function etaWindowLabel(trip) {
  if (!trip.startedAt && !trip.driveMax) return '';
  const base = trip.startedAt || Date.now();
  const minEnd = base + ((trip.driveMin || 30) + (trip.paddingMin || 0) + (trip.extensionMin || 0)) * 60000;
  const maxEnd = computeEtaEndMs(trip);
  return `${formatTime(minEnd)} – ${formatTime(maxEnd)}`;
}

function isPastEta(trip) {
  if (trip.status !== 'transit' || !trip.startedAt) return false;
  return Date.now() > computeEtaEndMs(trip) + (trip.rural ? 35 : 20) * 60000;
}

function genTripId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 3; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function genSessionId() {
  let id = localStorage.getItem('wittness_session');
  if (!id) {
    id = 's_' + Math.random().toString(36).slice(2, 11);
    localStorage.setItem('wittness_session', id);
  }
  return id;
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { trips: {}, wittness: { points: 0, name: '', confirms: 0 } };
  } catch {
    return { trips: {}, wittness: { points: 0, name: '', confirms: 0 } };
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function getBaseUrl() {
  const { origin, pathname } = window.location;
  return origin + pathname.replace(/\/$/, '');
}

function roleUrl(role, tripId) {
  let url = `${getBaseUrl()}?role=${role}`;
  if (tripId) url += `&trip=${tripId}`;
  return url;
}

function parseParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    role: p.get('role'),
    trip: p.get('trip'),
  };
}

function setUrlRole(role, tripId) {
  const url = new URL(window.location.href);
  url.searchParams.set('role', role);
  if (tripId) url.searchParams.set('trip', tripId);
  else url.searchParams.delete('trip');
  history.replaceState({}, '', url);
}

// ─── Trip helpers ─────────────────────────────────────────────

function tripBadges(trip) {
  const b = ['live', 'sync'];
  if (trip.rural) b.push('rural');
  if (trip.destType === 'school') b.push('school');
  if (trip.status === 'transit' || trip.status === 'draft') b.push('priority');
  return b;
}

function tripUi(trip) {
  const dest = DEST_TYPES[trip.destType] || DEST_TYPES.other;
  let statusLabel = 'In transit';
  let statusClass = 'status-transit';
  if (trip.status === 'transit' && isPastEta(trip) && !trip.extensionMin) {
    statusLabel = 'Overdue — check parent';
    statusClass = 'status-overdue';
  } else if (trip.status === 'transit' && trip.extensionMin) {
    statusLabel = 'Extended — parent says OK';
    statusClass = 'status-awaiting';
  }
  const map = {
    draft: { label: 'Ready to start', cls: 'status-transit', canConfirm: false },
    transit: { label: statusLabel, cls: statusClass, canConfirm: false },
    awaiting: { label: 'Awaiting delivery', cls: 'status-awaiting', canConfirm: true },
    completed: { label: 'Completed', cls: 'status-completed', canConfirm: false },
    escalated: { label: 'Escalated', cls: 'status-escalated', canConfirm: false },
  };
  const s = map[trip.status] || map.transit;
  const confirms = trip.confirms?.length || 0;
  const already = trip.confirms?.includes(genSessionId());

  return {
    ...trip,
    destLabel: dest.label,
    destIcon: dest.icon,
    statusLabel: s.label,
    statusClass: s.cls,
    confirms,
    canConfirm: s.canConfirm && confirms < MAX_CONFIRMS && !already,
    quorum: QUORUM,
    max: MAX_CONFIRMS,
    badges: tripBadges(trip),
    border: trip.status === 'awaiting' ? 'border-accent' : trip.status === 'escalated' ? 'border-red'
      : (trip.status === 'transit' && isPastEta(trip) && !trip.extensionMin) ? 'border-amber' : '',
    etaLabel: etaWindowLabel(trip),
  };
}

function getLiveTrips(store) {
  return Object.values(store.trips)
    .filter(t => t.status !== 'completed' || Date.now() - (t.completedAt || 0) < 3600000)
    .sort((a, b) => {
      const order = { escalated: 0, awaiting: 1, transit: 2, draft: 3, completed: 4 };
      return (order[a.status] ?? 5) - (order[b.status] ?? 5);
    })
    .map(tripUi);
}

// ─── DOM / views ─────────────────────────────────────────────

let state = { view: 'landing', store: loadStore(), activeTripId: null, panicTimer: null };

const $ = (sel) => document.querySelector(sel);
const screen = () => document.getElementById('screen-content');

function showToast(msg, gold = false) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.toggle('gold', gold);
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

function badgeHtml(b) {
  const m = {
    priority: '<span class="badge badge-priority">Priority watch</span>',
    rural: '<span class="badge badge-rural">Rural</span>',
    school: '<span class="badge badge-school">School run</span>',
    live: '<span class="badge badge-live">Live trip</span>',
    sync: '<span class="badge badge-sync">Single party</span>',
  };
  return m[b] || '';
}

function renderTripCard(trip, opts = {}) {
  const filled = Math.min(trip.confirms, trip.quorum);
  const dots = Array.from({ length: trip.quorum }, (_, i) =>
    `<i class="${i < filled ? 'filled' : ''}"></i>`
  ).join('');

  let action = '';
  if (trip.canConfirm) {
    action = `<button type="button" class="btn btn-wittness" data-confirm="${trip.id}">✓ Confirm delivery</button>`;
  } else if (trip.status === 'transit') {
    action = `<button type="button" class="btn btn-secondary" disabled>In transit — wait for parent</button>`;
  } else if (trip.status === 'completed') {
    action = `<button type="button" class="btn btn-secondary" disabled>✓ Trip fully witnessed</button>`;
  } else if (trip.status === 'escalated') {
    action = `<button type="button" class="btn btn-secondary" disabled>Witness only — escalated</button>`;
  } else {
    action = `<button type="button" class="btn btn-secondary" disabled>Not ready yet</button>`;
  }

  const hl = opts.highlight ? ' highlight' : '';

  return `
    <div class="trip-card ${trip.border}${hl}" data-trip="${trip.id}">
      <div class="card-badges">${trip.badges.map(badgeHtml).join('')}</div>
      <div class="trip-id">Trip #${trip.id}${trip.isYours ? ' · your trip' : ''}</div>
      <div class="route">${trip.from}<span class="arrow">→</span>${trip.to}</div>
      <div class="dest-type">${trip.destIcon} ${trip.destLabel}</div>
      <div class="meta-grid">
        <div class="meta-item"><label>ETA window</label><span>${trip.etaLabel || '—'}</span></div>
        <div class="meta-item"><label>Status</label><span class="status-pill ${trip.statusClass}">${trip.statusLabel}</span></div>
      </div>
      <div class="meta-item" style="margin-bottom:12px"><label>Witnesses</label><span>${trip.confirms} / ${trip.max}</span></div>
      <div class="confirm-progress"><span>Quorum</span><span>${Math.min(trip.confirms, trip.quorum)} / ${trip.quorum}</span></div>
      <div class="progress-dots">${dots}</div>
      ${action}
    </div>
  `;
}

function renderLanding() {
  screen().innerHTML = `
    <div class="view active landing">
      <h2>Run a test trip</h2>
      <p>Pick a role and complete one full trip. No account, no server — data stays in your browser and syncs across tabs on this link.</p>
      <button type="button" class="role-btn role-btn-parent" data-go="parent">I'm a Parent</button>
      <button type="button" class="role-btn role-btn-wittness" data-go="wittness">I'm a WiTTness</button>
      <p style="font-size:0.75rem;margin-top:8px">Two people? Parent shares the WiTTness link after starting a trip.</p>
    </div>
  `;
  screen().querySelector('[data-go="parent"]').onclick = () => goParent();
  screen().querySelector('[data-go="wittness"]').onclick = () => goWittness();
}

function zoneOptions(selected) {
  return ZONES.map(z => `<option value="${z}"${z === selected ? ' selected' : ''}>${z}</option>`).join('');
}

function renderEtaPreview() {
  const el = $('#eta-preview');
  if (!el) return;
  const from = $('#f-from').value;
  const to = $('#f-to').value;
  const pad = parseInt($('#f-pad')?.value || '0', 10);
  const est = estimateDrive(from, to);
  const { trafficLabel } = trafficFactor();
  el.innerHTML = `
    <strong>Est. drive:</strong> ${est.min}–${est.max} min<br/>
    <span style="color:var(--muted)">${trafficLabel}${pad ? ` · +${pad} min padding` : ''}</span>
  `;
}

function renderParentCreate() {
  screen().innerHTML = `
    <div class="view active view-stacked">
      <div class="screen-header"><h2>New trip</h2><p>Zones only · realistic ETA window</p></div>
      <div class="scroll-body">
        <div class="field"><label>From zone</label><select id="f-from">${zoneOptions('Moruga')}</select></div>
        <div class="field"><label>To zone</label><select id="f-to">${zoneOptions('San Fernando')}</select></div>
        <div class="field"><label>Extra padding (traffic / rain)</label>
          <select id="f-pad">
            <option value="0">None</option>
            <option value="15">+15 min</option>
            <option value="30">+30 min</option>
          </select>
        </div>
        <div class="field"><label>Destination type</label>
          <select id="f-type">
            <option value="family">Family home</option>
            <option value="school">School run</option>
            <option value="lessons">Lessons / classes</option>
            <option value="other">Other zone</option>
          </select>
        </div>
        <div class="share-trip-box" id="eta-preview">Est. drive: …</div>
      </div>
      <div class="action-dock">
        <button type="button" class="btn btn-primary" id="btn-create">Create trip</button>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-back-land">← Choose role</button>
      </div>
    </div>
  `;
  requestAnimationFrame(fitPhone);
  $('#f-from').onchange = renderEtaPreview;
  $('#f-to').onchange = renderEtaPreview;
  $('#f-pad').onchange = renderEtaPreview;
  renderEtaPreview();
  $('#btn-create').onclick = createTrip;
  $('#btn-back-land').onclick = () => { setUrlRole(''); renderLanding(); updateTopNav(''); };
}

function createTrip() {
  const from = $('#f-from').value;
  const to = $('#f-to').value;
  const destType = $('#f-type').value;
  const id = genTripId();
  const rural = RURAL_ZONES.has(from) || RURAL_ZONES.has(to);
  const paddingMin = parseInt($('#f-pad')?.value || '0', 10);
  const est = estimateDrive(from, to);
  const tf = trafficFactor();

  state.store.trips[id] = {
    id, from, to, destType, rural,
    driveMin: est.min,
    driveMax: est.max,
    paddingMin,
    extensionMin: 0,
    extensions: 0,
    trafficLabel: tf.trafficLabel,
    status: 'draft',
    confirms: [],
    createdAt: Date.now(),
    parentSession: genSessionId(),
  };
  state.activeTripId = id;
  saveStore(state.store);
  setUrlRole('parent', id);
  showToast(`Trip #${id} created`);
  renderParentActive();
  updateShareLinks(id);
}

function renderParentActive() {
  const trip = state.store.trips[state.activeTripId];
  if (!trip) return renderParentCreate();

  const ui = tripUi(trip);
  const confirms = trip.confirms?.length || 0;
  const quorumMet = confirms >= QUORUM;
  const steps = getParentSteps(trip.status, quorumMet);

  let extra = '';
  if (trip.status === 'completed' || quorumMet) {
    extra = `
      <div class="complete-banner">
        <h3>✓ Trip complete</h3>
        <p style="font-size:0.85rem;color:var(--muted)">${confirms} WiTTness${confirms !== 1 ? 'es' : ''} confirmed delivery. Trust restored, one trip at a time.</p>
      </div>
    `;
  } else if (trip.status === 'awaiting') {
    extra = `
      <div class="quorum-box">
        <span class="num" id="p-confirms">${confirms}</span>
        WiTTness confirmations · need ${QUORUM} for quorum
      </div>
      <div class="share-trip-box">
        <strong>Share with a WiTTness:</strong><br/>
        <span id="wittness-share">${roleUrl('wittness', trip.id)}</span>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-copy" style="margin-top:8px">Copy WiTTness link</button>
      </div>
      <p style="font-size:0.72rem;color:var(--muted);margin-top:10px;text-align:center">
        Solo test? Open the WiTTness link in a new tab (same browser).
      </p>
    `;
  }

  const etaBox = trip.driveMax ? `
    <div class="share-trip-box" style="margin-bottom:12px">
      <strong>ETA window</strong> ${trip.startedAt ? etaWindowLabel(trip) : `(after start, ~${trip.driveMin}–${trip.driveMax} min)`}<br/>
      <span style="color:var(--muted);font-size:0.75rem">${trip.trafficLabel || ''} · stale timer uses this window, not a guess</span>
    </div>
  ` : '';

  const lateBtns = trip.status === 'transit' && (trip.extensions || 0) < 3 ? `
    <div class="late-row">
      <button type="button" class="btn btn-secondary btn-sm" data-late="15">Late +15</button>
      <button type="button" class="btn btn-secondary btn-sm" data-late="30">Late +30</button>
    </div>
  ` : (trip.extensions >= 3 ? '<p style="font-size:0.75rem;color:var(--amber);text-align:center">Max extensions reached. END or PANIC if needed.</p>' : '');

  const actionDock = `
    ${trip.status === 'draft' ? '<button type="button" class="btn btn-primary" id="btn-start">✓ Child boarded · START</button>' : ''}
    ${trip.status === 'transit' ? '<button type="button" class="btn btn-end" id="btn-end">Arrived safe · END</button>' : ''}
    ${lateBtns}
    ${trip.status !== 'completed' && trip.status !== 'escalated' ? '<button type="button" class="btn btn-panic" id="btn-panic">PANIC · hold 3 sec</button>' : ''}
    ${trip.status === 'completed' || quorumMet ? '<button type="button" class="btn btn-primary btn-sm" id="btn-new-trip">Start another test trip</button>' : ''}
    ${trip.status !== 'completed' && !quorumMet ? '<p class="disclaimer compact">WiTTnesses are volunteers, not emergency services. Call <a href="tel:999">999</a> in immediate danger.</p>' : ''}
    <button type="button" class="btn btn-secondary btn-sm" id="btn-back-land">← Choose role</button>
  `;

  screen().innerHTML = `
    <div class="view active view-stacked">
      <div class="screen-header"><h2>Trip #${trip.id}</h2><p>${ui.destIcon} ${ui.destLabel}</p></div>
      <div class="scroll-body">
        <div class="route" style="margin-bottom:10px">${trip.from}<span class="arrow">→</span>${trip.to}</div>
        ${etaBox}
        <ul class="step-list compact">${steps}</ul>
        ${extra}
      </div>
      <div class="action-dock">${actionDock}</div>
    </div>
  `;
  requestAnimationFrame(fitPhone);

  const startBtn = $('#btn-start');
  if (startBtn) startBtn.onclick = () => {
    trip.status = 'transit';
    trip.startedAt = Date.now();
    saveStore(state.store);
    showToast('Trip live — WiTTnesses can see it');
    renderParentActive();
  };

  const endBtn = $('#btn-end');
  if (endBtn) endBtn.onclick = () => {
    trip.status = 'awaiting';
    trip.endedAt = Date.now();
    saveStore(state.store);
    showToast('Delivery marked — WiTTnesses can confirm');
    renderParentActive();
    updateShareLinks(trip.id);
  };

  const panicBtn = $('#btn-panic');
  if (panicBtn) bindPanic(panicBtn, trip);

  screen().querySelectorAll('[data-late]').forEach(btn => {
    btn.onclick = () => {
      const add = parseInt(btn.dataset.late, 10);
      trip.extensionMin = (trip.extensionMin || 0) + add;
      trip.extensions = (trip.extensions || 0) + 1;
      trip.lastExtendedAt = Date.now();
      saveStore(state.store);
      showToast(`+${add} min — WiTTnesses notified: still safe`);
      renderParentActive();
    };
  });

  const copyBtn = $('#btn-copy');
  if (copyBtn) copyBtn.onclick = () => copyText(roleUrl('wittness', trip.id), 'WiTTness link copied');

  const newBtn = $('#btn-new-trip');
  if (newBtn) newBtn.onclick = () => {
    state.activeTripId = null;
    renderParentCreate();
  };

  $('#btn-back-land').onclick = () => { setUrlRole(''); state.activeTripId = null; renderLanding(); updateTopNav(''); };
}

function getParentSteps(status, quorumMet) {
  const order = ['register', 'start', 'transit', 'end', 'witness'];
  let idx = 0;
  if (status !== 'draft') idx = 1;
  if (status === 'transit') idx = 2;
  if (status === 'awaiting') idx = 3;
  if (status === 'completed' || quorumMet) idx = 4;

  const labels = [
    'Trip registered · zones only',
    'Confirm child boarded',
    'Child in transit · WiTTnesses watching',
    'Confirm arrived safe',
    'WiTTness quorum reached',
  ];

  return labels.map((label, i) => {
    let cls = 'pending';
    if (i < idx) cls = 'done';
    else if (i === idx) cls = 'active';
    const icon = i < idx ? '✓' : String(i + 1);
    return `<li class="${cls}"><span class="step-icon">${icon}</span><span>${label}</span></li>`;
  }).join('');
}

function bindPanic(btn, trip) {
  const start = () => {
    btn.classList.add('holding');
    let s = 3;
    btn.textContent = `Hold… ${s}`;
    state.panicTimer = setInterval(() => {
      s--;
      if (s <= 0) {
        clearInterval(state.panicTimer);
        trip.status = 'escalated';
        trip.escalatedAt = Date.now();
        saveStore(state.store);
        btn.textContent = 'PANIC sent — call 999';
        showToast('Escalated — call 999 if immediate danger');
        renderParentActive();
      } else btn.textContent = `Hold… ${s}`;
    }, 1000);
  };
  const stop = () => {
    clearInterval(state.panicTimer);
    if (trip.status !== 'escalated') {
      btn.classList.remove('holding');
      btn.textContent = 'PANIC · hold 3 sec';
    }
  };
  btn.addEventListener('mousedown', start);
  btn.addEventListener('mouseup', stop);
  btn.addEventListener('mouseleave', stop);
  btn.addEventListener('touchstart', (e) => { e.preventDefault(); start(); });
  btn.addEventListener('touchend', stop);
}

function renderWittness() {
  state.store = loadStore();
  const session = genSessionId();
  const w = state.store.wittness;
  if (!w.name) {
    screen().innerHTML = `
      <div class="view active landing">
        <h2>Join as WiTTness</h2>
        <p>Pick a display name (not your real name). Then confirm deliveries on live trips.</p>
        <div class="field" style="width:100%;max-width:280px">
          <label>Display name</label>
          <input type="text" id="w-name" placeholder="e.g. DiegoMartin_Auntie" maxlength="24" />
        </div>
        <button type="button" class="role-btn role-btn-wittness" id="btn-w-join">Start witnessing</button>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-back-land" style="max-width:280px;width:100%">← Choose role</button>
      </div>
    `;
    $('#btn-w-join').onclick = () => {
      const name = $('#w-name').value.trim() || 'WiTTness_' + session.slice(-4);
      state.store.wittness.name = name;
      saveStore(state.store);
      renderWittness();
    };
    $('#btn-back-land').onclick = () => { setUrlRole(''); renderLanding(); updateTopNav(''); };
    return;
  }

  const params = parseParams();
  const trips = getLiveTrips(state.store).filter(t => t.status !== 'draft' && t.status !== 'completed');
  const completed = getLiveTrips(state.store).filter(t => t.status === 'completed');
  const highlightId = params.trip;

  let feedHtml = '';
  if (trips.length === 0) {
    feedHtml = `<div class="empty-feed">No live trips right now.<br/><br/>Ask a parent to share their WiTTness link, or <button type="button" class="btn btn-secondary btn-sm" id="go-parent" style="margin-top:12px">play Parent role</button> to create one.</div>`;
  } else {
    feedHtml = '<div class="feed-section-title">Live trips</div>';
    feedHtml += trips.map(t => {
      const copy = { ...t, isYours: false };
      return renderTripCard(copy, { highlight: t.id === highlightId });
    }).join('');
  }

  if (completed.length) {
    feedHtml += '<div class="feed-section-title">Recently completed</div>';
    feedHtml += completed.slice(0, 3).map(t => renderTripCard(t)).join('');
  }

  screen().innerHTML = `
    <div class="view active view-stacked">
      <div class="wittness-header">
        <div class="user">
          <div class="avatar">${w.name.slice(0, 2).toUpperCase()}</div>
          <div class="user-info">
            <div class="name">${w.name}</div>
            <div class="rank">WiTTness · ${w.confirms || 0} confirms</div>
          </div>
        </div>
        <div class="points-pill">+ ${w.points || 0} TTP</div>
      </div>
      <div class="scroll-body" id="w-feed">${feedHtml}</div>
      <div class="action-dock">
        <button type="button" class="btn btn-secondary btn-sm" id="btn-back-land">← Choose role</button>
      </div>
    </div>
  `;
  requestAnimationFrame(fitPhone);

  screen().querySelectorAll('[data-confirm]').forEach(btn => {
    btn.onclick = () => confirmTrip(btn.dataset.confirm);
  });

  const goParentBtn = $('#go-parent');
  if (goParentBtn) goParentBtn.onclick = () => goParent();

  $('#btn-back-land').onclick = () => { setUrlRole(''); renderLanding(); updateTopNav(''); };

  if (highlightId) {
    const el = screen().querySelector(`[data-trip="${highlightId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function confirmTrip(tripId) {
  state.store = loadStore();
  const trip = state.store.trips[tripId];
  if (!trip || trip.status !== 'awaiting') return;

  const session = genSessionId();
  if (!trip.confirms) trip.confirms = [];
  if (trip.confirms.includes(session)) return showToast('You already confirmed this trip');

  trip.confirms.push(session);
  state.store.wittness.points = (state.store.wittness.points || 0) + POINTS_CONFIRM;
  state.store.wittness.confirms = (state.store.wittness.confirms || 0) + 1;

  if (trip.confirms.length >= QUORUM) {
    trip.status = 'completed';
    trip.completedAt = Date.now();
  }

  saveStore(state.store);
  showToast(`+${POINTS_CONFIRM} TTP · Confirmed #${tripId}`, true);
  renderWittness();
}

function goParent(tripId) {
  state.view = 'parent';
  state.store = loadStore();
  setUrlRole('parent', tripId || state.activeTripId);
  updateTopNav('parent');

  if (tripId && state.store.trips[tripId]) {
    state.activeTripId = tripId;
    renderParentActive();
  } else if (state.activeTripId && state.store.trips[state.activeTripId]) {
    renderParentActive();
  } else {
    renderParentCreate();
  }
}

function goWittness(tripId) {
  state.view = 'wittness';
  setUrlRole('wittness', tripId);
  updateTopNav('wittness');
  renderWittness();
}

function updateTopNav(role) {
  $('#btn-parent').classList.toggle('active', role === 'parent');
  $('#btn-wittness').classList.toggle('active', role === 'wittness');
  $('#btn-wittness').classList.toggle('wittness', true);
  $('#btn-home').classList.toggle('active', !role);
}

function updateShareLinks(_tripId) {
  /* share link rendered on parent active screen */
}

function copyText(text, msg) {
  navigator.clipboard?.writeText(text).then(() => showToast(msg)).catch(() => {
    prompt('Copy this link:', text);
  });
}

function resetDemo() {
  if (!confirm('Clear all demo trips and points on this browser?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state.store = loadStore();
  state.activeTripId = null;
  setUrlRole('');
  renderLanding();
  updateTopNav('');
  showToast('Demo reset');
}

// Cross-tab sync
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY) return;
  state.store = loadStore();
  if (state.view === 'parent' && state.activeTripId) renderParentActive();
  else if (state.view === 'wittness') renderWittness();
});

// Poll for same-tab parent confirm updates (storage event doesn't fire same tab)
setInterval(() => {
  if (state.view === 'parent' && state.activeTripId) {
    const fresh = loadStore();
    const old = state.store.trips[state.activeTripId];
    const neu = fresh.trips[state.activeTripId];
    if (neu && old && (neu.confirms?.length !== old.confirms?.length || neu.status !== old.status)) {
      state.store = fresh;
      renderParentActive();
    }
  }
}, 800);

function fitPhone() {
  const bar = document.querySelector('.pitch-bar');
  if (!bar) return;
  const pad = 12;
  const phoneH = 844;
  const phoneW = 390;
  const availH = window.innerHeight - bar.offsetHeight - pad;
  const availW = window.innerWidth - 24;
  const scale = Math.min(1, availH / phoneH, availW / phoneW);
  document.documentElement.style.setProperty('--phone-scale', String(scale));
}

function applyRecordMode() {
  if (new URLSearchParams(window.location.search).get('record') === '1') {
    document.body.classList.add('record-mode');
  }
}

// Init
function init() {
  applyRecordMode();
  fitPhone();
  window.addEventListener('resize', fitPhone);

  const params = parseParams();

  $('#btn-parent').onclick = () => goParent(params.trip);
  $('#btn-wittness').onclick = () => goWittness(params.trip);
  $('#btn-home').onclick = () => { setUrlRole(''); renderLanding(); updateTopNav(''); state.view = 'landing'; };
  $('#btn-reset').onclick = resetDemo;
  $('#btn-copy-page').onclick = () => copyText(window.location.href.split('?')[0], 'Demo home link copied');

  if (params.role === 'parent') {
    state.view = 'parent';
    goParent(params.trip);
  } else if (params.role === 'wittness') {
    state.view = 'wittness';
    goWittness(params.trip);
  } else {
    renderLanding();
    updateTopNav('');
  }
}

document.addEventListener('DOMContentLoaded', init);