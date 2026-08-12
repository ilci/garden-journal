/**
 * @file
 * Script for the navigation region.
 */

((Drupal, once) => {
  /**
   * Initializes the navigation.
   *
   * @param {Element} navigation
   *   The navigation element.
   */
  const init = (navigation) => { 
    const toggleButton = navigation.querySelector('button.navigation__toggle--nav');
    const siteOverlay = document.querySelector('.site-overlay');
    const desktopBreakpoint = window.matchMedia('(min-width: 960px)');

    /**
     * Opens the collapsed menus by adding visibility-related classes to the
     * navigation and overlay elements and setting the toggle button's
     * `aria-expanded` attribute to `true`.
     */
    const openCollapsedMenu = () => {
      navigation.classList.add('is-open');
      siteOverlay.classList.add('is-visible');
      toggleButton.ariaExpanded = 'true';
      toggleButton.ariaLabel = Drupal.t('Close menu');
    };

    /**
     * Closes the collapsed menus by removing visibility-related classes from
     * the navigation and overlay elements and setting the toggle button's
     * `aria-expanded` attribute to `false`.
     */
    const closeCollapsedMenu = () => {
      navigation.classList.remove('is-open');
      siteOverlay.classList.remove('is-visible');
      toggleButton.ariaExpanded = 'false';
      toggleButton.ariaLabel = Drupal.t('Open menu');
    };

    /**
     * Toggles the collapsed menus based on the navigation's 'is-open' class.
     */
    const toggleCollapsedMenu = () => {
      if (navigation.classList.contains('is-open')) {
        closeCollapsedMenu();
      }
      else {
        openCollapsedMenu();
      }
    };

    // Toggle the collapsed menus when the toggle button is clicked.
    toggleButton.addEventListener('click', toggleCollapsedMenu);

    // Close the collapsed menus when the overlay is clicked.
    siteOverlay.addEventListener('click', closeCollapsedMenu);

    // Close the collapsed menus when switching to desktop.
    desktopBreakpoint.addEventListener('change', (event) => {
      if (event.matches) {
        closeCollapsedMenu();
      }
    });
  };
  

  Drupal.behaviors.gardenJournalNavigation = {
    attach(context) {
      once('navigation', '.region--navigation .navigation', context).forEach(init);
    },
  };
})(Drupal, once);
