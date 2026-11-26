/* Adds a softly rotating 3D-inspired Chaturanga medallion and slide-like scene transitions. */
(() => {
  const sculpture = document.createElement('div');
  sculpture.id = 'heritageSculpture';
  sculpture.setAttribute('aria-hidden', 'true');
  sculpture.innerHTML = '<div class="sculpture-orbit"><div class="sculpture-disk"><span class="sculpture-knight">♞</span><span class="sculpture-mark">Chaturanga · 06th c.</span></div></div>';
  document.body.prepend(sculpture);
  const ambience = document.createElement('div');
  ambience.className = 'glass-ambience';
  ambience.setAttribute('aria-hidden', 'true');
  document.body.prepend(ambience);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-in');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('.section').forEach(section => observer.observe(section));
  }

  const observeLibrary = () => {
    const panel = document.getElementById('tabContent');
    if (!panel) return;
    const observer = new MutationObserver(() => {
      panel.classList.remove('scene-arrive');
      void panel.offsetWidth;
      panel.classList.add('scene-arrive');
    });
    observer.observe(panel, { childList: true, subtree: true });
  };
  observeLibrary();

  for (const name of ['openGame', 'showHome']) {
    const original = window[name];
    if (typeof original !== 'function') continue;
    window[name] = function(...args) {
      const target = name === 'openGame' ? document.getElementById('library') : document.getElementById('home');
      if (target) target.classList.add('scene-arrive');
      return original.apply(this, args);
    };
  }
})();
