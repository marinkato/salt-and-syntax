// Cookie consent: Google Analytics loads only after the visitor accepts.
(function () {
  var GA_ID = 'G-MN14Y782HL';
  var KEY = 'ss-consent';

  var TEXT = {
    en: {
      msg: 'I use Google Analytics to see how visitors use this site – only if you allow it.',
      accept: 'Accept', decline: 'Decline', link: 'Privacy policy', href: '/privacy.html'
    },
    hr: {
      msg: 'Koristim Google Analytics da vidim kako posjetitelji koriste stranicu – samo ako to dopustiš.',
      accept: 'Prihvati', decline: 'Odbij', link: 'Pravila privatnosti', href: '/privacy-hr.html'
    },
    de: {
      msg: 'Ich nutze Google Analytics, um zu sehen, wie Besucher diese Seite nutzen – nur mit deiner Zustimmung.',
      accept: 'Akzeptieren', decline: 'Ablehnen', link: 'Datenschutz', href: '/privacy-de.html'
    }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var t = TEXT[lang] || TEXT.en;

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  var gaLoaded = false;
  function loadAnalytics() {
    if (gaLoaded) return;
    gaLoaded = true;
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function removeGaCookies() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') === 0) {
        var host = location.hostname;
        ['', host, '.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  var style = document.createElement('style');
  style.textContent =
    '.ss-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:300;max-width:560px;margin:0 auto;' +
    'background:#fff;color:#1C1C1A;border:1px solid rgba(28,28,26,0.1);border-radius:16px;' +
    'box-shadow:0 12px 40px rgba(28,28,26,0.18);padding:18px 20px;font-family:"DM Sans",system-ui,sans-serif;' +
    'font-size:0.9rem;line-height:1.55}' +
    '.ss-consent p{margin:0 0 12px;color:#3D3C38}' +
    '.ss-consent a{color:#2C7873}' +
    '.ss-consent-actions{display:flex;gap:10px;flex-wrap:wrap}' +
    '.ss-consent button{flex:1;min-width:120px;padding:10px 18px;border-radius:40px;font:500 0.9rem "DM Sans",system-ui,sans-serif;cursor:pointer;' +
    'border:1.5px solid #2C7873}' +
    '.ss-consent .ss-accept{background:#2C7873;color:#fff}' +
    '.ss-consent .ss-decline{background:#fff;color:#2C7873}' +
    '@media (max-width:900px){.ss-consent{bottom:80px}}';
  document.head.appendChild(style);

  var banner = null;
  function closeBanner() {
    if (banner) { banner.remove(); banner = null; }
  }
  function openBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'ss-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.link);
    banner.innerHTML =
      '<p>' + t.msg + ' <a href="' + t.href + '">' + t.link + '</a></p>' +
      '<div class="ss-consent-actions">' +
      '<button type="button" class="ss-decline">' + t.decline + '</button>' +
      '<button type="button" class="ss-accept">' + t.accept + '</button>' +
      '</div>';
    banner.querySelector('.ss-accept').addEventListener('click', function () {
      setChoice('granted');
      closeBanner();
      loadAnalytics();
    });
    banner.querySelector('.ss-decline').addEventListener('click', function () {
      var wasGranted = getChoice() === 'granted';
      setChoice('denied');
      closeBanner();
      removeGaCookies();
      // Analytics already running on this page stops on the next page load.
      if (wasGranted && gaLoaded) location.reload();
    });
    document.body.appendChild(banner);
  }

  function init() {
    var choice = getChoice();
    if (choice === 'granted') loadAnalytics();
    else if (choice !== 'denied') openBanner();

    document.querySelectorAll('[data-cookie-settings]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openBanner();
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
