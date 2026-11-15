const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

document.getElementById('year').textContent = new Date().getFullYear();

// The form intentionally does not collect or store submissions. Replace the
// email draft flow with a properly configured form service before launch.
document.getElementById('enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Alice Childcare Services enquiry: ${data.get('subject')}`;
  const body = `Hello Alice Childcare Services,\n\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}`;
  const emailDraft = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-feedback').textContent = 'Your email app should open with a prepared enquiry. Add the childcare service’s verified email address before sending.';
  window.location.href = emailDraft;
});
