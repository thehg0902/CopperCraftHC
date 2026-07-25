// Home page behavior: testimonials carousel + scroll-scrub story player.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Testimonials carousel (arrows + drag; no autoplay) ---- */
  var track = document.getElementById('track');
  if (track) {
    function step() { return Math.min(track.clientWidth * 0.86 + 24, 444); }
    var prevBtn = document.getElementById('prev');
    var nextBtn = document.getElementById('next');
    if (nextBtn) nextBtn.onclick = function () { track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); };
    if (prevBtn) prevBtn.onclick = function () { track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); };
    var down = false, x0 = 0, s0 = 0;
    track.addEventListener('pointerdown', function (e) { down = true; x0 = e.clientX; s0 = track.scrollLeft; track.style.cursor = 'grabbing'; });
    addEventListener('pointerup', function () { down = false; track.style.cursor = 'grab'; });
    track.addEventListener('pointermove', function (e) { if (down) track.scrollLeft = s0 - (e.clientX - x0); });
  }

  /* ---- Scroll-scrub story sections ----
     Canvas draws the ingested frame sequence (site/assets/images/scrub/<slot>/
     frame-%04d.webp + manifest.json) as scroll progresses; GSAP ScrollTrigger
     pins the stage for the section's FULL height and drives floating-text
     reveal (see DECISIONS.md P2 "scroll-scrub pin technique" — explicit
     end:'+='+sectionHeight so back-to-back scrub sections hand off with a
     0px gap, not GSAP's default 1-viewport-early release). */
  document.querySelectorAll('[data-scrub]').forEach(function (sec) {
    var slot = sec.getAttribute('data-scrub');
    var stage = sec.querySelector('.stage');
    var cv = sec.querySelector('canvas'), ctx = cv.getContext('2d');
    var bar = sec.querySelector('.scrub-progress');
    var lines = sec.querySelectorAll('.floating .line');
    var frames = [], manifest = null;

    function size() { cv.width = cv.clientWidth; cv.height = cv.clientHeight; }
    size();
    addEventListener('resize', size);

    function drawFrame(img) {
      if (!img || !img.complete) return;
      var w = cv.width, h = cv.height;
      var scale = Math.max(w / img.width, h / img.height);
      var iw = img.width * scale, ih = img.height * scale;
      ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
    }

    function frameForProgress(p) {
      if (!manifest) return null;
      var idx = Math.min(manifest.frames - 1, Math.max(0, Math.round(p * (manifest.frames - 1))));
      return frames[idx];
    }

    fetch('assets/images/scrub/' + slot + '/manifest.json')
      .then(function (r) { return r.json(); })
      .then(function (m) {
        manifest = m;
        for (var i = 1; i <= m.frames; i++) {
          var img = new Image();
          img.src = 'assets/images/scrub/' + slot + '/frame-' + String(i).padStart(4, '0') + '.webp';
          frames.push(img);
        }
        frames[0].onload = function () { drawFrame(frames[0]); };
      })
      .catch(function () { /* manifest missing: canvas stays blank, floating text still reveals */ });

    function progress() {
      var r = sec.getBoundingClientRect(), total = sec.offsetHeight - innerHeight;
      var p = Math.min(1, Math.max(0, -r.top / total));
      if (bar) bar.style.width = (p * 100) + '%';
      drawFrame(frameForProgress(p));
      if (!window.gsap) {
        lines.forEach(function (l, i) {
          var seg = i / lines.length;
          l.style.opacity = p > seg ? 1 : .15;
          l.style.transform = p > seg ? 'none' : 'translateY(24px)';
        });
      }
    }

    if (window.gsap && window.ScrollTrigger && !reduce) {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: sec, start: 'top top', end: '+=' + sec.offsetHeight,
        pin: stage, pinSpacing: false, scrub: true,
        onUpdate: function (self) {
          if (bar) bar.style.width = (self.progress * 100) + '%';
          drawFrame(frameForProgress(self.progress));
        }
      });
      lines.forEach(function (l, i) {
        gsap.to(l, {
          opacity: 1, y: 0, ease: 'power2.out',
          scrollTrigger: { trigger: sec, start: (i / lines.length * 70 + 5) + '% top', end: '+=15%', scrub: true }
        });
      });
    } else if (!reduce) {
      // No-GSAP fallback: CSS sticky approximates the pin (releases ~1
      // viewport early — acceptable degradation; GSAP is the primary path).
      stage.style.position = 'sticky';
      stage.style.top = '0';
      addEventListener('scroll', progress, { passive: true });
      progress();
    } else {
      // Reduced motion: freeze on frame 0001, show all text, no pin/scrub.
      lines.forEach(function (l) { l.style.opacity = 1; l.style.transform = 'none'; });
      fetch('assets/images/scrub/' + slot + '/manifest.json')
        .then(function (r) { return r.json(); })
        .then(function () {
          var img = new Image();
          img.onload = function () { drawFrame(img); };
          img.src = 'assets/images/scrub/' + slot + '/frame-0001.webp';
        });
    }
  });
})();
