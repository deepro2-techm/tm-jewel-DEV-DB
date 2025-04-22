/**
 * Product Thumbnail Carousel
 *
 * Handles the interaction between the main product gallery and thumbnail navigation
 */
class ProductThumbnailCarousel {
  constructor() {
    this.mediaGallery = document.querySelector("media-gallery");
    if (!this.mediaGallery) return;

    this.mainSlider = this.mediaGallery.querySelector(".product__media-list");
    this.thumbnailSlider = this.mediaGallery.querySelector(".thumbnail-list");
    this.thumbnailItems = this.mediaGallery.querySelectorAll(
      ".thumbnail-list__item"
    );
    this.prevButton = this.mediaGallery.querySelector(
      ".thumbnail-slider .slider-button--prev"
    );
    this.nextButton = this.mediaGallery.querySelector(
      ".thumbnail-slider .slider-button--next"
    );

    this.init();
  }

  init() {
    if (!this.thumbnailSlider || this.thumbnailItems.length <= 1) return;

    // Initialize state
    this.currentSlideIndex = 0;
    this.thumbnailsPerView = this.getThumbnailsPerView();

    // Add event listeners
    this.addEventListeners();

    // Initial scroll check
    this.updateArrowVisibility();

    // Set active thumbnail
    this.setActiveThumbnail(this.currentSlideIndex);

    // Resize handling
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  addEventListeners() {
    // Thumbnail click events
    this.thumbnailItems.forEach((thumbnail, index) => {
      thumbnail.querySelector("button").addEventListener("click", () => {
        this.setActiveThumbnail(index);
        this.currentSlideIndex = index;
      });
    });

    // Arrow button events
    if (this.prevButton) {
      this.prevButton.addEventListener("click", this.slidePrev.bind(this));
    }

    if (this.nextButton) {
      this.nextButton.addEventListener("click", this.slideNext.bind(this));
    }

    // Main slider change events
    if (this.mainSlider) {
      this.mainSlider.addEventListener("slideChange", (event) => {
        const newIndex = Array.from(this.thumbnailItems).findIndex(
          (item) => item.dataset.target === event.detail.mediaId
        );
        if (newIndex >= 0) {
          this.setActiveThumbnail(newIndex);
          this.currentSlideIndex = newIndex;
        }
      });
    }
  }

  getThumbnailsPerView() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 480) return 2;
    if (viewportWidth < 750) return 3;
    return 4;
  }

  setActiveThumbnail(index) {
    // Remove active state from all thumbnails
    this.thumbnailItems.forEach((item) => {
      const button = item.querySelector("button");
      if (button) button.setAttribute("aria-current", "false");
    });

    // Set active state for current thumbnail
    const activeThumb = this.thumbnailItems[index];
    if (activeThumb) {
      const button = activeThumb.querySelector("button");
      if (button) button.setAttribute("aria-current", "true");

      // Scroll thumbnail into view
      this.scrollToThumbnail(index);
    }

    // Update main slider if needed
    if (activeThumb && this.mainSlider) {
      const targetId = activeThumb.dataset.target;
      const mainSlides = this.mainSlider.querySelectorAll(
        ".product__media-item"
      );

      mainSlides.forEach((slide) => {
        const isActive = slide.dataset.mediaId === targetId;
        slide.classList.toggle("is-active", isActive);
        if (isActive) {
          // Update counter if exists
          const counter = this.mediaGallery.querySelector(
            ".slider-counter--current"
          );
          if (counter) counter.textContent = index + 1;
        }
      });
    }
  }

  scrollToThumbnail(index) {
    if (!this.thumbnailSlider) return;

    const thumbnail = this.thumbnailItems[index];
    if (!thumbnail) return;

    const scrollPosition = this.calculateScrollPosition(thumbnail, index);
    this.thumbnailSlider.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    this.updateArrowVisibility();
  }

  calculateScrollPosition(thumbnail, index) {
    const thumbWidth = thumbnail.offsetWidth;
    const listWidth = this.thumbnailSlider.offsetWidth;
    const scrollLeft = this.thumbnailSlider.scrollLeft;
    const thumbLeft = thumbnail.offsetLeft;

    // If thumbnail is not fully visible to the right
    if (thumbLeft + thumbWidth > scrollLeft + listWidth) {
      return thumbLeft - listWidth + thumbWidth + 16; // 16px for padding
    }

    // If thumbnail is not fully visible to the left
    if (thumbLeft < scrollLeft) {
      return thumbLeft - 16; // 16px for padding
    }

    return scrollLeft;
  }

  slidePrev() {
    const visibleStart = Math.floor(
      this.thumbnailSlider.scrollLeft / this.thumbnailItems[0].offsetWidth
    );
    const targetIndex = Math.max(0, visibleStart - this.thumbnailsPerView);
    this.scrollToThumbnail(targetIndex);
  }

  slideNext() {
    const visibleStart = Math.floor(
      this.thumbnailSlider.scrollLeft / this.thumbnailItems[0].offsetWidth
    );
    const targetIndex = Math.min(
      this.thumbnailItems.length - 1,
      visibleStart + this.thumbnailsPerView
    );
    this.scrollToThumbnail(targetIndex);
  }

  updateArrowVisibility() {
    if (!this.thumbnailSlider || !this.prevButton || !this.nextButton) return;

    const scrollLeft = this.thumbnailSlider.scrollLeft;
    const scrollWidth = this.thumbnailSlider.scrollWidth;
    const clientWidth = this.thumbnailSlider.clientWidth;

    // Hide prev button if at the beginning
    this.prevButton.classList.toggle("hidden", scrollLeft <= 0);

    // Hide next button if at the end
    this.nextButton.classList.toggle(
      "hidden",
      scrollLeft + clientWidth >= scrollWidth - 10
    );
  }

  handleResize() {
    this.thumbnailsPerView = this.getThumbnailsPerView();
    this.updateArrowVisibility();
  }
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProductThumbnailCarousel();
});

// Support for Shopify dynamic sections
document.addEventListener("shopify:section:load", (event) => {
  if (event.detail.sectionId && event.detail.sectionId.includes("product")) {
    new ProductThumbnailCarousel();
  }
});
