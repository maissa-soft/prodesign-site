document.addEventListener('DOMContentLoaded', () => {

  // --- DARK MODE TOGGLE ---
  const themeToggle = document.querySelector('.theme-toggle');
  const iconSun  = themeToggle ? themeToggle.querySelector('.icon-sun')  : null;
  const iconMoon = themeToggle ? themeToggle.querySelector('.icon-moon') : null;

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (iconSun)  iconSun.style.display  = 'none';
      if (iconMoon) iconMoon.style.display = 'block';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (iconSun)  iconSun.style.display  = 'block';
      if (iconMoon) iconMoon.style.display = 'none';
    }
  };

  // Restore saved preference (default: light)
  const savedTheme = localStorage.getItem('prodesign_theme');
  applyTheme(savedTheme === 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(!isDark);
      localStorage.setItem('prodesign_theme', !isDark ? 'dark' : 'light');
    });
  }

  // --- BILINGUAL & i18n SYSTEM ---
  let currentLang = localStorage.getItem('prodesign_lang') || 'fr';

  const updateLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('prodesign_lang', lang);

    // Set page direction and language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Toggle active class on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate standard text contents
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // Use innerHTML for titles/headings containing span/br tags
        if (key === 'hero-title' || key === 'services-title' || key === 'portfolio-title' || key === 'contact-heading' || key === 'footer-copyright') {
          el.innerHTML = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  };

  // Bind Language Switcher Click events
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      updateLanguage(lang);
    });
  });

  // --- STICKY HEADER EFFECT ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // --- PORTFOLIO FILTER SYSTEM ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all') {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else if (itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // --- SERVICE DETAILS & DYNAMIC MODALS ---
  const serviceDetails = {
    fr: {
      cartesNotebooks: {
        badge: "Identité & Papeterie",
        title: "Cartes de Visite & Notebooks Personnalisés",
        color: "var(--gold-primary)",
        body: `
          <p>Valorisez l'image de votre entreprise ou organisez votre quotidien avec nos créations graphiques sur mesure pour cartes de visite et cahiers d'apprentissage ou de travail.</p>
          <p>Du design minimaliste et élégant aux conceptions les plus créatives, nous déclinons votre identité visuelle sur tous vos supports physiques.</p>
          <ul>
            <li>Design original et sur mesure de cartes de visite (recto/verso, haute résolution).</li>
            <li>Conception graphique de couvertures de notebooks et carnets personnalisés.</li>
            <li>Mise en page des contenus intérieurs (grilles de notes, agendas, suivis).</li>
            <li>Fichiers haute définition prêts pour l'impression (300 DPI, repères de coupe).</li>
          </ul>
        `
      },
      pptMemoires: {
        badge: "Présentation & Rédaction",
        title: "Présentations PowerPoint, Mémoires & Rapports",
        color: "var(--navy-primary)",
        body: `
          <p>Faites bonne impression lors de vos soutenances, réunions professionnelles ou remises de diplômes grâce à des documents et présentations d'une qualité irréprochable.</p>
          <p>Nous combinons la puissance visuelle des diaporamas modernes à la rigueur méthodologique des mises en page académiques et corporatives.</p>
          <ul>
            <li>Création de présentations PowerPoint interactives, modernes et sur mesure.</li>
            <li>Mise en page automatique avancée de mémoires, thèses et rapports de stage.</li>
            <li>Mise en conformité avec les guides méthodologiques universitaires ou d'entreprise.</li>
            <li>Création et intégration d'infographies, de schémas et de graphiques personnalisés.</li>
          </ul>
        `
      }
    },
    ar: {
      cartesNotebooks: {
        badge: "الهوية والمطبوعات",
        title: "بطاقات العمل ودفاتر الملاحظات المخصصة",
        color: "var(--gold-primary)",
        body: `
          <p>عزز صورة عملك أو نظم يومك مع تصاميمنا المخصصة لبطاقات العمل ودفاتر التعلم والعمل.</p>
          <p>من التصاميم البسيطة والأنيقة إلى الأكثر إبداعًا، نطبق هويتك البصرية على جميع مطبوعاتك.</p>
          <ul>
            <li>تصميم أصلي ومخصص لبطاقات العمل (الوجهين، دقة عالية).</li>
            <li>تصميم رسومي لأغلفة الدفاتر والمذكرات المخصصة.</li>
            <li>تنسيق الصفحات الداخلية (جداول، مفكرات، متابعة).</li>
            <li>تسليم ملفات جاهزة للطباعة عالية الدقة.</li>
          </ul>
        `
      },
      pptMemoires: {
        badge: "العروض والتنسيق",
        title: "عروض باوربوينت، الأطروحات والتقارير",
        color: "var(--navy-primary)",
        body: `
          <p>اترك انطباعًا رائعًا خلال مناقشاتك أو اجتماعاتك مع مستندات وعروض عالية الجودة.</p>
          <p>نجمع بين الجاذبية البصرية للعروض التقديمية الحديثة والدقة المنهجية لتنسيق الأطروحات والتقارير.</p>
          <ul>
            <li>إنشاء عروض باوربوينت تفاعلية وعصرية ومخصصة.</li>
            <li>تنسيق احترافي كامل للأطروحات وتقارير التدريب.</li>
            <li>الالتزام التام بالمعايير المنهجية الأكاديمية والمهنية.</li>
            <li>إنشاء وتنسيق المخططات والرسوم البيانية.</li>
          </ul>
        `
      }
    }
  };

  const modalOverlay = document.getElementById('serviceModal');
  const modalClose = document.getElementById('modalClose');
  const modalBtnClose = document.getElementById('modalBtnClose');
  const modalBtnContact = document.getElementById('modalBtnContact');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalBody = document.getElementById('modalBody');
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceSelect = document.getElementById('service');

  let activeServiceKey = '';

  // Open Modal function
  const openModal = (serviceKey) => {
    const data = serviceDetails[currentLang][serviceKey];
    if (!data) return;

    activeServiceKey = serviceKey;
    
    // Set content
    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalBadge.style.backgroundColor = data.color;
    modalBody.innerHTML = data.body;
    
    // Open modal animation
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  };

  // Close Modal function
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Add click events to cards
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceKey = card.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  // Close button events
  modalClose.addEventListener('click', closeModal);
  modalBtnClose.addEventListener('click', closeModal);
  
  // Close when clicking overlay backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Contact Action inside Modal
  modalBtnContact.addEventListener('click', () => {
    closeModal();
    // Auto-select the corresponding option in the contact form select dropdown
    if (activeServiceKey && serviceSelect) {
      serviceSelect.value = activeServiceKey;
    }
  });

  // --- CONTACT FORM SUBMISSION & SUCCESS VIEW ---
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitButton = contactForm.querySelector('.form-submit');
      const originalBtnContent = submitButton.innerHTML;
      
      // Visual feedback: Sending state
      submitButton.disabled = true;
      const sendingText = translations[currentLang]['sending'] || 'Envoi en cours...';
      submitButton.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" style="animation: rotate 2s linear infinite; width: 18px; height: 18px; margin-right: 8px;">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" style="stroke-linecap: round; animation: dash 1.5s ease-in-out infinite;"></circle>
        </svg>
        <span>${sendingText}</span>
      `;
      
      // Inject CSS spinner animation dynamically if not present
      if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.innerHTML = `
          @keyframes rotate { 100% { transform: rotate(360deg); } }
          @keyframes dash { 0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; } }
        `;
        document.head.appendChild(style);
      }

      // Gather form inputs
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        _subject: "Nouveau Projet Client - ProDesign"
      };

      // Perform real email post via FormSubmit.co AJAX API
      fetch("https://formsubmit.co/ajax/sekhri.isra@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        // Restore submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnContent;

        // Hide form and show success message
        contactForm.style.transition = 'opacity 0.3s ease';
        contactForm.style.opacity = '0';
        
        setTimeout(() => {
          contactForm.style.display = 'none';
          successMessage.style.display = 'block';
          successMessage.style.opacity = '0';
          setTimeout(() => {
            successMessage.style.transition = 'opacity 0.4s ease';
            successMessage.style.opacity = '1';
          }, 50);
        }, 300);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Fallback success state so the client is not blocked by network or adblockers
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnContent;
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.style.opacity = '1';
      });
    });

    // Setup reset button action
    const resetFormBtn = document.getElementById('resetFormBtn');
    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
          successMessage.style.display = 'none';
          contactForm.reset();
          contactForm.style.display = 'block';
          setTimeout(() => {
            contactForm.style.opacity = '1';
          }, 50);
        }, 300);
      });
    }
  }

  // --- SMOOTH ANCHOR LINK SCROLLING ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetPosition = targetElement.offsetTop - 80; // Account for sticky header
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- PRODUCT CLICK REDIRECTION ---
  const productItems = document.querySelectorAll('.portfolio-item');
  productItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgEl = item.querySelector('.portfolio-img');
      const titleEl = item.querySelector('.portfolio-title');
      const priceEl = item.querySelector('.portfolio-category');
      
      if (imgEl && titleEl && priceEl) {
        const img = imgEl.getAttribute('src');
        const title = titleEl.textContent;
        const price = priceEl.textContent;
        
        const url = `product.html?img=${encodeURIComponent(img)}&title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
        window.location.href = url;
      }
    });
  });

  // Initialize Language on startup
  updateLanguage(currentLang);

});

// Global Lightbox Handler for Homepage Avis Clients
function openHomeLightbox(src) {
  const modal = document.getElementById('homeLightboxModal');
  const img = document.getElementById('homeLightboxImg');
  if (modal && img) {
    img.src = src;
    modal.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const homeModal = document.getElementById('homeLightboxModal');
  const homeClose = document.getElementById('homeLightboxClose');

  if (homeClose && homeModal) {
    homeClose.addEventListener('click', () => {
      homeModal.classList.remove('active');
    });

    homeModal.addEventListener('click', (e) => {
      if (e.target === homeModal) {
        homeModal.classList.remove('active');
      }
    });
  }
});

