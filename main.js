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

/* auto scroll to form email */
const scrollButton = document.getElementById("scroll-to-form");
const targetElement = document.getElementById("form-submit-email");
scrollButton.addEventListener("click", function(event) {
  event.preventDefault(); // Prevents the default link behavior
  targetElement.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the target element
});
/* auto scroll to form email */

/* auto copy to clipboard onclick*/
function handleClick(event) {
  const element = event.target;  
  element.classList.add('copied');
  
  // Remove the class and revert the text after the animation ends
  setTimeout(() => {
    element.classList.remove('copied');
  }, 400); // Match the duration of the animation
}

document.getElementById('email-koinan').addEventListener('click', function() {
  handleClick(event, 'support@koinan.com');
  navigator.clipboard.writeText(this.textContent)
});

document.getElementById('phone-number-koinan').addEventListener('click', function() {
  handleClick(event, '+628123456789');
  navigator.clipboard.writeText(this.textContent)
});
/* auto copy to clipboard onclick*/

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

const paginationContent = [
  {
    title: 'Patung Pancoran Jakarta',
    text: 'Nunc quam neque tortor turpis ac eget dui elementum diam. Egestas etiam sed scelerisque eu sapien turpis viverra pretium. Odio ipsum leo eget sed. 1',
  },
  {
    title: 'Patung Pancoran JakartaTitle 2',
    text: 'Nunc quam neque tortor turpis ac eget dui elementum diam. Egestas etiam sed scelerisque eu sapien turpis viverra pretium. Odio ipsum leo eget sed. 2',
  },
  {
    title: 'Patung Pancoran Jakarta Title 3',
    text: 'Nunc quam neque tortor turpis ac eget dui elementum diam. Egestas etiam sed scelerisque eu sapien turpis viverra pretium. Odio ipsum leo eget sed. 3',
  },
  {
    title: 'Patung Pancoran Jakarta Title 4',
    text: 'Nunc quam neque tortor turpis ac eget dui elementum diam. Egestas etiam sed scelerisque eu sapien turpis viverra pretium. Odio ipsum leo eget sed. 4',
  },
  {
    title: 'Patung Pancoran Jakarta Title 5',
    text: 'Nunc quam neque tortor turpis ac eget dui elementum diam. Egestas etiam sed scelerisque eu sapien turpis viverra pretium. Odio ipsum leo eget sed. 5',
  },
  {
    title: 'Patung Pancoran Jakarta Title 6',
    text: 'Nunc quam neque tortor turpis ac eget dui elementum diam. Egestas etiam sed scelerisque eu sapien turpis viverra pretium. Odio ipsum leo eget sed. 6',
  }
];

let currentIndex = 0;
const buttons = Array.from(document.querySelectorAll('#image-dot button'));
const containerButtonPagination = document.getElementById('hero-section-3-location');
const titlePaginationContent = document.getElementById('title-pagination');
const textPaginationContent = document.getElementById('text-pagination');

let autoSlideInterval;

// Function to transition to a specific image
function transitionImage(index) {
  // Ensure index wraps around within the allowed range
  if (index > 5) index = 0;

  containerButtonPagination.classList.add('fade-out');
  containerButtonPagination.style.backgroundImage = bgImages[index];
  containerButtonPagination.classList.add('sliding');

  titlePaginationContent.textContent = paginationContent[index].title;
  textPaginationContent.textContent = paginationContent[index].text;

  buttons[currentIndex].classList.remove('active-image-btn');
  currentIndex = index;  
  
  buttons[currentIndex].classList.add('active-image-btn');

  containerButtonPagination.addEventListener('animationend', () => {
    containerButtonPagination.classList.remove('sliding');
    containerButtonPagination.classList.remove('fade-out');
  }, { once: true });
}

// Function to reset the auto-slide interval
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % bgImages.length;
    transitionImage(nextIndex);
  }, 3000);
}

// Handle button clicks
buttons.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    transitionImage(index);
    resetAutoSlide(); // Reset interval on button click
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
    let newIndex = (currentIndex + direction + bgImages.length) % bgImages.length;
    
    // Ensure newIndex is within the range of 0 to 5
    transitionImage(newIndex);
    resetAutoSlide(); // Reset interval on drag
  }
});

containerButtonPagination.addEventListener('touchend', () => {
  isDragging = false;
});

// Start the automatic sliding
resetAutoSlide();
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
  const alertModal = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const alertTitle = document.getElementById('alert-title');
  const closeAlertButton = document.getElementById('close-alert');
  const btnSubmit = document.getElementById('btn-submit');
  const imageError = document.getElementById('success-image');
  const imageSuccess = document.getElementById('error-image');

  function submitSuccessfully() {
    btnSubmit.textContent = 'Terkirim';
    btnSubmit.style.color = 'white';
    btnSubmit.style.backgroundColor = 'gray'
    btnSubmit.style.cursor = 'not-allowed'
    btnSubmit.disabled = true;

    setTimeout(() => {
      btnSubmit.style.cursor = 'pointer'
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Kirim';
      btnSubmit.style.backgroundColor = 'rgba(16, 45, 50, 1)'
    }, 5000)
  }

  function showAlert(title, message, type) {
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertModal.classList.remove('hidden');

    console.log('ini type', type);
    
    if (type === 'success') {
      imageSuccess.classList.add('show-image-alert')
      imageError.classList.add('hide-image-alert')
      closeAlertButton.style.backgroundColor = 'rgba(9, 83, 48, 0.8)';
      closeAlertButton.textContent = 'OK';
      alertTitle.style.color = 'rgba(9, 83, 48, 0.8)';
    } else {
      imageError.classList.add('show-image-alert')
      imageSuccess.classList.add('hide-image-alert')
    }
  }

  // Function to hide custom alert
  function hideAlert() {
      alertModal.classList.add('hidden');
  }
  closeAlertButton.addEventListener('click', hideAlert);

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract form data
    const name = form.querySelector('#input-nama').value;
    const organization = form.querySelector('#input-instansi').value;
    const subject = form.querySelector('#select-subject').value;  
    const email = form.querySelector('#input-email').value;

    fetch('https://koinan-api-production-1a21.up.railway.app/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        instance: organization,
        subject,
        message: textarea.value,
      }),
    })
      .then(() => {
        submitSuccessfully();
        showAlert('Submit Success', 'Pesan anda telah terkirim dengan sukses', 'success')
      })
      .catch(() => { showAlert('Submit gagal', 'Submit gagal, coba lagi beberapa saat ..', 'error')});
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

