$(document).ready(function() {

    const header = $('#main-header');
    const navContainer = $('#nav-container');
    
    if (header.length) {
        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop();

            if (scrollPos > 10) { 
                // Jika di-scroll: ubah latar dan tambahkan class 'scrolled' untuk memicu animasi garis
                header.addClass('bg-white shadow').removeClass('bg-#ffff ');
                navContainer.addClass('scrolled');
            } else {
                // Jika kembali ke atas: kembalikan seperti semula dan hapus class 'scrolled'
                header.removeClass('bg-white shadow').addClass('bg-#FFFF');
                navContainer.removeClass('scrolled');
            }
        });
    }



    // ===============================================
    // ==        LOGIKA NAVIGASI (GLOBAL)           ==
    // ===============================================
    
    // --- Sidebar Drawer (Mobile) ---
    const btnSidebar = $('#btn-sidebar');
    const sidebar = $('#sidebar');
    const sidebarOverlay = $('#sidebar-overlay');
    
    if (btnSidebar.length) {
        // Fungsi untuk membuka sidebar
        function openSidebar() {
            sidebar.removeClass('-translate-x-full');
            sidebarOverlay.removeClass('hidden');
        }
        // Fungsi untuk menutup sidebar
        function closeSidebar() {
            sidebar.addClass('-translate-x-full');
            sidebarOverlay.addClass('hidden');
        }

        btnSidebar.on('click', openSidebar);
        sidebarOverlay.on('click', closeSidebar);
    }
    
    // --- Dropdown/Akordeon Layanan (Desktop & Mobile) ---
    const layananBtn = $('#layanan-btn');
    const layananMenu = $('#layanan-menu');
    const mobileLayananBtn = $('#mobile-layanan-btn');
    const mobileLayananMenu = $('#mobile-layanan-menu');

    // Logika untuk dropdown desktop
    if (layananBtn.length) {
        layananBtn.on('click', function(e) {
            e.stopPropagation(); // Mencegah klik menyebar ke document
            layananMenu.toggleClass('hidden');
            $(this).find('svg').toggleClass('rotate-180');
        });

        // Sembunyikan dropdown jika klik di luar
        $(document).on('click', function(event) {
            if (!layananBtn.is(event.target) && layananBtn.has(event.target).length === 0 &&
                !layananMenu.is(event.target) && layananMenu.has(event.target).length === 0) {
                layananMenu.addClass('hidden');
                layananBtn.find('svg').removeClass('rotate-180');
            }
        });
    }
    
    // Logika untuk akordeon di dalam sidebar mobile
    if (mobileLayananBtn.length) {
        mobileLayananBtn.on('click', function() {
            mobileLayananMenu.slideToggle(); // Animasi buka/tutup
            $(this).find('svg').toggleClass('rotate-180'); // Animasi panah
        });
    }

    // ===============================================
    // ==           SLIDER TESTIMONI                ==
    // ===============================================
    const testimonialSlider = $('#testimonial-slider');
    
    if (testimonialSlider.length) {
        let currentTestimonial = 0;
        const testimonialSlides = testimonialSlider.find('.testimonial-slide');
        const testimonialCount = testimonialSlides.length;

        testimonialSlides.hide().eq(currentTestimonial).show();

        function nextTestimonial() {
            testimonialSlides.eq(currentTestimonial).fadeOut(400, function() {
                currentTestimonial = (currentTestimonial + 1) % testimonialCount;
                testimonialSlides.eq(currentTestimonial).fadeIn(400);
            });
        }
        
        setInterval(nextTestimonial, 5000);
    }


    // ===============================================
    // ==      SLIDER HALAMAN LOGIN/DAFTAR          ==
    // ===============================================
    const imageSlider = $('#image-slider');

    if (imageSlider.length) {
        let currentSlide = 0;
        const slides = imageSlider.find('.slide-item');
        const dots = imageSlider.find('.slide-dot');
        const slideCount = slides.length;
        const sliderTitle = imageSlider.find('h1');
        const sliderSubtitle = imageSlider.find('p:first-of-type');
        const slideTexts = [
            {
                title: "Dari Sehat Raih Sejahtera",
                subtitle: "Mulai sehat dengan analisis makanan, kuis personal, dan rekomendasi nutrisi tepat."
            },
            {
                title: "Rekomendasi Personal",
                subtitle: "Dapatkan menu harian yang dirancang khusus untukmu."
            },
            {
                title: "Capai Target, Dapatkan Reward",
                subtitle: "Jadikan hidup sehat lebih menyenangkan dan bermanfaat."
            }
        ];

        function showSlide(n) {
            slides.removeClass('opacity-100').addClass('opacity-0');
            slides.eq(n).removeClass('opacity-0').addClass('opacity-100');
            
            dots.removeClass('bg-white').addClass('bg-white/50');
            dots.eq(n).removeClass('bg-white/50').addClass('bg-white');

            sliderTitle.fadeTo(300, 0, function() {
                $(this).text(slideTexts[n].title).fadeTo(300, 1);
            });
            sliderSubtitle.fadeTo(300, 0, function() {
                $(this).text(slideTexts[n].subtitle).fadeTo(300, 1);
            });

            currentSlide = n;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slideCount;
            showSlide(next);
        }

        dots.on('click', function() {
            const index = $(this).index();
            if (index !== currentSlide) {
                showSlide(index);
            }
        });

        let slideInterval = setInterval(nextSlide, 5000);
        imageSlider.on('mouseenter', () => clearInterval(slideInterval));
        imageSlider.on('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
        
        showSlide(0);
    }


    // UI Daftar
    const authLink = $('#auth-link');
    const nameInputContainer = $('#name-input-container');

    if (authLink.length) {
        let isLoginPage = true; 

        authLink.on('click', function(e) {
            e.preventDefault();
            const pageTitle = $('#page-title');
            const submitButton = $('#submit-button');
            const authTextInfo = $('#auth-text-info');

            if (isLoginPage) {
                pageTitle.text('Gabung Bersama Kami');
                nameInputContainer.slideDown();
                submitButton.text('Daftar');
                authTextInfo.text('Sudah punya akun?');
                $(this).text('Masuk');
                isLoginPage = false;
            } else {
                pageTitle.text('Masuk ke Sehatera');
                nameInputContainer.slideUp();
                submitButton.text('Masuk');
                authTextInfo.text('Belum punya akun?');
                $(this).text('Daftar');
                isLoginPage = true;
            }
        });
    }


    // ===============================================
    // ==        SLIDER LOGO MITRA KAMI             ==
    // ===============================================
    const mitraSlider = $('#mitra-logo');

    if (mitraSlider.length) {
        const mitraLogos = [
            { src: '/assets/images/kemenkes.svg', alt: 'Logo Kemenkes' },
            { src: '/assets/images/bpom.svg', alt: 'Logo Badan POM' },
            { src: '/assets/images/badanGizi.svg', alt: 'Logo Badan Gizi Nasional' },
            { src: '/assets/images/halodoc.svg', alt: 'Logo Halodoc' },
            { src: '/assets/images/gain.svg', alt: 'Logo GAIN' },
            { src: '/assets/images/gojek.svg', alt: 'Logo Gojek' }
        ];

        let currentMitraIndex = 0;
        const prevBtn = $('#mitra-prev');
        const nextBtn = $('#mitra-next');

        function updateMitraSlide() {
            // Update gambar dan alt text
            mitraSlider.attr('src', mitraLogos[currentMitraIndex].src);
            mitraSlider.attr('alt', mitraLogos[currentMitraIndex].alt);

            // Atur status tombol prev/next
            prevBtn.prop('disabled', currentMitraIndex === 0);
            nextBtn.prop('disabled', currentMitraIndex === mitraLogos.length - 1);
        }

        // Event listener untuk tombol next
        nextBtn.on('click', function() {
            if (currentMitraIndex < mitraLogos.length - 1) {
                currentMitraIndex++;
                updateMitraSlide();
            }
        });

        // Event listener untuk tombol prev
        prevBtn.on('click', function() {
            if (currentMitraIndex > 0) {
                currentMitraIndex--;
                updateMitraSlide();
            }
        });

        // Inisialisasi slider saat halaman dimuat
        updateMitraSlide();
    }
});

