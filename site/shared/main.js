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
    var lastY = -1;

    /* Not throttled through requestAnimationFrame: rAF is suspended in
       hidden/background/preview panes, which strands the header in whatever
       state it was last in (same reason the scrub driver avoids it — see
       script.js). A scrollY-change guard is the cheap equivalent, and the
       work per tick is a handful of rect reads. */
    function syncHeader() {
      var probe = header.offsetHeight / 2;
      var overDark = false;
      for (var i = 0; i < darkEls.length; i++) {
        var r = darkEls[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) { overDark = true; break; }
      }
      header.classList.toggle('scrolled', !overDark);
    }
    function requestSync() {
      var y = window.pageYOffset;
      if (y === lastY) return;
      lastY = y;
      syncHeader();
    }

    addEventListener('scroll', requestSync, { passive: true });
    addEventListener('resize', function () { lastY = -1; syncHeader(); });
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
