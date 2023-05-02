'use strict';

// Selectiong elements
const btnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector('.nav');
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); //btnsOpenModal is a node list so they allow to use for each method

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// Smooth scrolling (button)
btnScroolTo.addEventListener('click', function (event) {
  const section1Coordinates = section1.getBoundingClientRect();
  console.log(section1Coordinates);
  // Older way, works everytime
    // window.scrollTo({
    //   left: section1Coordinates.left + window.pageXOffset, // Page X offset adds current scroll position to a relative position on x of section 1
    //   top: section1Coordinates.top + window.pageYOffset, // Page Y offset adds current scroll position to a relative position on y of section 1
    //   behavior: 'smooth', //
    // });
  //  Modern way, works in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});
// Smooth scrolling (nav bar)
document.querySelector('.nav__links').addEventListener('click', function (event) { //Adds listener to whole nav bar
  event.preventDefault() //preventing from not smooth scrolling build in html - href => #section
  if (event.target.classList.contains('nav__link')) { //Runs the listener only if clicked on one of the nav buttons, ref# bubbling, event delegation
    const navId = event.target.getAttribute('href');
    document.querySelector(navId).scrollIntoView({ behavior: 'smooth' });
  };
});
// Selection tabs content
tabsContainer.addEventListener('click', function (event) {
  const tabClicked = event.target.closest('.operations__tab'); //Must use closest in this case because if clicked on the number in button - the span element is selected
  if (!tabClicked) return //# ref : Guard clause - if click anywhere but button exit function
  // Remove classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(cont => cont.classList.remove('operations__content--active'));
  // Adds classes
  tabClicked.classList.add('operations__tab--active'); //Moves active tab upwards a little bit
  document
    .querySelector(`.operations__content--${tabClicked.dataset.tab}`)
    .classList.add('operations__content--active');//Dataset selects a value after data-tab
});
// Fading nav bar on hover
const fadingListenerFunction = function (event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const otherLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    otherLinks.forEach((el) => {
      if (el != link) el.style.opacity = this; //
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', fadingListenerFunction.bind(0.5)); //Event listener needs as 2nd argument a function - bind method returns a function, must use this as "argument"
nav.addEventListener('mouseout', fadingListenerFunction.bind(1));

// Sticky nav bar
window.addEventListener('scroll', function () {
  if(window.scrollY > 0) nav.classList.add('sticky') //Old way - not efficient, loosing performance
})

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //start observin at 0 viewport
  threshold: 0.15, //runs when 15% of element is visible - entry the viewport
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px', //In real life it should be +200px to load the image before it is scrolled on to. This way - just to see lazy loading
});

imgTargets.forEach(img => imgObserver.observe(img));