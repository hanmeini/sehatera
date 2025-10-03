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

        const duration = 1000; // durasi animasi ms
        const intervalTime = 20; // kecepatan update
        const steps = Math.floor(duration / intervalTime);
        const increment = target / steps;

        let current = 0;
        let stepCount = 0;

        const step = () => {
            stepCount++;
            current += increment;

            // blur berkurang seiring animasi
            let blurValue = Math.max(3  - (3 * stepCount / steps), 0);
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
});