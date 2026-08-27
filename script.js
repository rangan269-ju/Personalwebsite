const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.progress-footer span:last-child')?.remove();

const graduationStart = new Date(2023, 7, 1);
const graduationEnd = new Date(2027, 7, 1);
const graduationPercentage = document.querySelector('#graduation-percentage');
const graduationFill = document.querySelector('#graduation-fill');

function updateGraduationProgress() {
  const elapsed = Date.now() - graduationStart.getTime();
  const duration = graduationEnd.getTime() - graduationStart.getTime();
  const percentage = Math.min(100, Math.max(0, (elapsed / duration) * 100));
  const formattedPercentage = `${percentage.toFixed(2)}%`;

  graduationPercentage.textContent = formattedPercentage;
  graduationFill.style.width = formattedPercentage;
  graduationFill.parentElement.setAttribute('aria-valuenow', percentage.toFixed(2));
}

updateGraduationProgress();
setInterval(updateGraduationProgress, 60 * 60 * 1000);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));