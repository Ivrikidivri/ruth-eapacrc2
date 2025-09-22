document.addEventListener("DOMContentLoaded", () => {

  // === Load Navbar dynamically ===
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then(res => res.text())
      .then(data => {
        navbarContainer.innerHTML = data;

        // === Hamburger toggle ===
        const toggleBtn = navbarContainer.querySelector('.menu-toggle');
        const navMenu = navbarContainer.querySelector('.main-menu');
        if (toggleBtn && navMenu) {
          toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            toggleBtn.classList.toggle('active');
          });
        }

        // === Dropdown handling (mobile accordion style) ===

        // Top-level dropdowns
        const menuItems = navbarContainer.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
          const link = item.querySelector('a');

          link.addEventListener('click', e => {
            if (window.innerWidth <= 768) {
              const hasDropdown = item.querySelector('.dropdown');
              if (!hasDropdown) return; // skip if no dropdown

              e.preventDefault();

              // Close other top-level dropdowns
              menuItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
              });

              // Toggle current dropdown
              item.classList.toggle('active');
            }
          });
        });

        // Nested submenus
        const subMenuItems = navbarContainer.querySelectorAll('.has-submenu');
        subMenuItems.forEach(subItem => {
          const link = subItem.querySelector('a');

          link.addEventListener('click', e => {
            if (window.innerWidth <= 768) {
              const hasSubmenu = subItem.querySelector('.submenu');
              if (!hasSubmenu) return;

              e.preventDefault();

              // Close sibling submenus
              const siblings = subItem.parentElement.querySelectorAll('.has-submenu');
              siblings.forEach(sib => {
                if (sib !== subItem) sib.classList.remove('active');
              });

              // Toggle current submenu
              subItem.classList.toggle('active');
            }
          });
        });

        // Close all when clicking outside
        document.addEventListener('click', e => {
          if (!e.target.closest('.main-menu')) {
            menuItems.forEach(i => i.classList.remove('active'));
            subMenuItems.forEach(s => s.classList.remove('active'));
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
    function resetAuto() {
      clearInterval(auto);
      auto = setInterval(() => showSlide(index + 1), 4000);
    }
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

  function nextImage() {
    if (currentIndex < images.length - 1) currentIndex++, fullImg.src = images[currentIndex];
    else closeFullImg();
  }
  function prevImage() {
    if (currentIndex > 0) currentIndex--, fullImg.src = images[currentIndex];
    else closeFullImg();
  }

});
