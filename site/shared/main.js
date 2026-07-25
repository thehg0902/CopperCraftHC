// Shared init: preloader (with returning-visitor skip) + mobile nav toggle.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var pre = document.getElementById('preloader');
  if (pre) {
    if (reduce || localStorage.getItem('coppercraft_seen')) {
      pre.remove();
    } else {
      window.addEventListener('load', function () {
        setTimeout(function () {
          pre.classList.add('hidden');
          localStorage.setItem('coppercraft_seen', '1');
        }, 1400);
      });
    }
  }

  /* Header state: stay transparent (knockout logo, light nav) while a
     [data-header-dark] section sits under the bar; otherwise add .scrolled
     for the translucent light surface + original dark wordmark. Measured
     against the header's own midpoint so the swap lands on the seam. */
  var header = document.getElementById('siteHeader');
  if (header) {
    var darkEls = document.querySelectorAll('[data-header-dark]');
    var ticking = false;

    function syncHeader() {
      ticking = false;
      var probe = header.offsetHeight / 2;
      var overDark = false;
      for (var i = 0; i < darkEls.length; i++) {
        var r = darkEls[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) { overDark = true; break; }
      }
      header.classList.toggle('scrolled', !overDark);
    }
    function requestSync() {
      if (!ticking) { ticking = true; requestAnimationFrame(syncHeader); }
    }

    addEventListener('scroll', requestSync, { passive: true });
    addEventListener('resize', requestSync);
    syncHeader();
  }

  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') menu.classList.remove('open');
    });
  }
})();
