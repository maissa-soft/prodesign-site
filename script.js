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
        if (key === 'hero-title' || key === 'services-title' || key === 'portfolio-title' || key === 'contact-heading') {
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
      powerpoint: {
        badge: "Design & Présentation",
        title: "Présentations PowerPoint Professionnelles",
        color: "var(--color-powerpoint)",
        body: `
          <p>Vos idées méritent d'être présentées sous leur meilleur jour. Que ce soit pour une soutenance de mémoire, un pitch devant des investisseurs, une réunion commerciale importante ou une conférence, nous concevons des présentations PowerPoint haut de gamme, claires, structurées et visuellement percutantes.</p>
          <p>Notre approche s'appuie sur une charte visuelle personnalisée, le respect de votre identité visuelle et la simplification de vos messages pour un impact maximum.</p>
          <ul>
            <li>Structuration logique du contenu et rédaction de messages clés.</li>
            <li>Design graphique unique et sur mesure (aucun template générique).</li>
            <li>Intégration d'infographies, d'illustrations et de schémas explicatifs.</li>
            <li>Animations subtiles et transitions professionnelles et fluides.</li>
            <li>Fichiers livrés au format modifiable (.pptx) et en PDF de haute qualité.</li>
          </ul>
        `
      },
      memoires: {
        badge: "Mise en page académique & pro",
        title: "Mise en page de Mémoires & Rapports",
        color: "var(--color-memoires)",
        body: `
          <p>Un document académique ou professionnel de qualité doit refléter la rigueur de son contenu à travers une structure impeccable. Nous prenons en charge la mise en page et la mise en conformité de vos mémoires de fin d'études, thèses de doctorat, rapports de stage, livres blancs ou bilans d'activité.</p>
          <p>We veillent au respect méticuleux des guides méthodologiques imposés par votre université ou de la charte éditoriale de votre entreprise.</p>
          <ul>
            <li>Mise en page automatique avancée (marges, en-têtes, pieds de page).</li>
            <li>Création automatisée de la table des matières, de la table des illustrations et de la bibliographie.</li>
            <li>Uniformisation typographique (polices, interlignes, espacements, citations).</li>
            <li>Traitement et amélioration graphique des tableaux, courbes et schémas.</li>
            <li>Livraison de fichiers PDF prêts pour l'impression et de fichiers sources (.docx).</li>
          </ul>
        `
      },
      cartes: {
        badge: "Identité / Print",
        title: "Cartes de Visite Haut de Gamme",
        color: "var(--color-cartes)",
        body: `
          <p>Votre carte de visite est le premier support physique que vous laissez à un contact. Elle doit transmettre instantanément le sérieux et le positionnement de votre activité. Nous concevons des cartes de visite sur mesure qui marquent les esprits et reflètent parfaitement votre logo et vos valeurs.</p>
          <p>Du design minimaliste et élégant aux conceptions graphiques les plus audacieuses, nous adaptons le style à votre secteur d'activité.</p>
          <ul>
            <li>Design original et personnalisé recto/verso selon vos directives.</li>
            <li>Harmonisation des couleurs avec votre logo et identité visuelle existante.</li>
            <li>Fichiers haute définition livrés prêts pour l'imprimeur (CMJN, 300 DPI, repères de coupe).</li>
            <li>Conseils d'expert sur le choix des papiers (mat, brillant, soft-touch) et des finitions (dorure, vernis sélectif).</li>
            <li>Déclinaison possible pour plusieurs collaborateurs.</li>
          </ul>
        `
      },
      notebooks: {
        badge: "Merchandising / Cadeaux",
        title: "Notebooks & Cahiers Personnalisés",
        color: "var(--color-notebooks)",
        body: `
          <p>Qu'il s'agisse d'un outil de travail pour vos équipes, d'un cadeau d'entreprise pour vos clients ou de carnets à commercialiser, le notebook personnalisé est un formidable vecteur de communication. Nous concevons le design extérieur de la couverture et la grille intérieure de vos carnets de notes selon vos envies.</p>
          <p>Nous créons des couvertures thématiques artistiques et professionnelles intégrant vos logos, slogans et éléments graphiques de marque.</p>
          <ul>
            <li>Création graphique de la couverture (plats recto/verso et tranche).</li>
            <li>Conception sur mesure des pages intérieures (grille pointillée, lignée, blanche ou agenda).</li>
            <li>Intégration d'éléments spécifiques de marque (histoire de l'entreprise, pages de présentation).</li>
            <li>Fichiers de mise en page haute définition configurés selon le gabarit de l'imprimeur de votre choix.</li>
            <li>Adapté à tous formats (A5, A4, carré) et types de reliures (spirales, cousue).</li>
          </ul>
        `
      },
      sitesweb: {
        badge: "Présence Web / Digital",
        title: "Création de Sites Web Vitrines",
        color: "var(--color-sitesweb)",
        body: `
          <p>Un site internet professionnel est la clé de votre crédibilité et votre meilleur commercial, actif 24h/24. Nous concevons et développons des sites web vitrines modernes, rapides, fluides et optimisés pour convertir vos visiteurs en clients qualifiés.</p>
          <p>Tous nos sites sont développés avec une approche axée sur les performances d'affichage, la sécurité et la visibilité sur les moteurs de recherche.</p>
          <ul>
            <li>Design unique et moderne adapté à tous les écrans (100% Responsive & Mobile First).</li>
            <li>Architecture optimisée pour le référencement naturel (SEO ready).</li>
            <li>Intégrations interactives (formulaires de contact, galeries de photos, liens réseaux sociaux).</li>
            <li>Vitesse de chargement optimale (compression d'images, code léger).</li>
            <li>Accompagnement pour l'achat de nom de domaine, la configuration de l'hébergement et la mise en ligne.</li>
          </ul>
        `
      }
    },
    ar: {
      powerpoint: {
        badge: "تصميم وعروض",
        title: "عروض باوربوينت التقديمية الاحترافية",
        color: "var(--color-powerpoint)",
        body: `
          <p>تستحق أفكاركم أن تُعرض بأفضل شكل ممكن. سواء كان ذلك لمناقشة أطروحة، أو عرض مشروع للمستثمرين، أو اجتماع عمل مهم، نحن نصمم عروضًا تقديمية احترافية، واضحة، ومنظمة ومؤثرة بصريًا.</p>
          <p>تعتمد طريقتنا على تصميم هوية بصرية مخصصة، واحترام الهوية البصرية لعلامتكم التجارية وتبسيط الرسائل لتحقيق أقصى تأثير.</p>
          <ul>
            <li>تنظيم منطقي للمحتوى وكتابة الرسائل الأساسية.</li>
            <li>تصميم رسومي فريد ومخصص (لا نستخدم قوالب جاهزة).</li>
            <li>دمج الإنفوجرافيك، والرسوم التوضيحية والمخططات التفسيرية.</li>
            <li>حركات وتأثيرات انتقالية سلسة واحترافية.</li>
            <li>تسليم الملفات بصيغة قابلة للتعديل (.pptx) وبصيغة PDF عالية الجودة.</li>
          </ul>
        `
      },
      memoires: {
        badge: "تنسيق أكاديمي ومهني",
        title: "تنسيق الأطروحات والتقارير",
        color: "var(--color-memoires)",
        body: `
          <p>يجب أن تعكس الوثيقة الأكاديمية أو المهنية عالية الجودة دقة محتواها من خلال تنسيق مثالي. نحن نتولى تنسيق وضبط أطروحات التخرج، رسائل الدكتوراه، تقارير التدريب، الكتب البيضاء أو تقارير النشاط السنوي.</p>
          <p>نحرص على التطبيق الدقيق للمعايير المنهجية التي تفرضها جامعتكم أو الميثاق التحريري لشركتكم.</p>
          <ul>
            <li>تنسيق تلقائي متقدم (الهوامش، الرؤوس، وتذييل الصفحات).</li>
            <li>إنشاء تلقائي لجدول المحتويات، الفهارس والمراجع.</li>
            <li>توحيد الخطوط وأحجامها والمسافات البينية والاقتباسات.</li>
            <li>تنسيق وتحسين المخططات والرسوم البيانية والجداول.</li>
            <li>تسليم ملفات PDF جاهزة للطباعة وملفات وورد المصدرية (.docx).</li>
          </ul>
        `
      },
      cartes: {
        badge: "الهوية والمطبوعات",
        title: "بطاقات عمل فاخرة",
        color: "var(--color-cartes)",
        body: `
          <p>بطاقة العمل هي أول انطباع تتركه لعملائك. يجب أن تعبر فورًا عن جدية ومستوى نشاطك. نحن نصمم بطاقات عمل مخصصة تلفت الانتباه وتعكس شعارك وقيمك بشكل مثالي.</p>
          <p>من التصاميم البسيطة والأنيقة إلى التصاميم الرسومية الأكثر جرأة، نقوم بملائمة الأسلوب مع مجال عملك.</p>
          <ul>
            <li>تصميم أصلي ومخصص للوجهين وفقًا لتوجيهاتكم.</li>
            <li>تناسق الألوان مع شعاركم وهويتكم البصرية الحالية.</li>
            <li>تسليم ملفات عالية الدقة جاهزة للطباعة (CMJN، 300 DPI مع علامات القص).</li>
            <li>نصائح الخبراء حول اختيار أنواع الورق واللمسات النهائية (تذهيب، ورنيش موضعي).</li>
            <li>إمكانية تعديل البطاقة لعدة موظفين.</li>
          </ul>
        `
      },
      notebooks: {
        badge: "مبيعات وهدايا",
        title: "دفاتر ملاحظات مخصصة",
        color: "var(--color-notebooks)",
        body: `
          <p>سواء كانت أداة عمل لفرقك، أو هدية لعملائك، أو دفاتر للبيع، فإن دفتر الملاحظات المخصص هو وسيلة تواصل رائعة. نحن نصمم الغلاف الخارجي والتنسيق الداخلي لدفاترك حسب رغبتك.</p>
          <p>نبتكر أغلفة مهنية وفنية تتضمن شعاراتكم وهويتكم البصرية.</p>
          <ul>
            <li>تصميم رسومي كامل للغلاف (الوجه، الخلفية والكعب).</li>
            <li>تنسيق مخصص للصفحات الداخلية (منقط، مسطر، أبيض أو مفكرة).</li>
            <li>دمج عناصر علامتك التجارية (تاريخ الشركة، صفحات تعريفية).</li>
            <li>تسليم ملفات تنسيق عالية الدقة متوافقة مع متطلبات المطبعة.</li>
            <li>متوافق مع جميع المقاسات (A4, A5) وأنواع التجليد.</li>
          </ul>
        `
      },
      sitesweb: {
        badge: "حضور رقمي",
        title: "تصميم مواقع إنترنت تعريفية",
        color: "var(--color-sitesweb)",
        body: `
          <p>الموقع الإلكتروني المهني هو مفتاح مصداقيتك وأفضل أداة تسويقية تعمل لصالحك على مدار الساعة. نحن نصمم ونطور مواقع تعريفية حديثة، سريعة، متجاوبة ومحسنة لتحويل الزوار إلى عملاء.</p>
          <p>يتم تطوير جميع مواقعنا بالتركيز على سرعة الأداء، الحماية والتوافق مع محركات البحث.</p>
          <ul>
            <li>تصميم فريد وعصري متوافق مع جميع الشاشات (متجاوب 100%).</li>
            <li>هيكلة محسنة لمحركات البحث (SEO Ready).</li>
            <li>إضافات تفاعلية (نماذج الاتصال، معارض الصور، روابط التواصل الاجتماعي).</li>
            <li>سرعة تحميل فائقة (ضغط الصور وتطوير كود نظيف).</li>
            <li>مرافقة لشراء اسم النطاق وإعداد الاستضافة وإطلاق الموقع.</li>
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
