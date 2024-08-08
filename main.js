/* Sticky button */
document.querySelectorAll('.sticky-dot button').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with ID ${targetId} not found.`);
    }
  });
});
/* Sticky button */

/* observer for tracking which container in viewport */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {    
    if (entry.isIntersecting) {
      document.querySelectorAll('.sticky-dot button').forEach(dot => {   
        const getAttrDataTarget = dot.getAttribute('data-target').split('#')[1];
        const getEntryId = entry.target.id;
        if (getAttrDataTarget === getEntryId) {          
          dot.classList.add('active-dot')
        } else {
          dot.classList.remove('active-dot')
        }
      });
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.observer').forEach(section => {
  observer.observe(section);
});

/* pagination background */
const bgImages = [
  'url(./assets/img-location.svg)',
  'url(./assets/hero-section-2-bottom-computer.svg)',
  'url(./assets/hero-section-2-bottom-smile.svg)',
  'url(./assets/hero-section-2-bottom-computer.svg)',
  'url(./assets/hero-section-2-bottom-smile.svg)',
  'url(./assets/hero-section-2-bottom-computer.svg)',
];

let currentIndex = 0;
const buttons = Array.from(document.querySelectorAll('#image-dot button'));
const containerButtonPagination = document.getElementById('hero-section-3-location');

function transitionImage(index) {
  containerButtonPagination.classList.add('fade-out');
  containerButtonPagination.style.backgroundImage = bgImages[index];
  containerButtonPagination.classList.add('sliding');

  buttons[currentIndex].classList.remove('active-image-btn');
  currentIndex = index;
  buttons[currentIndex].classList.add('active-image-btn');

  containerButtonPagination.addEventListener('animationend', () => {
    containerButtonPagination.classList.remove('sliding');
    containerButtonPagination.classList.remove('fade-out');
  }, { once: true });
}

// Handle button clicks
buttons.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    transitionImage(index);
  });
});

// Handle swipe gestures for touch devices
let startX = 0;
let isDragging = false;

containerButtonPagination.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

containerButtonPagination.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  
  const moveX = e.touches[0].clientX;
  const deltaX = startX - moveX;

  if (Math.abs(deltaX) > 50) { // Adjust sensitivity as needed
    isDragging = false;
    const direction = deltaX > 0 ? 1 : -1;
    const newIndex = (currentIndex + direction + buttons.length) % buttons.length;
    transitionImage(newIndex);
  }
});

containerButtonPagination.addEventListener('touchend', () => {
  isDragging = false;
});
/* pagination background */

/* button scroll bottom */
const scrollBtn = document.querySelector('.wrapper-scroll');
scrollBtn.addEventListener('click', () => {
  const targetElement = document.getElementById('footer-container');
  if (targetElement) {    
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
})
/* button scroll bottom */

/* select option */
const selectElement = document.getElementById('select-subject');
selectElement.addEventListener('change', function() {
  if (this.value !== "Pilih subject pesan") {
    this.classList.remove('placeholder-select');
  } else {
    this.classList.add('placeholder-select');
  }
});
/* select option */


/* Drawer */
const hamburgerButton = document.getElementById('hamburger-button');
const hamburgerButtonDrawer = document.getElementById('hamburger-button-drawer');

const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('close-btn');

hamburgerButton.addEventListener('click', () => {
  drawer.classList.toggle('open');
  hamburgerButtonDrawer.classList.toggle('open');
});

hamburgerButtonDrawer.addEventListener('click', () => {
  drawer.classList.remove('open');
  hamburgerButtonDrawer.classList.remove('open');
});

// Select the drawer body and close drawer
const drawerBody = document.querySelector('.drawer-body');
drawerBody.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    drawer.classList.remove('open');
    hamburgerButtonDrawer.classList.remove('open');
  }
});
/* Drawer */


/* Submit Form */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.wrapper-form-section-4');
  const textarea = form.querySelector('#textarea-pesan');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract form data
    const name = form.querySelector('#input-nama').value;
    const organization = form.querySelector('#input-instansi').value;
    const subject = form.querySelector('#select-subject').value;  
    console.log('Name:', name);
    console.log('Organization:', organization);
    console.log('Subject:', subject);
    console.log('Message:', textarea.value);

    /*
    fetch('YOUR_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        organization,
        subject,
        message: textarea.value,
      }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
    */
  });

  // Automatically submit the form when Enter key is pressed in the textarea
  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      // Create and dispatch a submit event to trigger the form's submit event listener
      const submitEvent = new Event('submit', { bubbles: true });
      form.dispatchEvent(submitEvent);
    }
  });
});
/* Submit Form */