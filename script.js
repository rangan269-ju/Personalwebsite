const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const pageViews = {
  home: ['.hero', '.marquee'],
  education: ['#education'],
  experience: ['.work'],
  gallery: ['#gallery'],
  qualification: ['#qualification'],
  publication: ['#publication'],
  contact: ['.contact'],
};
const requestedPage = new URLSearchParams(window.location.search).get('page') || 'home';
const currentPage = Object.prototype.hasOwnProperty.call(pageViews, requestedPage) ? requestedPage : 'home';
const visibleViews = pageViews[currentPage];
const profileViews = ['#education', '.work', '#qualification', '#publication'];

document.querySelector('.hero').hidden = !visibleViews.includes('.hero');
document.querySelector('.marquee').hidden = !visibleViews.includes('.marquee');
document.querySelector('.contact').hidden = !visibleViews.includes('.contact');
document.querySelector('#gallery').hidden = !visibleViews.includes('#gallery');
document.querySelectorAll('.profile-item, .work').forEach((section) => {
  const viewId = section.matches('.work') ? '.work' : `#${section.id}`;
  section.hidden = !visibleViews.includes(viewId);
});
document.querySelector('.profile-section').hidden = !profileViews.some((view) => visibleViews.includes(view));
document.title = `${currentPage[0].toUpperCase()}${currentPage.slice(1)} | Rangan Chakrabarty`;

document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
  if (new URL(link.href).searchParams.get('page') === currentPage) {
    link.setAttribute('aria-current', 'page');
  }
});

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

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && currentPage === 'home') {
  const heroCaption = heroVisual.querySelector('.visual-caption');
  const heroLabel = heroVisual.querySelector('.visual-label');
  const heroSlides = [
    {
      image: 'pictures/1791971786015.jpeg',
      caption: 'Durga Pujo 2026',
      position: 'center 36%',
      size: 'cover',
      captionTone: 'dark',
    },
    {
      image: 'pictures/1791310894099.jpeg',
      caption: 'Sammanoy (Reunion), Dept of Physics, JU, 2026',
      position: 'center center',
      size: 'contain',
    },
    {
      image: 'pictures/IMG_7204.jpeg',
      caption: 'At SISDSA 2026 seminar, Jadavpur University.',
      position: 'center center',
      size: 'cover',
    },
  ];
  let activeHeroSlide = 0;

  window.setInterval(() => {
    activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
    const slide = heroSlides[activeHeroSlide];
    heroVisual.style.backgroundImage = `url("${slide.image}")`;
    heroVisual.style.backgroundPosition = slide.position;
    heroVisual.style.backgroundSize = slide.size;
    heroVisual.style.backgroundRepeat = 'no-repeat';
    heroVisual.setAttribute('aria-label', slide.caption);
    heroCaption.textContent = slide.caption;
    heroCaption.classList.toggle('visual-caption-dark', slide.captionTone === 'dark');
    heroLabel.textContent = `${String(activeHeroSlide + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`;
    heroVisual.classList.add('is-changing');
    window.setTimeout(() => heroVisual.classList.remove('is-changing'), 700);
  }, 4500);
}

function setupGalleryCarousel(visual, slides) {
  const image = visual.querySelector('img');
  const caption = visual.querySelector('.visual-caption');
  const label = visual.querySelector('.visual-label');
  let activeSlide = 0;

  window.setInterval(() => {
    activeSlide = (activeSlide + 1) % slides.length;
    const slide = slides[activeSlide];
    image.src = slide.image;
    image.alt = slide.alt;
    caption.textContent = slide.caption;
    label.textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    visual.setAttribute('aria-label', slide.caption);
    visual.classList.toggle('show-full-image', Boolean(slide.fullImage));
    visual.classList.add('is-changing');
    window.setTimeout(() => visual.classList.remove('is-changing'), 700);
  }, 4500);
}

if (currentPage === 'gallery') {
  const researchDiaryVisual = document.querySelector('.research-diary-visual');
  if (researchDiaryVisual) {
    setupGalleryCarousel(researchDiaryVisual, [
      { image: 'pictures/IMG_20250715_173808297.jpg', caption: 'Bose Institute, Kolkata', alt: 'Bose Institute, Kolkata' },
      { image: 'pictures/IMG_20250707_175814160.jpg', caption: 'Bose Institute, Kolkata', alt: 'Bose Institute, Kolkata' },
      { image: 'pictures/IMG_20250710_144858401.jpg', caption: 'My Desk at Bose Institute', alt: 'Research desk at Bose Institute' },
      { image: 'pictures/images.jpg', caption: 'IISER Bhopal', alt: 'IISER Bhopal campus', fullImage: true },
    ]);
  }

  const attendedEventsVisual = document.querySelector('.attended-events-visual');
  if (attendedEventsVisual) {
    setupGalleryCarousel(attendedEventsVisual, [
      { image: 'pictures/IMG_20260201_142143011.jpg', caption: 'IIT KGP Research Park', alt: 'IIT KGP Research Park' },
      { image: 'pictures/IMG_20260201_125640406.jpg', caption: 'IIT KGP Research Park', alt: 'IIT KGP Research Park' },
      { image: 'pictures/IMG_20260201_110614775.jpg', caption: 'IIT KGP Research Park', alt: 'IIT KGP Research Park' },
      { image: 'pictures/IMG_20260120_123700813.jpg', caption: 'TCG Crest Centre, Kolkata', alt: 'TCG Crest Centre, Kolkata', fullImage: true },
      { image: 'pictures/IMG_20260414_184638042.jpg', caption: 'TCG Crest Centre, Kolkata', alt: 'TCG Crest Centre, Kolkata' },
      { image: 'pictures/IMG_20260307_101132220.jpg', caption: 'International Workshop on Nanophotonics, City Centre 2, Kolkata', alt: 'International Workshop on Nanophotonics at City Centre 2, Kolkata' },
      { image: 'pictures/IMG-20260307-WA0007.jpg', caption: 'International Workshop on Nanophotonics, City Centre 2, Kolkata', alt: 'International Workshop on Nanophotonics at City Centre 2, Kolkata' },
    ]);
  }

  const varsityDiaryVisual = document.querySelector('.varsity-diary-visual');
  if (varsityDiaryVisual) {
    setupGalleryCarousel(varsityDiaryVisual, [
      { image: 'pictures/img-52.jpeg', caption: 'Samannoy 2026', alt: 'Samannoy 2026' },
      { image: 'pictures/IMG-20260313-WA0012.jpg', caption: 'Funtime :)', alt: 'Fun moment at university' },
      { image: 'pictures/IMG-20260318-WA0015.jpg', caption: 'Did something Great anyway :)', alt: 'A memorable university moment' },
      { image: 'pictures/IMG-20260318-WA0045.jpg', caption: 'With Prof. Sinha, RRI Bangalore', alt: 'With Professor Sinha at RRI Bangalore' },
      { image: 'pictures/IMG_20260314_194456421.jpg', caption: 'Night life @JU', alt: 'Nightlife at Jadavpur University' },
    ]);
  }
}

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.progress-footer span:last-child')?.remove();

const firstInternship = document.querySelector('.internship-project:not(.dense-coding-project)');
const fellowshipLink = firstInternship?.querySelector('.fellowship-link');
const firstAbstractLink = firstInternship?.querySelector('.project-links a:last-child');
if (firstAbstractLink) {
  firstAbstractLink.href = 'https://drive.google.com/uc?export=download&id=1TAzVu03wXdVtlFovLBMcXA1WIsv2ABNn';
}
if (firstInternship) {
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  figure.className = 'dense-coding-figure first-internship-figure';
  image.src = 'pictures/entanglement%20cityscape.png';
  image.alt = 'Quantum statevector city plot showing real and imaginary amplitudes';
  figure.append(image);
  firstInternship.querySelector('.project-links')?.after(figure);
}
const projectGrid = document.querySelector('.work .project-entry-grid');
if (projectGrid) {
  const scholarlyHeading = document.createElement('h3');
  scholarlyHeading.className = 'scholarly-heading';
  scholarlyHeading.textContent = 'Scholarly work';
  projectGrid.after(scholarlyHeading);
  const scholarlyCard = document.createElement('article');
  scholarlyCard.className = 'scholarly-card';
  scholarlyCard.innerHTML = '<span class="scholarly-card-index">02</span><h3>Superdense Coding Protocol in Maximally and Non-maximally Entangled Bell State: An Experimental Realisation</h3><p>Published in <em>Abstract Book: Scientific Innovation and Skill Development for Societal Advancement</em></p><p>Innovation &amp; Skill Development Research Centre, Jadavpur University, India · 2026</p><a class="scholarly-card-link" href="https://doi.org/10.13140/RG.2.2.22746.91843" target="_blank" rel="noopener noreferrer" aria-label="Open ResearchGate DOI"><span>↗</span> ResearchGate / DOI: <span class="doi-number">10.13140/RG.2.2.22746.91843</span></a><a class="scholarly-card-link" href="https://drive.google.com/uc?export=download&amp;id=1ToPfW1x9e7QYZ5J9rGE3fAvibrJyEWTS" aria-label="Download abstract"><span>↗</span> Abstract</a><a class="scholarly-card-link" href="https://drive.google.com/uc?export=download&amp;id=1eJ5AMMzWMnt3Mb0F7u2ODuxFsIbAxwHX" aria-label="Download poster"><span>↗</span> Poster</a>';
  scholarlyHeading.after(scholarlyCard);
  const secondScholarlyCard = document.createElement('article');
  secondScholarlyCard.className = 'scholarly-card';
  secondScholarlyCard.innerHTML = '<span class="scholarly-card-index">01</span><h3>Ancilla-Entangled Modified Qutrit Deutsch–Jozsa (DJ) Algorithm for Useful Discrimination Between Function Types of An Odd-Level Qudit System</h3><p>Published in <em>Abstract Book: Scientific Innovation and Skill Development for Societal Advancement</em></p><p>ISBN No: 978-81-987857-6-3</p><p>Innovation &amp; Skill Development Research Centre, Jadavpur University, India · 2025</p><a class="scholarly-card-link" href="https://drive.google.com/uc?export=download&amp;id=1ACMXFrVa7RHp0wzm-JgYlG7j_JYHoosi" aria-label="Download abstract"><span>↗</span> Abstract</a>';
  scholarlyCard.after(secondScholarlyCard);
  const workshopHeading = document.createElement('h3');
  workshopHeading.className = 'scholarly-heading workshop-heading';
  workshopHeading.textContent = 'Attended workshops and courses';
  secondScholarlyCard.after(workshopHeading);
  const workshopCard = document.createElement('article');
  workshopCard.className = 'workshop-card';
  workshopCard.innerHTML = '<span class="scholarly-card-index">Learning record</span><ol class="workshop-list" reversed><li>CERN-MPQ-UIBK School on Quantum Simulation of Fundamental Physics, 17 August to 4 September 2026</li><li>Introduction to Quantum Computing in Fluid Dynamics (STO-AVT-377), 06-10 July 2026, Von-Karmann Institute for Fluid Dynamics, Belgium</li><li>International Workshop on Nano-photonics using structured light, IISER Kolkata and University at Buffalo, SPARC, 7 March 2026 <a href="https://drive.google.com/uc?export=download&amp;id=1uOrKydeN2anYDa1a1ZPAUAngxF0hprEo" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>Workshop on Quantum Computing and Quantum Key Distribution (QKD), IIT Delhi, 27 February 2026 to 1 March 2026 <a href="https://drive.google.com/uc?export=download&amp;id=1TL8kjZkPKYqeoUk7mt9nnWZ4h8DkPc3u" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>Familiarisation workshop on Quantum Computing, Foundation for QC Innovations, IISc, India, 2026 <a href="https://drive.google.com/uc?export=download&amp;id=1WVQtCkAq4JrkASNk-tq-9vaVKKrF60OO" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>Workshop on Quantum Computing and Algorithms, IIT Kharagpur, India, 31 January and 1 February 2026 <a href="https://drive.google.com/uc?export=download&amp;id=1LOt6r0R2hUTHvXDmhl740sPYz4gOO94r" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>Summer School on Correlated Quantum Materials &amp; Solid-State Quantum Systems 2025, Julius-Maximilians-Universitat Wurzburg, 15–19 September 2025</li><li>INUP-i2i online familiarization workshop on nanofabrication &amp; characterisation- IIT KGP- 2025 <a href="https://drive.google.com/uc?export=download&amp;id=1IqakSE80kBtRvirf6UG0MSezLZISpIji" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>QuCAM (Quantum Computing-Circuits, Algorithms, &amp; Machine Learning) Workshop, NIT Rourkela, India, 2025</li><li>Introductory Course on Quantum Computing, IISER Pune, India, 2024–25 <a href="https://drive.google.com/uc?export=download&amp;id=1sgIMb-mWTsk6QFnRIglUeTgSHb6mNWAt" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>AI Winter School, Centre for Fundamental Physics of the Universe, Brown University, USA, 2025 <a href="https://drive.google.com/uc?export=download&amp;id=1ORo3sxO7IakUHW4bqKJBtPJqxbwnikIp" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>Winter School on Semiconductor Technology, CeNSE, IISc, India, 2024 <a href="https://drive.google.com/uc?export=download&amp;id=1SZiUrxu9o2Ie2XDfJy9m4O4ctlaH4kSJ" target="_blank" rel="noopener noreferrer">Certificate ↗</a></li><li>Workshop on Classical and Quantum Machine Learning for Condensed Matter Physics, ICTP-Italy, 2024 <a href="https://drive.google.com/uc?export=download&amp;id=1ERSvCGcr1wE6zF4m50vy1_SHyIbEuXgu" target="_blank" rel="noopener noreferrer">Invitation letter ↗</a></li></ol>';
  const workshopList = workshopCard.querySelector('.workshop-list');
  workshopCard.querySelectorAll('.workshop-list a').forEach((link) => {
    const label = link.textContent.replace(/↗/g, '').replace(/\s+/g, ' ').trim() || 'Certificate';
    link.textContent = label;
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    link.append(arrow);
  });
  workshopHeading.after(workshopCard);
}
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
    { text: 'Abstract', href: 'https://drive.google.com/uc?export=download&id=1lN1e0CgsVIQinrAwoWZuRREQeIPN40Sg' },
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

  const gallery = document.createElement('div');
  gallery.className = 'dense-coding-gallery';
  [
    {
      src: 'pictures/6cluster%20bitphase%20flip%20ckt.png',
      alt: 'Six-qubit circuit diagram for a bit-phase flip quantum communication protocol',
    },
    {
      src: 'pictures/orthogonality%20graph%2064.png',
      alt: '64-node orthogonality graph with densely connected vertices',
    },
  ].forEach((imageDetails) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    figure.className = 'dense-coding-figure';
    image.src = imageDetails.src;
    image.alt = imageDetails.alt;
    figure.append(image);
    gallery.append(figure);
  });
  denseCodingProject.append(gallery);
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