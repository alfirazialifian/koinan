document.querySelectorAll('.sticky-dot button').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with ID ${targetId} not found.`);
    }
  });
});

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