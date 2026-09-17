// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Gallery lightbox — lets visitors step through a photo grid's images at
// full size instead of only opening one image at a time in a new tab.
document.addEventListener('DOMContentLoaded', function () {
  var groups = document.querySelectorAll('.photo-grid');
  if (!groups.length) return;

  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Stäng">&times;</button>' +
    '<button type="button" class="lightbox-prev" aria-label="Föregående bild">&#8249;</button>' +
    '<button type="button" class="lightbox-next" aria-label="Nästa bild">&#8250;</button>' +
    '<span class="lightbox-counter"></span>' +
    '<div class="lightbox-figure">' +
      '<img class="lightbox-img" src="" alt="">' +
    '</div>';
  document.body.appendChild(lightbox);

  var imgEl = lightbox.querySelector('.lightbox-img');
  var counterEl = lightbox.querySelector('.lightbox-counter');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');

  var currentImages = [];
  var currentIndex = 0;

  function show(index) {
    if (!currentImages.length) return;
    currentIndex = (index + currentImages.length) % currentImages.length;
    var item = currentImages[currentIndex];
    imgEl.src = item.href;
    imgEl.alt = item.alt || '';
    counterEl.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
  }

  function openLightbox(images, index) {
    currentImages = images;
    show(index);
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-locked');
    imgEl.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', function () { show(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { show(currentIndex + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  var touchStartX = null;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? show(currentIndex + 1) : show(currentIndex - 1); }
    touchStartX = null;
  }, { passive: true });

  groups.forEach(function (group) {
    var tiles = Array.prototype.slice.call(group.querySelectorAll('a.gallery-tile'));
    if (!tiles.length) return;
    var images = tiles.map(function (tile) {
      var img = tile.querySelector('img');
      return { href: tile.getAttribute('href'), alt: img ? img.getAttribute('alt') : '' };
    });
    tiles.forEach(function (tile, i) {
      tile.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(images, i);
      });
    });
  });
});
