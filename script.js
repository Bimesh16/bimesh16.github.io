const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  navLinks?.classList.remove('is-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navLinks?.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});
const copyButton = document.querySelector('.copy-email');
copyButton?.addEventListener('click', async () => {
  const status = document.querySelector('.copy-feedback');
  try {
    await navigator.clipboard.writeText('bimeshregmi04@gmail.com');
    status.textContent = 'Copied!';
  } catch {
    status.textContent = 'Select the email address to copy it.';
  }
});
