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
