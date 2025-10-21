(function() {
  "use strict";

// Hero video: Lazy load / play solo cuando se vea el hero
const heroVideo = document.querySelector('.hero-video');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      heroVideo.play();
    } else {
      heroVideo.pause();
    }
  });
});
observer.observe(heroVideo);

// Preloader
window.addEventListener("load", function() {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide");
});

// Fallback: si algo falla, ocultar después de 4 segundos
setTimeout(function() {
  const preloader = document.getElementById("preloader");
  if (preloader && !preloader.classList.contains('hide')) {
    preloader.classList.add("hide");
  }
}, 4000);

// FAQ toggle
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Cierra todas las demás preguntas abiertas
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove('faq-active');
        }
      });
      // Alterna la clase 'faq-active' en la pregunta seleccionada
      item.classList.toggle('faq-active');
    });
  });
});


  
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;

    if (window.scrollY > 100) {
      selectBody.classList.add('scrolled');
      selectHeader.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
      selectHeader.classList.remove('scrolled');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });
  

// Preloader
const preloader = document.querySelector('#preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.remove(); // Elimina el preloader una vez que la página se carga
    });
}



  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
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
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

 /**
   * Formulario de contacto
   */
 document.querySelector('form.php-email-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar el envío normal del formulario
  
  var form = this;
  var formData = new FormData(form);
  
  fetch(form.action, {
    method: form.method,
    body: formData
  })
  .then(response => response.json()) // Procesar la respuesta como JSON
  .then(data => {
    if (data.status === 'success') {
      document.querySelector('.sent-message').innerHTML = data.message; // Mostrar el mensaje de éxito
      document.querySelector('.sent-message').style.display = 'block';
      document.querySelector('.error-message').style.display = 'none'; // Ocultar el mensaje de error
      form.reset(); // Resetea el formulario
    } else {
      document.querySelector('.error-message').innerHTML = data.message; // Mostrar el mensaje de error
      document.querySelector('.error-message').style.display = 'block';
      document.querySelector('.sent-message').style.display = 'none';
    }
  })
  .catch(error => {
    document.querySelector('.error-message').innerHTML = 'Error al enviar el mensaje, por favor intente nuevamente.';
    document.querySelector('.error-message').style.display = 'block';
    document.querySelector('.sent-message').style.display = 'none';
  });
});



  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Update active link in the navbar based on scroll position
   */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navmenu a');
    
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
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

  /**
   * Subrayado automático en móviles para card-item y section-title
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function applyEffectOnScroll() {
    const cardItems = document.querySelectorAll('.card-item');
    const sectionTitles = document.querySelectorAll('.section-title');

    if (window.innerWidth <= 768) {
      cardItems.forEach(item => {
        if (isInViewport(item)) {
          item.classList.add('active');
        }
      });

      sectionTitles.forEach(title => {
        if (isInViewport(title)) {
          title.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', applyEffectOnScroll);
  window.addEventListener('load', applyEffectOnScroll);

})();


