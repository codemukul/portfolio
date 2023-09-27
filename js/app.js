/**
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionList = document.querySelectorAll('section');
const navbar = document.querySelector('.navbar__menu');
const navBar = document.getElementById("navbar__list");
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav using document-fragment to reduce reflow and repaint
const navitems = document.createDocumentFragment();
for(section of sectionList) {
    const listitem = document.createElement('li');

    listitem.innerHTML = `<a href="#${section.id}" class="menu__link" data-nav="${section.id}">${section.dataset.nav}</a>`;

    navitems.appendChild(listitem);
}

// Add class 'active' to section when near top of viewport
function activeSection() {
    for(section of sectionList) {
      let anch = navBar.querySelector(`[data-nav=${section.id}]`);
      
      if( section.getBoundingClientRect().top <= 150 && section.getBoundingClientRect().top >= -450) {			
        section.classList.add("your-active-class");
        anch.classList.add("active-link");
      }
      else {
        section.classList.remove("your-active-class");
        anch.classList.remove("active-link");
      }
    }
}


// Scroll to anchor ID using scrollTO event
function Scroll(event) {
    event.preventDefault();
    const element = document.querySelector(`section${event.target.hash}`);
    scrollTo({
        top: element.offsetTop,
        left: 0,
        behavior: 'smooth'
    });
}

// Hiding ScrollBar when not scrolling
function hidenav() {
  navBar.style.display = "block"
  clearTimeout(isScrolling)
   isScrolling = setTimeout(() => {
    navBar.style.display = "none";
  }, 3000);
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.querySelector('#navbar__list').appendChild(navitems);

// Scroll to section on link click
navbar.addEventListener('click', Scroll);

// Set sections as active
window.addEventListener('scroll', activeSection);

// Hide the navbar after some time so that person can enjoy reading
document.addEventListener('scroll', hidenav);