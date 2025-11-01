document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function startCount(el) {
        const rawTarget = parseInt(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";

        let target = rawTarget;
        let displaySuffix = suffix;

        if (suffix.toUpperCase().includes("K")) {
            target = rawTarget / 1000;
        }

        const duration = 1000;
        const intervalTime = 20;
        const steps = Math.floor(duration / intervalTime);
        const increment = target / steps;

        let current = 0;
        let stepCount = 0;

        const step = () => {
            stepCount++;
            current += increment;

            let blurValue = Math.max(3 - (3 * stepCount / steps), 0);
            el.style.filter = `blur(${blurValue}px)`;

            if (suffix.toUpperCase().includes("K")) {
                el.textContent = formatNumber(current) + displaySuffix;
            } else {
                el.textContent = Math.floor(current).toLocaleString() + displaySuffix;
            }

            if (stepCount < steps) {
                setTimeout(step, intervalTime);
            } else {
                el.style.filter = "blur(0px)";
                el.textContent = formatNumber(target) + displaySuffix;
            }
        };

        step();
    }

    function formatNumber(num) {
        return Number.isInteger(num) ? num : num.toFixed(1);
    }

 const navbarContainer = document.getElementById('navbar-container');

  if (navbarContainer) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {

        navbarContainer.classList.remove('md:border-b-2', 'border-[#09332C]', 'shadow-none');
        navbarContainer.classList.add('md:border-b-0');
      } else {

        navbarContainer.classList.remove('md:border-b-0', 'shadow-bottom-only');
        navbarContainer.classList.add('md:border-b-2', 'border-[#09332C]', 'shadow-none');
      }
    });
  }

 // =============================================
// MOBILE NAVBAR: Border muncul HANYA di atas halaman
// =============================================
const mobileNavbar = document.getElementById('mobile-navbar');

if (mobileNavbar) {
  let lastScrollY = window.scrollY;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;

    // HILANGKAN BORDER saat scroll ke bawah
    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      mobileNavbar.classList.remove('border-[#09332C]', 'border-b-2');
      mobileNavbar.classList.add('border-transparent');
    }

    // TAMPILKAN BORDER HANYA jika benar-benar di atas (scrollY === 0)
    if (currentScrollY === 0) {
      mobileNavbar.classList.remove('border-transparent');
      mobileNavbar.classList.add('border-[#09332C]', 'border-b-2');
    }

    lastScrollY = currentScrollY;
  };

  // Jalankan saat scroll
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // Jalankan saat load
  updateNavbar();
}

// =============================================
// 1. DESKTOP: Dropdown Hover (Smooth) + PANAH BERPUTAR
// =============================================
const desktopItem = document.querySelector('li.group');
const desktopMenu = document.getElementById('layanan-menu');
const arrow = desktopItem?.querySelector('svg'); // Ambil panah

if (desktopItem && desktopMenu) {
  let hoverTimeout;

  const openMenu = () => {
    clearTimeout(hoverTimeout);
    desktopMenu.classList.remove('opacity-0', '-translate-y-4', 'scale-95', 'pointer-events-none');
    desktopMenu.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
    
    // PANAH BERPUTAR KE ATAS
    if (arrow) arrow.classList.add('rotate-180');
  };

  const closeMenu = () => {
    hoverTimeout = setTimeout(() => {
      desktopMenu.classList.remove('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
      desktopMenu.classList.add('opacity-0', '-translate-y-4', 'scale-95', 'pointer-events-none');
      
      // PANAH KEMBALI KE BAWAH
      if (arrow) arrow.classList.remove('rotate-180');
    }, 150);
  };

  desktopItem.addEventListener('mouseenter', openMenu);
  desktopItem.addEventListener('mouseleave', closeMenu);

  // Bonus: Tutup saat klik di luar
  document.addEventListener('click', (e) => {
    if (!desktopItem.contains(e.target)) {
      closeMenu();
    }
  });
}

// =============================================
// 2. MOBILE: Akordeon Klik (Smooth) – DIPERBAIKI
// =============================================
const mobileBtn = document.getElementById('mobile-layanan-btn');
const mobileMenu = document.getElementById('mobile-layanan-menu');

if (mobileBtn && mobileMenu) {
  const svg = mobileBtn.querySelector('svg'); // Ambil SVG sekali

  mobileBtn.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('max-h-screen'); // Lebih aman

    if (isOpen) {
      // TUTUP
      mobileMenu.classList.remove('max-h-screen', 'opacity-100', 'p-4');
      mobileMenu.classList.add('max-h-0', 'opacity-0', 'p-0');
      svg?.classList.remove('rotate-180');
    } else {
      // BUKA
      mobileMenu.classList.remove('max-h-0', 'opacity-0', 'p-0');
      mobileMenu.classList.add('max-h-screen', 'opacity-100', 'p-4');
      svg?.classList.add('rotate-180');
    }
  });
}
});