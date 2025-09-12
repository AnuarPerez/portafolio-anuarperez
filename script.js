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

// ---- Galería con verificación de extensión ----
async function checkImageExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

async function getValidImagePath(basePath) {
  const extensions = ['.png', '.jpg', '.jpeg'];
  for (let ext of extensions) {
    const fullPath = basePath + ext;
    if (await checkImageExists(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

function setupGallery(modalId, imageNames, folder = 'imagenes/') {
  const modal = document.getElementById(modalId);
  const imgEl = modal.querySelector('.modal-img');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  let index = 0;
  let validPaths = [];

  async function loadImages() {
    for (let name of imageNames) {
      const path = await getValidImagePath(folder + name);
      if (path) validPaths.push(path);
    }
    showImage();
  }

  function showImage() {
    if (validPaths.length > 0) {
      imgEl.src = validPaths[index];
    }
  }

  prevBtn.onclick = () => {
    index = (index - 1 + validPaths.length) % validPaths.length;
    showImage();
  };

  nextBtn.onclick = () => {
    index = (index + 1) % validPaths.length;
    showImage();
  };

  loadImages();
}

// Galerías (usa solo el nombre base, sin extensión)
setupGallery('pcModal', ['pc-1', 'pc-1.2', 'pc-1.3', 'pc4']);
setupGallery('mobileModal', ['movil-1', 'movil-1.1', 'movil-1.2', 'movil-1.3']);

// ---- Cerrar al hacer clic fuera ----
window.onclick = (e) => {
  if (e.target === appModal || e.target === pcModal || e.target === mobileModal) {
    appModal.style.display = 'none';
    pcModal.style.display = 'none';
    mobileModal.style.display = 'none';
  }
};
