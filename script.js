(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Mouse parallax on the whale ----
  var hero = document.querySelector('.hero');
  if (!reduce && hero) {
    window.addEventListener('pointermove', function (e) {
      var x = (e.clientX / window.innerWidth) * 2 - 1;
      var y = (e.clientY / window.innerHeight) * 2 - 1;
      hero.style.setProperty('--mx', x.toFixed(3));
      hero.style.setProperty('--my', y.toFixed(3));
    }, { passive: true });
  }

  // ---- Watercolor wash starts where the cursor enters the button ----
  document.querySelectorAll('.links a').forEach(function (a) {
    a.addEventListener('pointerenter', function (e) {
      var r = a.getBoundingClientRect();
      a.style.setProperty('--px', ((e.clientX - r.left) / r.width * 100) + '%');
      a.style.setProperty('--py', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // ---- Floating paint droplets around the whale ----
  var canvas = document.querySelector('.droplets');
  if (reduce || !canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var colors = ['47,111,168', '30,79,134', '90,160,200', '127,191,216', '62,130,180'];
  var drops = [];
  var W = 0, H = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(initial) {
    var big = Math.random() < 0.12;
    return {
      x: W * (0.08 + Math.random() * 0.84),
      y: initial ? Math.random() * H : H * (0.6 + Math.random() * 0.4),
      r: big ? 3 + Math.random() * 3 : 0.8 + Math.random() * 2.2,
      vy: -(0.08 + Math.random() * 0.28),
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.004 + Math.random() * 0.01,
      c: colors[(Math.random() * colors.length) | 0],
      a: 0,
      maxA: big ? 0.35 + Math.random() * 0.25 : 0.4 + Math.random() * 0.45,
      ring: Math.random() < 0.18,
      life: 0,
      span: 500 + Math.random() * 700
    };
  }

  function init() {
    resize();
    var n = Math.round(Math.min(90, W / 10));
    drops = [];
    for (var i = 0; i < n; i++) drops.push(spawn(true));
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < drops.length; i++) {
      var d = drops[i];
      d.life++;
      d.sway += d.swaySpeed;
      d.y += d.vy;
      d.x += Math.sin(d.sway) * 0.15;
      var t = d.life / d.span;
      d.a = t < 0.15 ? (t / 0.15) * d.maxA : t > 0.75 ? Math.max(0, (1 - t) / 0.25) * d.maxA : d.maxA;
      if (t >= 1 || d.y < -10) { drops[i] = spawn(false); continue; }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      if (d.ring) {
        ctx.strokeStyle = 'rgba(' + d.c + ',' + d.a + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(' + d.c + ',' + d.a + ')';
        ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', init);
  init();
  requestAnimationFrame(tick);
})();
