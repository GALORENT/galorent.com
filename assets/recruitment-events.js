/* Review-only measurement adapter. No transport, cookies, storage, identifiers,
   form-value inspection, or third-party scripts. Enable collection only in a
   separately approved integration. */
(() => {
  const allowed = new Set(['acquisition','spd_engagement','tester_enrollment_start',
    'tester_submission_confirmed','waitlist_signup_confirmed','demo_engagement','download_interest']);
  const seen = new Set();
  const routes = new Set(['/', '/spd/', '/spd/testers/', '/spd/editions/', '/company/']);
  const safePage = routes.has(location.pathname) ? location.pathname : '/other/';
  function record(name, detail = {}) {
    if (!allowed.has(name)) return false;
    // A browser cannot establish email receipt or subscriber persistence.
    if (name.endsWith('_confirmed')) return false;
    const key = name;
    if (seen.has(key)) return false;
    seen.add(key);
    // Fixed taxonomy only: never forward arbitrary metadata or URL parameters.
    const event = { name, page: safePage, mode: 'review' };
    if (name === 'acquisition') {
      const values = new URLSearchParams(location.search);
      const sources = new Set(['direct','discord','youtube','linkedin','github','email']);
      const source = values.get('utm_source');
      event.source = sources.has(source) ? source : 'other';
      if (!source) event.source = 'direct_or_unknown';
      event.campaign = values.get('utm_campaign') === 'operation_first_50' ? 'operation_first_50' : 'other';
    }
    document.dispatchEvent(new CustomEvent('galorent:measurement-preview', { detail: Object.freeze(event) }));
    return true;
  }
  window.GalorentMeasurement = Object.freeze({ record, mode: 'review', collectionEnabled: false });
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-event]');
    if (link) record(link.dataset.event);
  });
  record('acquisition');
  let activeMs = 0;
  const interval = setInterval(() => {
    if (!document.hidden && location.pathname.startsWith('/spd/')) activeMs += 1000;
    if (activeMs >= 30000) { record('spd_engagement'); clearInterval(interval); }
  }, 1000);
})();
