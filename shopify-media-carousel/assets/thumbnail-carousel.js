// filepath: /shopify-media-carousel/shopify-media-carousel/assets/thumbnail-carousel.js

document.addEventListener('DOMContentLoaded', function() {
  const thumbnailCarousel = document.getElementById('GalleryThumbnails-{{ section.id }}');
  const thumbnails = thumbnailCarousel.querySelectorAll('.thumbnail-list__item');
  const mainMediaViewer = document.getElementById('GalleryViewer-{{ section.id }}');

  let currentIndex = 0;

  function updateMainMedia(index) {
    const selectedThumbnail = thumbnails[index];
    const mediaId = selectedThumbnail.getAttribute('data-target');
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    
    // Add active class to the selected thumbnail
    selectedThumbnail.classList.add('active');

    // Update the main media display based on the selected thumbnail
    const mediaToShow = mainMediaViewer.querySelector(`#${mediaId}`);
    const activeMedia = mainMediaViewer.querySelector('.is-active');

    if (activeMedia) {
      activeMedia.classList.remove('is-active');
    }
    
    if (mediaToShow) {
      mediaToShow.classList.add('is-active');
    }
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      currentIndex = index;
      updateMainMedia(currentIndex);
    });
  });

  const prevButton = thumbnailCarousel.querySelector('.slider-button--prev');
  const nextButton = thumbnailCarousel.querySelector('.slider-button--next');

  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
    updateMainMedia(currentIndex);
  });

  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
    updateMainMedia(currentIndex);
  });
});