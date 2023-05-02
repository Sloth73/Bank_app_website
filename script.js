'use strict';

// Selectiong elements
const btnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
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
// Smooth scrolling
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
document.querySelector('.nav__links').addEventListener('click', function (event) {
  event.preventDefault() //preventing from not smooth scrolling build in html - href => #section
  if (event.target.classList.contains('nav__link')) {
    const navId = event.target.getAttribute('href');
    document.querySelector(navId).scrollIntoView({ behavior: 'smooth' });
  };
});