// The CloudOps Collective — shared site behavior

(function () {
  // Mobile nav toggle
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      const expanded = nav.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', String(expanded));
    });
    // Close on link click (mobile)
    nav.querySelectorAll('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  // Reveal-on-scroll
  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add('in'));
  }

  // Email form — fake submit (prototype)
  document.querySelectorAll('.email-form').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (!input || !btn) return;
      if (!input.value || !input.value.includes('@')) {
        input.focus();
        input.style.outline = '2px solid #FF6B47';
        setTimeout(() => (input.style.outline = ''), 1200);
        return;
      }
      const orig = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      btn.disabled = true;
      input.value = '';
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
      }, 2200);
    });
  });
  // Dropdown — click toggle on mobile, hover handled by CSS on desktop.
  // Click anywhere outside closes any open dropdown.
  document.querySelectorAll('.nav-item-dropdown').forEach((dd) => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      // On mobile-width, treat as accordion. On desktop, allow hover OR click-toggle.
      e.preventDefault();
      document.querySelectorAll('.nav-item-dropdown').forEach((other) => {
        if (other !== dd) other.classList.remove('is-open');
      });
      dd.classList.toggle('is-open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown').forEach((dd) => dd.classList.remove('is-open'));
    }
  });

  // Generic form submit — fake success toast for any [data-prototype-form]
  document.querySelectorAll('form[data-prototype-form]').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const toast = form.querySelector('.form-toast') || form.parentElement.querySelector('.form-toast');
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Submitting…'; btn.disabled = true; }
      setTimeout(() => {
        form.reset();
        if (btn) { btn.textContent = orig; btn.disabled = false; }
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 5000);
        }
      }, 600);
    });
  });
})();
