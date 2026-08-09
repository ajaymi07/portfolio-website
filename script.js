document.addEventListener('DOMContentLoaded', () => {

  /* ===================================
     1. Mobile Navigation Menu Toggle
     =================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuToggle && navLinks) {
    // Toggle menu visibility
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      });
    });
  }


  /* ===================================
     2. Dark / Light Mode Toggle
     =================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');

  // Check saved theme preference from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    // Toggle icon
    if (isDark) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });


  /* ===================================
     3. Scroll Animations (IntersectionObserver)
     =================================== */
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  const elementInView = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  };

  const scrollObserver = new IntersectionObserver(elementInView, {
    threshold: 0.15
  });

  scrollElements.forEach(el => scrollObserver.observe(el));


  /* ===================================
     4. Contact Form Validation
     =================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formMessage = document.getElementById('form-message');

  const showError = (input, message) => {
    input.classList.add('invalid');
    const errorSmall = input.parentElement.querySelector('.error-msg');
    if (errorSmall) errorSmall.textContent = message;
  };

  const clearError = (input) => {
    input.classList.remove('invalid');
    const errorSmall = input.parentElement.querySelector('.error-msg');
    if (errorSmall) errorSmall.textContent = '';
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Message
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message cannot be empty.');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      // Success feedback
      if (isValid) {
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        contactForm.reset();

        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 4000);
      }
    });
  }

});