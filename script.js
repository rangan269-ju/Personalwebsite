const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const pageViews = {
  home: ['.hero', '.marquee', '.news'],
  education: ['#education'],
  experience: ['.work'],
  gallery: ['#gallery'],
  qualification: ['#qualification'],
  publication: ['#publication'],
  contact: ['.contact'],
};
const requestedPage = new URLSearchParams(window.location.search).get('page') || 'home';
const requestedInternship = new URLSearchParams(window.location.search).get('internship');
const currentPage = Object.prototype.hasOwnProperty.call(pageViews, requestedPage) ? requestedPage : 'home';
const visibleViews = pageViews[currentPage];
const profileViews = ['#education', '.work', '#qualification', '#publication'];

document.querySelector('.hero').hidden = !visibleViews.includes('.hero');
document.querySelector('.marquee').hidden = !visibleViews.includes('.marquee');
document.querySelector('.news').hidden = !visibleViews.includes('.news');
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
      { image: 'pictures/IMG-20260119-WA0026.jpeg', caption: 'After an exciting Project-viva session', alt: 'Students after an exciting project viva session' },
      { image: 'pictures/IMG_7204.JPG', caption: 'After a successful poster presentation', alt: 'After a successful poster presentation', fullImage: true },
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
  firstInternship.querySelectorAll('p').forEach((paragraph) => {
    if (paragraph.textContent.trim() === 'Bose Institute, Kolkata') {
      paragraph.remove();
    } else if (paragraph.textContent.startsWith('Supervisor: ')) {
      paragraph.textContent = paragraph.textContent.replace('Supervisor:', 'Advisor:');
    }
  });
}
const projectGrid = document.querySelector('.work .project-entry-grid');
if (projectGrid) {
  const scholarlyHeading = document.createElement('h3');
  scholarlyHeading.className = 'scholarly-heading';
  scholarlyHeading.textContent = 'Scholarly work';
  projectGrid.after(scholarlyHeading);
  const institutionsNote = document.createElement('p');
  institutionsNote.className = 'internship-institutions-note';
  institutionsNote.textContent = 'The above works were carried out during my visit to the following institutions as part of various prestigious summer research programs.';
  const institutionLogos = document.createElement('div');
  institutionLogos.className = 'internship-institution-logos';
  [
    { src: 'pictures/IISERB_logo.png', alt: 'IISER Bhopal logo' },
    { src: 'pictures/bose%20inst.png', alt: 'Bose Institute logo' },
  ].forEach(({ src, alt }) => {
    const logo = document.createElement('img');
    logo.src = src;
    logo.alt = alt;
    institutionLogos.append(logo);
  });
  projectGrid.after(institutionsNote, institutionLogos);
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
const fellowshipParagraph = fellowshipLink?.parentElement;
if (fellowshipLink && fellowshipParagraph) {
  const fellowshipLabel = fellowshipParagraph.firstChild?.textContent.trim();
  fellowshipParagraph.textContent = '';
  fellowshipLink.textContent = '';
  const arrow = document.createElement('span');
  arrow.textContent = '↗';
  fellowshipLink.append(arrow, fellowshipLabel);
  fellowshipParagraph.append(fellowshipLink);

  const selectedFellowsLink = document.createElement('a');
  const selectedFellowsArrow = document.createElement('span');
  selectedFellowsLink.className = 'fellowship-link';
  selectedFellowsLink.href = 'https://webjapps.ias.ac.in/fellowship2025/lists/result.jsp';
  selectedFellowsLink.target = '_blank';
  selectedFellowsLink.rel = 'noopener noreferrer';
  selectedFellowsLink.textContent = '2025 selected fellows list';
  selectedFellowsArrow.textContent = '↗';
  selectedFellowsLink.prepend(selectedFellowsArrow);
  fellowshipParagraph.append(' ', selectedFellowsLink);
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
    { text: 'Advisor: Dr. Kuntal Roy' },
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

}

const internshipCards = [
  { id: 'bose', card: firstInternship },
  { id: 'iiserb', card: denseCodingProject },
];
internshipCards.forEach(({ id, card }) => {
  const heading = card?.querySelector('h3');
  if (!heading) return;

  const link = document.createElement('a');
  link.className = 'internship-title-link';
  link.href = `?page=experience&internship=${id}`;
  link.textContent = heading.textContent;
  heading.replaceChildren(link);
});

function appendInternshipReferences(detailPage, references) {
  const referencesHeading = document.createElement('h2');
  const referencesList = document.createElement('ol');
  referencesHeading.className = 'internship-references-heading';
  referencesHeading.textContent = 'References';
  referencesList.className = 'internship-references';
  references.forEach((reference) => {
    const item = document.createElement('li');
    let cursor = 0;
    for (const match of reference.matchAll(/https?:\/\/[^\s;]+/g)) {
      const rawUrl = match[0];
      const url = rawUrl.replace(/[.,]+$/, '');
      const urlIndex = match.index;
      const link = document.createElement('a');
      if (urlIndex > cursor) {
        item.append(document.createTextNode(reference.slice(cursor, urlIndex)));
      }
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = url;
      item.append(link, document.createTextNode(rawUrl.slice(url.length)));
      cursor = urlIndex + rawUrl.length;
    }
    item.append(document.createTextNode(reference.slice(cursor)));
    referencesList.append(item);
  });
  detailPage.append(referencesHeading, referencesList);
}

const selectedInternship = internshipCards.find(({ id }) => id === requestedInternship)?.card;
if (currentPage === 'experience' && selectedInternship && projectGrid) {
  const title = selectedInternship.querySelector('h3')?.textContent;
  const detailPage = document.createElement('div');
  const backLink = document.createElement('a');
  const detailTitle = document.createElement('h1');
  detailPage.className = 'internship-detail-page';
  backLink.className = 'internship-detail-back';
  backLink.href = '?page=experience';
  backLink.textContent = '← Back to Experiences';
  detailTitle.className = 'internship-detail-title';
  detailTitle.textContent = title;
  detailPage.append(backLink, detailTitle);
  if (selectedInternship === firstInternship) {
    const detailNote = document.createElement('div');
    detailNote.className = 'internship-detail-note';

    const fundamentalsParagraph = document.createElement('p');
    fundamentalsParagraph.textContent = 'The project primarily focuses on understanding, implementing, and testing some of the most important concepts and algorithms in quantum computing. The work consists of the basics of qubits, Hilbert spaces, and quantum gates, which form the foundation of quantum computation. With these building blocks, key algorithms such as the Deutsch, Deutsch–Jozsa (DJ), and Bernstein–Vazirani (BV) algorithms were studied in detail. These algorithms were chosen because they show how quantum systems can outperform classical ones by using superposition, entanglement, and parallelism.';

    const hardwareParagraph = document.createElement('p');
    const platformLink = document.createElement('a');
    platformLink.href = 'https://quantum.cloud.ibm.com/';
    platformLink.target = '_blank';
    platformLink.rel = 'noopener noreferrer';
    platformLink.textContent = 'IBM Quantum Platform';
    hardwareParagraph.append(
      document.createTextNode('The project goes beyond theory by using Qiskit to simulate quantum circuits and execute them on real IBM quantum computers, namely IBM-Brisbane (Qubits 127; QPU version-1.1.202; Processor type- Eagle r3; Basis gates- ecr, id, rz, sx, x; Median readout error 2.136E-2) and IBM-Torino (Qubits 133; QPU version 1.0.90; Processor type- Heron r1; Basis gates- cz, id, rx, rz, rzz, sx, x; Median readout error 3.223E-2). For more information, visit the '),
      platformLink,
      document.createTextNode('. Several gates, including the X, NOT, CNOT, and Hadamard gates were experimentally tested. Their outputs were verified against theoretical expectations, giving confidence in both the simulator and hardware. Experiments also explored entanglement and quantum parallelism, showing how qubits can be correlated and functions can be evaluated across many inputs at once.'),
    );

    const algorithmsParagraph = document.createElement('p');
    algorithmsParagraph.textContent = 'The algorithms were implemented using different oracle types (including both constant and balanced types). On simulators, results were ideal, while on real IBM Quantum devices, small deviations due to noise and various gate errors were observed. A stability study compared IBM-Brisbane and IBM-Torino QCs, showing both are reliable but with slight performance differences.';

    const faultStudyParagraph = document.createElement('p');
    faultStudyParagraph.textContent = 'A major part of the project examined faults in the Hadamard gate, focusing on coherent phase flip errors. Theoretical calculations and Bloch sphere representations were carried out, followed by experiments to detect faulty gates. Distinct patterns in output states served as clear indicators of such faults. A generalized faulty Hadamard gate with a tunable parameter θ was also studied, and fidelity calculations quantified how close faulty outputs were to the ideal case.';

    detailNote.append(fundamentalsParagraph, hardwareParagraph, algorithmsParagraph, faultStudyParagraph);
    detailPage.append(detailNote);
    const detailImages = [
      { src: 'pictures/heatmap%20faulty.png', alt: 'Heatmap of faulty quantum gate results' },
      { src: 'pictures/ibmqcstabo4.png', alt: 'IBM Quantum Composer circuit and results' },
      { src: 'pictures/entanglement%20cityscape.png', alt: 'Entanglement cityscape visualization' },
      { src: 'pictures/DJ.png', alt: 'Deutsch–Jozsa algorithm circuit and results' },
    ];
    const imageGallery = document.createElement('div');
    imageGallery.className = 'internship-detail-images';
    detailImages.forEach(({ src, alt }) => {
      const image = document.createElement('img');
      image.src = src;
      image.alt = alt;
      imageGallery.append(image);
    });
    detailPage.append(imageGallery);
    appendInternshipReferences(detailPage, [
      'D. Deutsch and R. Jozsa, “Rapid solution of problems by quantum computation,” Proceedings of the Royal Society of London A, vol. 439, no. 1907, pp. 553–558, 1992.',
      'J. Preskill, “Lecture Notes for Physics 229: Quantum Computation and Information,” California Institute of Technology, 1998. Available at: http://theory.caltech.edu/~preskill/ph229/.',
      'Hiu Yung Wong, Introduction to Quantum Computing: From a Layperson to a Programmer in 30 Steps, Springer Nature, 2022. ISBN: 978-9811900546.',
      'M. A. Nielsen and I. L. Chuang, Quantum Computation and Quantum Information, Cambridge University Press, 2010.',
      'Peter Marttala, An Extension of the Deutsch-Jozsa Algorithm to Arbitrary Qudits, University of Saskatchewan Saskatoon, SK S7N 5E2 Canada, July 2007.',
      'Peter Shor, Deutsch-Jozsa Algorithm for 3 qubits. Available at: https://openlearninglibrary.mit.edu/courses/course-v1:MITx+8.370.2x+1T2018/courseware/Week2/lectures_U2_2_dj_qcirc/6?activate_block_id=block-v1%3AMITx%2B8.370.2x%2B1T2018%2Btype%40vertical%2Bblock%40Classical_algorithm_solving_Deutschs_problem.',
      'Poornima Aradyamath, Naghabhushana N M, Rohitha Ujjinimatad, “Quantum Computing Concepts with Deutsch Jozsa Algorithm,” International Journal on Informatics Visualization, vol. 3, no. 1, 2019. e-ISSN: 2549-9904; ISSN: 2549-9610.',
      'Gangopadhyay, S.; Manabputra; Behera, B. K.; Panigrahi, P. K., “Generalization and demonstration of an entanglement-based Deutsch-Jozsa-like algorithm using a 5-qubit quantum computer,” Quantum Information Processing, vol. 17, no. 7, p. 160.',
      'Qiskit Contributors, “Qiskit: An Open-source Framework for Quantum Computing.” Available at: https://qiskit.org/, 2025.',
      'IBM Quantum, “IBM Quantum Cloud Platform.” Available at: https://quantum.cloud.ibm.com/; https://research.ibm.com/quantum-computing, 2025.',
    ]);
  }
  if (selectedInternship === denseCodingProject) {
    const detailNote = document.createElement('p');
    detailNote.className = 'internship-detail-note';
    detailNote.textContent = 'Quantum communication protocols that rely on pre-shared entangled states can generally be divided into two broad categories according to their objectives - classical information transfer and quantum state transfer. Although quantum state transfer protocols have received significant attention, comparable efforts toward extending the practical applications of classical information transmission protocols using different multipartite entangled channels have received relatively limited attention in recent years. Most existing studies focus on proposing new entangled resources or evaluating protocol performance under ideal conditions, whereas comparatively fewer investigations address their practical implementation under realistic noisy environments. Furthermore, systematic comparisons among different entangled channels remain scarce. Therefore, in this work, a comprehensive comparative study of quantum dense coding protocols based on different entangled states is presented under both ideal and realistic noisy quantum environments. The protocols are first analyzed theoretically to evaluate various performance metrics. Their robustness is then investigated under realistic Pauli noise models. Finally, a systematic comparison is carried out to identify the strengths and limitations of different entangled channels using Qiskit. The results demonstrate that the analytical derivations are in exact agreement with the simulation results. Furthermore, different protocols exhibit varying levels of robustness under different Pauli noise models, while increasing circuit depth and gate complexity make the protocols more error-prone. Altogether, the presented results establish a comprehensive framework for assessing quantum dense coding protocols, thereby facilitating their practical implementation in future quantum communication networks.';
    detailPage.append(detailNote);
    const detailImages = [
      { src: 'pictures/QBER%20bitPHASE%20flip.png', alt: 'QBER for bit-phase flip noise' },
      { src: 'pictures/Phase%20flip%20noise%20all%20channel.png', alt: 'Phase-flip noise results for all channels' },
      { src: 'pictures/Bit%20flip%20noise%20all%20channel.png', alt: 'Bit-flip noise results for all channels' },
      { src: 'pictures/orthogonality%20graph%2064.png', alt: '64-node orthogonality graph', className: 'orthogonality-graph' },
    ];
    const imageGallery = document.createElement('div');
    imageGallery.className = 'internship-detail-images';
    detailImages.forEach(({ src, alt, className }) => {
      const image = document.createElement('img');
      image.src = src;
      image.alt = alt;
      if (className) image.className = className;
      imageGallery.append(image);
    });
    detailPage.append(imageGallery);

    const references = [
      'R. Horodecki, P. Horodecki, M. Horodecki, and K. Horodecki, “Quantum Entanglement,” Reviews of Modern Physics, vol. 81, pp. 865–942, 2009.',
      'S. Das, T. Chanda, M. Lewenstein, A. Sanpera, A. Sen(De), and U. Sen, “The separability versus entanglement problem,” arXiv preprint, 2017.',
      'B. C.H. and W. S.J., “Communication via One- and Two-Particle Operators on Einstein-Podolsky-Rosen States,” Phys. Rev. Lett., vol. 69, pp. 2881–2884, 1992.',
      'N. M.A. and C. I.L., “Quantum Computation and Quantum Information,” Cambridge University Press, Cambridge, UK, 2010.',
      'X. Tan, X. Li, and P. Yang, “Perfect quantum teleportation via bell states,” Computers, Materials & Continua, vol. 57, no. 3, pp. 495–503, 2018.',
      'S. Ghosh, G. Kar, A. Roy, D. Sarkar, and U. Sen, “Entanglement teleportation through ghz-class states,” New Journal of Physics, vol. 4, pp. 48.1–48.9, 2002.',
      'J. Joo, Y.-J. Park, S. Oh, and J. Kim, “Quantum teleportation via a w state,” New Journal of Physics, vol. 5, p. 136, 2003.',
      'A. Pandey, “Quantum teleportation using w-bell and bell-ghz channels,” International Journal of Engineering, Science and Mathematics, vol. 13, Aug. 2024.',
      'M. Anagha, A. Mohan, T. Muruganandan, B. K. Behera, and P. K. Panigrahi, “A new scheme of quantum teleportation using highly entangled brown et al. state: An ibm quantum experience,” Quantum Information Processing, vol. 19, p. 147, 2020.',
      'D. Singh, S. Kumar, and B. K. Behera, “Complexity analysis of quantum teleportation via different entangled channels in the presence of noise,” IET Quantum Communication, vol. 3, no. 4, pp. 166–176, 2022.',
      'M. Sisodia, A. Shukla, K. Thapliyal, and A. Pathak, “Design and experimental realization of an optimal scheme for teleportation of an n-qubit quantum state,” arXiv preprint, 2017.',
      'A. S. Cacciapuoti, M. Caleffi, R. V. Meter, and L. Hanzo, “When entanglement meets classical communications: Quantum teleportation for the quantum internet,” IEEE Transactions on Communications, vol. 68, no. 6, pp. 3808–3833, 2020.',
      'H.-J. Briegel, W. Dür, J. I. Cirac, and P. Zoller, “Quantum repeaters: The role of imperfect local operations in quantum communication,” Physical Review Letters, vol. 81, no. 26, pp. 5932–5935, 1998.',
      'K. M. et al., “Dense coding in experimental quantum communication,” Physical Review Letters, vol. 76, pp. 4656–4659, 1996.',
      'V. Sougato Bose and Knight, “Multiparticle generalization of quantum dense coding,” Physical Review A, vol. 57, pp. 822–829, 1998.',
      'J.-C. H. et al., “Controlled dense coding using a four-particle ghz state,” Physical Review A, vol. 63, p. 054301, 2001.',
      'S. Muralidharan and P. K. Panigrahi, “Perfect teleportation, quantum state sharing and superdense coding through a genuinely entangled five-qubit state,” Physical Review A, vol. 77, no. 3, p. 032321, 2008.',
      'D. Saha and P. K. Panigrahi, “N-qubit quantum teleportation, information splitting and superdense coding through the composite ghz-bell channel,” arXiv preprint, 2011.',
    ];
    appendInternshipReferences(detailPage, references);
  }
  projectGrid.closest('.work')?.replaceChildren(detailPage);
  document.title = `${title} | Experiences`;
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