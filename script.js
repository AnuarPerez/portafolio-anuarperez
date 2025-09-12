// ---- Scroll Reveal ----
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.2 });

reveals.forEach(reveal => observer.observe(reveal));

// ---- Modales ----
const appLink = document.getElementById('openAppModal');
const appModal = document.getElementById('appModal');
const pcModal = document.getElementById('pcModal');
const mobileModal = document.getElementById('mobileModal');

const closeBtns = document.querySelectorAll('.close');
const backBtns = document.querySelectorAll('.back-btn');

appLink.onclick = () => { appModal.style.display = 'flex'; };

document.getElementById('fromPC').onclick = () => {
  appModal.style.display = 'none';
  pcModal.style.display = 'flex';
};
document.getElementById('fromMobile').onclick = () => {
  appModal.style.display = 'none';
  mobileModal.style.display = 'flex';
};

// ---- Cerrar modales ----
closeBtns.forEach(btn => {
  btn.onclick = () => {
    appModal.style.display = 'none';
    pcModal.style.display = 'none';
    mobileModal.style.display = 'none';
  };
});

// ---- Botón volver ----
backBtns.forEach(btn => {
  btn.onclick = () => {
    pcModal.style.display = 'none';
    mobileModal.style.display = 'none';
    appModal.style.display = 'flex';
  };
});

// ---- Galería ----
function setupGallery(modalId, images) {
  const modal = document.getElementById(modalId);
  const imgEl = modal.querySelector('.modal-img');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  let index = 0;

  function showImage() {
    imgEl.src = images[index];
  }

  prevBtn.onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showImage();
  };

  nextBtn.onclick = () => {
    index = (index + 1) % images.length;
    showImage();
  };

  showImage();
}

// Galerías (cambia por tus imágenes reales en /imagenes/)
setupGallery('pcModal', [
  'imagenes/pc-1.jpg',
  'imagenes/pc-1.2.jpg',
  'imagenes/pc-1.3.jpg'
]);

setupGallery('mobileModal', [
  'imagenes/movil-1.jpg',
  'imagenes/movil-1.1.jpg',
  'imagenes/movil-1.2.jpg',
  'imagenes/movil-1.3.jpg'
]);

// ---- Cerrar al hacer clic fuera ----
window.onclick = (e) => {
  if (e.target === appModal || e.target === pcModal || e.target === mobileModal) {
    appModal.style.display = 'none';
    pcModal.style.display = 'none';
    mobileModal.style.display = 'none';
  }
};



