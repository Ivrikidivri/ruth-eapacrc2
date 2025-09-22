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

const allDropdownItems = document.querySelectorAll('.menu-item');

allDropdownItems.forEach(item => {
  const link = item.querySelector('a');

  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      const dropdown = item.querySelector('.dropdown, .submenu');
      if (!dropdown) return; // No dropdown, normal link

      e.preventDefault();

      // Close all other dropdowns (including nested)
      allDropdownItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });

      // Toggle clicked dropdown
      item.classList.toggle('active');
    }
  });
});

// Close all menus if clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.main-menu')) {
    allDropdownItems.forEach(i => i.classList.remove('active'));
  }
});
