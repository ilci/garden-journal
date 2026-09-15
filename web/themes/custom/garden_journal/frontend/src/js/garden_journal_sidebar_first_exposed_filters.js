/**
 * @file
 *
 * Enhancements for the Sidebar first region with exposed filters.
 */

((Drupal, once) => {
  /**
   * Handles the sidebar's (expanded/collapsed) visibility on screens where the
   * sidebar is collapsed by default.
   * 
   * @param {HTMLElement} sidebar
   *   The sidebar first with exposed filters element.
   */
  const handleSidebarVisibility = (sidebar) => {
    const filterButton = sidebar.querySelector('.filter-button');
    const closeButtons = sidebar.querySelectorAll('.close-button, .show-results-button');

    // When the user clicks on the filter button, add the 'is-open' class to
    // the sidebar.
    filterButton.addEventListener('click', () => {
      sidebar.classList.add('is-open');
    });

    // When the user clicks on the sidebar itself (not on the content in it),
    // remove the 'is-open' class from it.
    sidebar.addEventListener('click', (e) => {
      if (e.currentTarget === e.target) {
        sidebar.classList.remove('is-open');
      }
    });

    // When the user clicks on one of the close buttons (chevron down icon,
    // Close button or the Show results button), remove the 'is-open' class
    // from the sidebar.
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        sidebar.classList.remove('is-open');
      });
    });
  };

  Drupal.behaviors.gardenJournalSidebarFirstExposedFilters = {
    attach(context) {
      once('sidebar-with-exposed-filters', '.sidebar-with-exposed-filters', context).forEach(handleSidebarVisibility);
    },
  };
})(Drupal, once);
