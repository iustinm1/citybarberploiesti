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

const reviewForm = document.getElementById('reviewForm');
const reviewSuccess = document.getElementById('reviewSuccess');

reviewForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!reviewSuccess) return;
  reviewSuccess.style.display = 'block';
  reviewForm.reset();
  setTimeout(() => {
    reviewSuccess.style.display = 'none';
  }, 4000);
});
