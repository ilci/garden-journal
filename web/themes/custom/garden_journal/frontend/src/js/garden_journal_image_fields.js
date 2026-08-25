/**
 * @file
 *
 * Enhancements for image fields.
 */

((Drupal, once) => {
  /**
   * Initializes an image.
   *
   * @param {HTMLImageElement} image
   *   The image to initialize.
   */
  const initImage = (image) => {
    // Get the image source so the original image can be opened.
    const url = image.getAttribute('src');

    // Return if there is no image source for some reasons.
    if (!url) {
      return;
    }

    // Make the image keyboard focusable since it is clickable.
    image.setAttribute('tabindex', '0');

    /**
     * Open the image in a new tab.
     */
    const openImage = () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Open the image in a new tab when the user clicks on the image.
    image.addEventListener('click', openImage);

    // Open the image in a new tab when the user presses Enter or Space on the
    // image.
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        openImage();
      }
    });
  };

  Drupal.behaviors.gardenJournalImageFields = {
    attach(context) {
      once('image-field', '.field--field-image img', context).forEach(initImage);
    },
  };
})(Drupal, once);
