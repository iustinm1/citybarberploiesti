const galleryItems = document.querySelectorAll('.gallery__item');
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalCloseTargets = modal?.querySelectorAll('[data-close]');

const openModal = (src, caption) => {
  if (!modal || !modalImage || !modalCaption) return;
  modalImage.src = src;
  modalImage.alt = caption || 'Imagine din galerie';
  modalCaption.textContent = caption || '';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const src = item.getAttribute('data-full');
    const caption = item.getAttribute('data-caption');
    if (src) {
      openModal(src, caption || '');
    }
  });
});

modalCloseTargets?.forEach((target) => {
  target.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

const setupReviewsCarousel = () => {
  const carousel = document.querySelector('.reviews-carousel');
  const track = document.querySelector('.reviews-track');

  if (!carousel || !track) return;

  if (!track.dataset.original) {
    track.dataset.original = track.innerHTML;
  }

  track.innerHTML = track.dataset.original;

  const baseCards = Array.from(track.children);
  if (!baseCards.length) return;

  const trackStyles = window.getComputedStyle(track);
  const gapValue = parseFloat(trackStyles.gap || '0');
  const carouselWidth = carousel.getBoundingClientRect().width;

  const getCardsWidth = (cards) => {
    const cardsWidth = cards.reduce((sum, card) => sum + card.getBoundingClientRect().width, 0);
    return cardsWidth + gapValue * Math.max(cards.length - 1, 0);
  };

  let loopCards = [...baseCards];
  let loopWidth = getCardsWidth(loopCards);

  while (loopWidth < carouselWidth * 1.25) {
    baseCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
      loopCards.push(clone);
    });

    loopWidth = getCardsWidth(loopCards);
  }

  loopCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.style.setProperty('--scroll-distance', `${loopWidth}px`);
  const speed = 45;
  const duration = Math.max(loopWidth / speed, 16);
  track.style.setProperty('--scroll-duration', `${duration}s`);
};

const refreshReviewsCarousel = () => {
  window.requestAnimationFrame(setupReviewsCarousel);
};

refreshReviewsCarousel();

let reviewsResizeTimer;
window.addEventListener('resize', () => {
  window.clearTimeout(reviewsResizeTimer);
  reviewsResizeTimer = window.setTimeout(refreshReviewsCarousel, 200);
});

