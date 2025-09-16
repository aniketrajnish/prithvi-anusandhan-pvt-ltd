// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const backToTopBtn = document.getElementById('backToTop');
  const faqItems = document.querySelectorAll('.faq-item');

  // Toggle navigation on mobile
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close nav when a link is clicked (for single page navigation)
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // FAQ accordion toggle
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.question');
    questionBtn.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // Back to top functionality
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };


  // Observe only sections that exist for the nav links
  const sectionIds = [...navLinks]
    .map(l => l.getAttribute('href'))
    .filter(h => h && h.startsWith('#'))
    .map(h => h.slice(1));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // Make sure "Home" is active on load
  if (sections.length) setActiveLink(sections[0].id);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, {
    root: null,
    threshold: 0.6 // active when ~60% of section is visible
  });

  sections.forEach(sec => observer.observe(sec));

  // Also set active immediately on nav click (nice on mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href').replace('#','');
      setActiveLink(id);
    });
  });
});