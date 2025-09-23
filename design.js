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
            toggleBtn.classList.toggle('active');
          });
        }

        // Mobile top-level accordion toggle
const topLinks = navbarContainer.querySelectorAll(".menu-item > a");
topLinks.forEach(link => {
  const parent = link.parentElement;
  const dropdown = parent.querySelector(".dropdown");

  if (dropdown) {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        // If already active, close it
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        } else {
          // Close all other top-level dropdowns
          topLinks.forEach(otherLink => {
            const otherParent = otherLink.parentElement;
            otherParent.classList.remove("active");
          });
          // Open this one
          parent.classList.add("active");
        }
      }
    });
  }
});

// Nested submenu toggle (accordion behavior inside dropdown)
const submenuParents = navbarContainer.querySelectorAll(".has-submenu > a");
submenuParents.forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      const parent = link.parentElement;
      // Toggle submenu open/close
      if (parent.classList.contains("active")) {
        parent.classList.remove("active");
      } else {
        parent.classList.add("active");
      }
    }
  });
});
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
  document.querySelectorAll('.gallery-title, .img-gallery').forEach(el => el.classList.add('show'));
  const fullImgBox = document.getElementById("fullImgBox");
  const fullImg = document.getElementById("fullImg");
  let currentIndex = 0;
  const images = [];
  const thumbnails = document.querySelectorAll('.img-gallery img');

  thumbnails.forEach((img, i) => {
    images.push(img.src);
    img.addEventListener('click', () => openFullImg(i));
  });

  function openFullImg(i) {
    currentIndex = i;
    fullImg.src = images[currentIndex];
    fullImgBox.style.display = 'flex';
  }
  function closeFullImg() { fullImgBox.style.display = 'none'; }
  function nextImage() { if (currentIndex < images.length - 1) currentIndex++, fullImg.src = images[currentIndex]; else closeFullImg(); }
  function prevImage() { if (currentIndex > 0) currentIndex--, fullImg.src = images[currentIndex]; else closeFullImg(); }
});

