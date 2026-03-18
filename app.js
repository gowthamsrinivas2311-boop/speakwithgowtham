/* ═══════════════════════════════════════
   SpeakWithGowtham — Main JavaScript
   Scroll reveals, sticky nav, FAQ, 
   mobile menu, custom cursor, timeline
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Custom Cursor ───
  const cursor = document.getElementById('customCursor');
  if (window.matchMedia('(pointer: fine)').matches && cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      if (!cursor.classList.contains('active')) {
        cursor.classList.add('active');
      }
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });

    // Enlarge on hover over interactive elements
    const interactives = document.querySelectorAll('a, button, .faq__question');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ─── Sticky Nav ───
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  function handleNavScroll() {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ─── Mobile Menu ───
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuLinks = document.querySelectorAll('[data-menu-link]');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll Reveal ───
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.reveal'));
            const idx = siblings.indexOf(entry.target);
            const delay = idx * 100; // 0.1s stagger
            entry.target.style.transitionDelay = delay + 'ms';
          }
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ─── Timeline scroll fill ───
  const timelineFill = document.getElementById('timelineFill');
  const timelineSection = document.querySelector('.timeline');

  if (timelineFill && timelineSection) {
    function updateTimeline() {
      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the timeline is past the viewport center
      const scrolledPast = windowHeight * 0.5 - sectionTop;
      const progress = Math.max(0, Math.min(1, scrolledPast / sectionHeight));
      timelineFill.style.height = (progress * 100) + '%';
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();
  }

  // ─── FAQ Accordion ───
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq__question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        faqItems.forEach((fi) => {
          fi.classList.remove('active');
          const btn = fi.querySelector('.faq__question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ─── Button hover glow pulse ───
  const primaryBtns = document.querySelectorAll('.btn--primary');
  primaryBtns.forEach((btn) => {
    btn.addEventListener('mouseenter', function () {
      this.style.animation = 'glowPulse 1.5s ease-in-out infinite';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.animation = '';
    });
  });

  // Inject glow pulse keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.3), 0 0 40px rgba(201,168,76,0.1); }
      50% { box-shadow: 0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2); }
    }
  `;
  document.head.appendChild(style);

})();
