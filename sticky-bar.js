/* Mobile booking bar: shows once the first screen is passed, hides while another booking button is on screen. */
(function () {
  var bar = document.querySelector('.sticky-mobile-bar');
  if (!bar) return;
  var onScreen = new Set();
  function update() {
    bar.classList.toggle('show', window.scrollY > window.innerHeight * 0.8 && onScreen.size === 0);
  }
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) onScreen.add(entry.target); else onScreen.delete(entry.target);
      });
      update();
    });
    document.querySelectorAll('a[href*="cal.com"]').forEach(function (link) {
      if (!bar.contains(link) && !link.closest('nav')) observer.observe(link);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
