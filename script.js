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

// ---- Lightbox ----
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.onclick = () => {
    lightbox.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  };
}
