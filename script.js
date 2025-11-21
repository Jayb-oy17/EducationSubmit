// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  delay: 0,
  easing: "ease",
});

// Auto Lazy Loading Function
function enableAutoLazyLoading() {
  const allImages = document.querySelectorAll("img");

  allImages.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add("lazy-loaded");

            if (img.dataset.src) {
              img.src = img.dataset.src;
              delete img.dataset.src;
            }
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.1,
      }
    );

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Preload critical images
function preloadCriticalImages() {
  const criticalImages = ["slide1.jpg", "Guest/guest1.jpeg"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// Modal functionality
function initializeModals() {
  const readMoreButtons = document.querySelectorAll(".read-more");
  const modals = document.querySelectorAll(".speaker-modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const speakerId = this.getAttribute("data-speaker");
      const modal = document.getElementById(`${speakerId}-modal`);

      if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Scroll to top of modal content
        const modalBody = modal.querySelector(".modal-body");
        if (modalBody) {
          modalBody.scrollTop = 0;
        }

        setTimeout(() => {
          modal.classList.add("active");
        }, 10);
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".speaker-modal");
      modal.classList.remove("active");

      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    });
  });

  window.addEventListener("click", function (event) {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.classList.remove("active");

        setTimeout(() => {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }, 300);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.style.display === "block") {
          modal.classList.remove("active");

          setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
          }, 300);
        }
      });
    }
  });
}

// Initialize Swiper
function initializeSwiper() {
  const headerSwiper = new Swiper(".headerSwiper", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const headerSlider = document.querySelector(".headerSwiper");
  headerSlider.addEventListener("mouseenter", function () {
    headerSwiper.autoplay.stop();
  });

  headerSlider.addEventListener("mouseleave", function () {
    headerSwiper.autoplay.start();
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  enableAutoLazyLoading();
  preloadCriticalImages();
  initializeModals();
  initializeSwiper();
});
