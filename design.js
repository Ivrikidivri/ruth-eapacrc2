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

        // === Top-level dropdowns (accordion style on mobile) ===
        const topLinks = navbarContainer.querySelectorAll(".menu-item > a");
        topLinks.forEach(link => {
          const parent = link.parentElement;
          const dropdown = parent.querySelector(".dropdown");
          if (dropdown) {
            link.addEventListener("click", e => {
              if (window.innerWidth <= 768) {
                e.preventDefault();

                // 🔥 Close all other dropdowns
                navbarContainer.querySelectorAll(".menu-item").forEach(item => {
                  if (item !== parent) item.classList.remove("active");
                });

                 // Always open only the clicked one
                parent.classList.add("active");
              }
            });
          }
        });

        // === Nested submenus (accordion style on mobile) ===
        const submenuParents = navbarContainer.querySelectorAll(".has-submenu > a");
        submenuParents.forEach(link => {
          link.addEventListener("click", e => {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              const parent = link.parentElement;

              // 🔥 Close sibling submenus only
              parent.parentElement.querySelectorAll(".has-submenu").forEach(sib => {
                if (sib !== parent) sib.classList.remove("active");
              });

              // Toggle only this submenu
              parent.classList.toggle("active");
            }
          });
        });

        // === Close all when clicking outside ===
        document.addEventListener('click', e => {
          if (!e.target.closest('.main-menu')) {
            navbarContainer.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
          }
        });
      })
      .catch(err => console.error("Navbar load error:", err));
  }

  // === Footer ===
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

  function nextImage() {
    if (currentIndex < images.length - 1) currentIndex++, fullImg.src = images[currentIndex];
    else closeFullImg();
  }
  function prevImage() {
    if (currentIndex > 0) currentIndex--, fullImg.src = images[currentIndex];
    else closeFullImg();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const link = item.querySelector("a");

    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Close all other open dropdowns
      menuItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
        }
      });

      // Toggle the clicked one
      item.classList.toggle("active");
    });
  });
});








