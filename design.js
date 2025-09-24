document.addEventListener("DOMContentLoaded", () => {

  // === Load Navbar dynamically ===
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then(res => res.text())
      .then(data => {
        navbarContainer.innerHTML = data;

      // Hamburger toggle
const toggleBtn = navbarContainer.querySelector('.menu-toggle');
const navMenu = navbarContainer.querySelector('.main-menu');
if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    toggleBtn.classList.toggle('active'); // 🔥 add this line
  });
}

        // Mobile accordion submenus
        const submenuParents = navbarContainer.querySelectorAll(".has-submenu > a");
        submenuParents.forEach(link => {
          link.addEventListener("click", e => {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              link.parentElement.classList.toggle("active");
            }
          });
        });

        // Top-level dropdowns (mobile)
        const topLinks = navbarContainer.querySelectorAll(".menu-item > a");
        topLinks.forEach(link => {
          const parent = link.parentElement;
          const dropdown = parent.querySelector(".dropdown");
          if (dropdown) {
            link.addEventListener("click", e => {
              if (window.innerWidth <= 768) {
                e.preventDefault();
                parent.classList.toggle("active");
              }
            });
          }
        });
      })
      .catch(err => console.error("Navbar load error:", err));
  }

  // === Load Footer dynamically ===
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(data => footerContainer.innerHTML = data)
      .catch(err => console.error("Footer load error:", err));
  }


});


  // === Index Slider ===
  const slides = document.querySelector('.slides');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (slides && prevBtn && nextBtn) {
    let index = 0;
    const totalSlides = slides.children.length;

    function showSlide(i) {
      index = (i + totalSlides) % totalSlides;
      slides.style.marginLeft = (-100 * index) + '%';
    }

    prevBtn.addEventListener('click', () => { showSlide(index - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { showSlide(index + 1); resetAuto(); });

    let auto = setInterval(() => showSlide(index + 1), 4000);
    function resetAuto() { clearInterval(auto); auto = setInterval(() => showSlide(index + 1), 4000); }
  }

  // === Gallery Slider / Lightbox ===
const galleryImages = document.querySelectorAll('.img-gallery img');
    const fullImgBox = document.getElementById('fullImgBox');
    const fullImg = document.getElementById('fullImg');
    let currentIndex = 0;

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        fullImg.src = img.src;
        fullImgBox.style.display = 'grid'; // grid ensures centering
      });
    });

    function closeFullImg() { fullImgBox.style.display = 'none'; }

    function prevImage() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      fullImg.src = galleryImages[currentIndex].src;
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      fullImg.src = galleryImages[currentIndex].src;
    }

    // Close lightbox on click outside image
    fullImgBox.addEventListener('click', e => {
      if (e.target === fullImgBox) closeFullImg();
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if(fullImgBox.style.display !== 'none'){
        if(e.key === 'ArrowLeft') prevImage();
        if(e.key === 'ArrowRight') nextImage();
        if(e.key === 'Escape') closeFullImg();
      }
    });

    function nextImage() {
  currentIndex++;
  if (currentIndex >= galleryImages.length) {
    // Reached past the last image → close lightbox
    closeFullImg();
    currentIndex = 0; // reset for next time
  } else {
    fullImg.src = galleryImages[currentIndex].src;
  }
}
