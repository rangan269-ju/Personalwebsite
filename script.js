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

const firstInternship = document.querySelector('.internship-project:not(.dense-coding-project)');
const fellowshipLink = firstInternship?.querySelector('.fellowship-link');
document.querySelectorAll('.internship-project').forEach((card) => {
  const label = document.createElement('span');
  label.className = 'internship-label';
  label.textContent = 'A Project Internship on';
  card.append(label);
});
const fellowshipParagraph = fellowshipLink?.parentElement;
if (fellowshipLink && fellowshipParagraph) {
  const fellowshipLabel = fellowshipParagraph.firstChild?.textContent.trim();
  fellowshipParagraph.textContent = '';
  fellowshipLink.textContent = '';
  const arrow = document.createElement('span');
  arrow.textContent = '↗';
  fellowshipLink.append(arrow, fellowshipLabel);
  fellowshipParagraph.append(fellowshipLink);
}

const denseCodingProject = document.querySelector('.dense-coding-project');
if (denseCodingProject) {
  denseCodingProject.querySelector('.project-timeline').textContent = 'May-August 2026';
  denseCodingProject.querySelectorAll('p').forEach((paragraph) => {
    if (paragraph.textContent.trim() === 'Study of dense coding protocols using bipartite and multipartite entangled states.') {
      paragraph.remove();
    }
  });
  const projectDetails = [
    { text: 'Supervisor: Dr. Kuntal Roy' },
    { text: 'Indian Institute of Science Education & Research Bhopal' },
    { text: 'IISERB Summer Internship Program 2026', href: 'https://www.iiserb.ac.in/doaa/internship' },
  ];
  const projectLinks = denseCodingProject.querySelector('.project-links');
  projectDetails.forEach((detail) => {
    const paragraph = document.createElement('p');
    if (detail.href) {
      const link = document.createElement('a');
      const arrow = document.createElement('span');
      link.href = detail.href;
      link.className = 'internship-detail-link';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = detail.text;
      arrow.textContent = '↗';
      link.prepend(arrow);
      paragraph.append(link);
    } else {
      paragraph.textContent = detail.text;
    }
    denseCodingProject.insertBefore(paragraph, projectLinks);
  });
  projectLinks.innerHTML = '';
  [
    { text: 'ResearchGate / DOI:', href: 'https://doi.org/10.13140/RG.2.2.36663.69287', doi: '10.13140/RG.2.2.36663.69287' },
    { text: 'Abstract', href: 'https://drive.google.com/' },
  ].forEach((resource) => {
    const link = document.createElement('a');
    const arrow = document.createElement('span');
    link.href = resource.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = resource.text;
    if (resource.doi) {
      const doiNumber = document.createElement('span');
      doiNumber.className = 'doi-number';
      doiNumber.textContent = resource.doi;
      link.append(doiNumber);
    }
    arrow.textContent = '↗';
    link.prepend(arrow);
    projectLinks.append(link);
  });
}

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