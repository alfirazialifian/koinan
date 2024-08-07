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

const scrollBtn = document.querySelector('.wrapper-scroll');
scrollBtn.addEventListener('click', () => {
  const targetElement = document.getElementById('footer');
  if (targetElement) {
    targetElement.scrollIntoView({behavior: 'smooth'})
  }
})

const selectElement = document.getElementById('select-input');
selectElement.addEventListener('change', function() {
  if (this.value !== "Pilih subject pesan") {
    this.classList.remove('placeholder-select');
  } else {
    this.classList.add('placeholder-select');
  }
});

// observer for tracking which container in viewport
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

// Drawer
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
