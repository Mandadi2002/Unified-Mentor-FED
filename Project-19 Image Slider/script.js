let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.style.display = 'none';
  });

  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  slides[currentSlide].style.display = 'block';
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

// Initial display
showSlide(currentSlide);
