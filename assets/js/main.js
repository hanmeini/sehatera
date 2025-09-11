$(document).ready(function() {

    // ===============================================
    // ==         NAVBAR & MENU LOGIC             ==
    // ===============================================
    const menuBtn = $('#menu-btn');
    const menu = $('#menu');
    const layananBtn = $('#layanan-btn');
    const layananMenu = $('#layanan-menu');

    // Cek jika tombol menu ada di halaman ini
    if (menuBtn.length) {
        // Hamburger menu toggle
        menuBtn.on('click', function() {
            menu.toggleClass('hidden flex');
        });
    }

    // Cek jika tombol layanan ada di halaman ini
    if (layananBtn.length) {
        // Dropdown layanan toggle
        layananBtn.on('click', function() {
            layananMenu.toggleClass('hidden');
        });

        // Klik di luar dropdown untuk menutupnya
        $(document).on('click', function(event) {
            if (!layananBtn.is(event.target) && layananBtn.has(event.target).length === 0 &&
                !layananMenu.is(event.target) && layananMenu.has(event.target).length === 0) {
                layananMenu.addClass('hidden');
            }
        });
    }


    // ===============================================
    // ==           SLIDER TESTIMONI              ==
    // ===============================================
    const testimonialSlides = $('.testimonial-slide');
    
    // Cek jika slider testimoni ada di halaman ini
    if (testimonialSlides.length > 0) {
        let currentTestimonial = 0;
        const testimonialCount = testimonialSlides.length;

        // Tampilkan slide pertama saja
        testimonialSlides.hide().eq(currentTestimonial).show();

        function nextTestimonial() {
            testimonialSlides.eq(currentTestimonial).fadeOut(400, function() {
                currentTestimonial = (currentTestimonial + 1) % testimonialCount;
                testimonialSlides.eq(currentTestimonial).fadeIn(400);
            });
        }
        
        // Atur interval slider
        setInterval(nextTestimonial, 5000);
    }


    // ===============================================
    // ==             SLIDER LOGIN                  ==
    // ===============================================
    const imageSlider = $('#image-slider');

    // Cek jika slider login ada di halaman ini
    if (imageSlider.length) {
        let currentSlide = 0;
        const slides = imageSlider.find('.slide-item');
        const dots = imageSlider.find('.slide-dot');
        const slideCount = slides.length;
        const sliderTitle = imageSlider.find('h1');
        const sliderSubtitle = imageSlider.find('p:first-of-type'); // Memilih <p> pertama
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
            // Ganti gambar
            slides.removeClass('opacity-100').addClass('opacity-0');
            slides.eq(n).removeClass('opacity-0').addClass('opacity-100');
            
            // Ganti dot aktif
            dots.removeClass('bg-white').addClass('bg-white/50');
            dots.eq(n).removeClass('bg-white/50').addClass('bg-white');

            // Ganti teks dengan efek fade
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

        // Klik pada dot
        dots.on('click', function() {
            const index = $(this).index();
            if (index !== currentSlide) {
                showSlide(index);
            }
        });

        // Atur interval slider otomatis
        let slideInterval = setInterval(nextSlide, 5000); // Interval 5 detik

        // Jeda slider saat kursor mouse di atasnya
        imageSlider.on('mouseenter', () => clearInterval(slideInterval));
        
        // Lanjutkan slider saat kursor mouse pergi
        imageSlider.on('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
        
        // Tampilkan slide pertama saat halaman dimuat
        showSlide(0);
    }



    // ===============================================
// ==     LOGIN/REGISTER UI TOGGLE        ==
// ===============================================
const authLink = $('#auth-link');

// Cek jika link toggle ada di halaman ini
if (authLink.length) {
    // Simpan status halaman saat ini (true = halaman login)
    let isLoginPage = false; 

    authLink.on('click', function(e) {
        e.preventDefault(); // Mencegah link berpindah halaman

        // Ambil semua elemen yang akan diubah
        const pageTitle = $('#page-title');
        const submitButton = $('#submit-button');
        const authTextInfo = $('#auth-text-info');

        if (isLoginPage) {
            // --- Ubah UI ke Mode DAFTAR ---
            pageTitle.text('Gabung Bersama Kami');
            submitButton.text('Daftar');
            authTextInfo.text('Sudah punya akun?');
            $(this).text('Masuk');
            isLoginPage = false;
        } else {
            // --- Ubah UI ke Mode MASUK ---
            pageTitle.text('Masuk ke Sehatera');
            submitButton.text('Masuk');
            authTextInfo.text('Belum punya akun?');
            $(this).text('Daftar');
            isLoginPage = true;
        }
    });
}
});