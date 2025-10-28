(function() {
  "use strict";

  /* ----------------------------------------------------------
   * 🎬 Hero Video (Lazy load / play solo cuando se ve)
   * ---------------------------------------------------------- */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    });
    observer.observe(heroVideo);
  }

  /* ----------------------------------------------------------
   * ⏳ Preloader
   * ---------------------------------------------------------- */
  window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hide");
      setTimeout(() => preloader.remove(), 800); // eliminar después de la animación
    }
  });

  // Fallback de seguridad: si algo falla, ocultar tras 4 segundos
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hide");
      preloader.remove();
    }
  }, 4000);

  /* ----------------------------------------------------------
   * ❓ FAQ Toggle
   * ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        faqItems.forEach(i => i !== item && i.classList.remove('faq-active'));
        item.classList.toggle('faq-active');
      });
    });
  });

  /* ----------------------------------------------------------
   * 🧭 Header scroll (efecto al bajar)
   * ---------------------------------------------------------- */
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');

    if (!header) return;
    if (!header.classList.contains('scroll-up-sticky') && 
        !header.classList.contains('sticky-top') && 
        !header.classList.contains('fixed-top')) return;

    if (window.scrollY > 100) {
      body.classList.add('scrolled');
      header.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
      header.classList.remove('scrolled');
    }
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ----------------------------------------------------------
   * 📱 Mobile nav toggle
   * ---------------------------------------------------------- */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn) {
    const mobileNavToggle = () => {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    };
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          mobileNavToggle();
        }
      });
    });
  }

  /* ----------------------------------------------------------
   * 🔽 Mobile nav dropdowns
   * ---------------------------------------------------------- */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(drop => {
    drop.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /* ----------------------------------------------------------
   * ⬆️ Scroll top button
   * ---------------------------------------------------------- */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ----------------------------------------------------------
   * 🌀 AOS (animaciones on scroll)
   * ---------------------------------------------------------- */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /* ----------------------------------------------------------
   * 💡 GLightbox
   * ---------------------------------------------------------- */
  const glightbox = GLightbox({ selector: '.glightbox' });

  /* ----------------------------------------------------------
   * 🧱 Isotope Layout + Filters
   * ---------------------------------------------------------- */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  /* ----------------------------------------------------------
   * 📧 Formulario de contacto
   * ---------------------------------------------------------- */
  const phpForm = document.querySelector('form.php-email-form');
  if (phpForm) {
    phpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const form = this;
      const formData = new FormData(form);

      fetch(form.action, { method: form.method, body: formData })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            document.querySelector('.sent-message').innerHTML = data.message;
            document.querySelector('.sent-message').style.display = 'block';
            document.querySelector('.error-message').style.display = 'none';
            form.reset();
          } else {
            document.querySelector('.error-message').innerHTML = data.message;
            document.querySelector('.error-message').style.display = 'block';
            document.querySelector('.sent-message').style.display = 'none';
          }
        })
        .catch(() => {
          document.querySelector('.error-message').innerHTML =
            'Error al enviar el mensaje, por favor intente nuevamente.';
          document.querySelector('.error-message').style.display = 'block';
          document.querySelector('.sent-message').style.display = 'none';
        });
    });
  }

  /* ----------------------------------------------------------
   * 🖼️ Swiper (sliders)
   * ---------------------------------------------------------- */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /* ----------------------------------------------------------
   * 🔢 Pure Counter
   * ---------------------------------------------------------- */
  new PureCounter();

  /* ----------------------------------------------------------
   * 🔗 Actualiza el enlace activo según el scroll
   * ---------------------------------------------------------- */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navmenu a');
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (window.scrollY >= top - 50 && window.scrollY < top + height - 50) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  /* ----------------------------------------------------------
   * 📱 Efectos automáticos en móviles
   * ---------------------------------------------------------- */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
           rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  function applyEffectOnScroll() {
    const cardItems = document.querySelectorAll('.card-item');
    const sectionTitles = document.querySelectorAll('.section-title');
    if (window.innerWidth <= 768) {
      cardItems.forEach(item => isInViewport(item) && item.classList.add('active'));
      sectionTitles.forEach(title => isInViewport(title) && title.classList.add('active'));
    }
  }
  window.addEventListener('scroll', applyEffectOnScroll);
  window.addEventListener('load', applyEffectOnScroll);

})();
