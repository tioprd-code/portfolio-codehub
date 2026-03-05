const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

// --- TAMBAHKAN LOGIKA INI DI SINI ---
// Cek apakah perangkat memiliki layar sentuh
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (isTouchDevice) {
    // Jika HP/Tablet, sembunyikan elemen kursor kustom
    if (cursor) cursor.style.display = 'none';
    if (ring)   ring.style.display = 'none';
} else {
    // Jika Desktop (Bukan layar sentuh), jalankan animasi kursor
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

/* ── Tab Switching ── */
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-pill').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  btn.classList.add('active');
}

/* ── Scroll Reveal ── */
const reveals  = document.querySelectorAll('.reveal, .edu-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.classList.contains('edu-item')
        ? [...document.querySelectorAll('.edu-item')].indexOf(entry.target) * 120
        : 0
      );
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const target = +counter.getAttribute('data-target');
  const suffix = counter.getAttribute('data-suffix') || "";
  
  let currentCount = 0; 
  counter.innerText = "0" + suffix;

  const updateCount = () => {
    const speed = target > 10 ? target / 50 : 0.02; 

    if (currentCount < target) {
      currentCount += speed; 

      const displayNum = Math.floor(currentCount);
      if (displayNum <= target) {
          counter.innerText = displayNum + suffix;
      }
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target + suffix;
    }
  };

  updateCount();
});
