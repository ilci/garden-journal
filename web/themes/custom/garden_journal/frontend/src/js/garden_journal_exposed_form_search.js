/**
 * @file
 *
 * Enhancements for the Search API fulltext search input field on an exposed
 * form.
 */

((Drupal, once) => {
  /**
   * Initializes the Search.
   *
   * @param {HTMLElement} searchInputWrapper
   *   The search input field's wrapper element.
   */
  const initSearch = (searchInputWrapper) => {
    const searchInput = searchInputWrapper.querySelector('input');
    let debounceTimeout;

    // Create a Clear search button and append it to the Search input wrapper.
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.ariaLabel = Drupal.t('Clear search');
    clearButton.classList.add('icon-x', 'icon-button', 'icon-button--small', 'hidden');
    searchInputWrapper.append(clearButton);
    
    // If the Search input field has at least 1 character, show the Clear
    // button, otherwise hide it with the 'hidden' class.
    const handleClearButtonClass = () => {
      if (searchInput.value.length > 0) {
        clearButton.classList.remove('hidden');
      } else {
        clearButton.classList.add('hidden');
      }
    };

    // When the value of the Search input field has been changed, check it in
    // every 300ms and handle the visibility of the Clear button based on the
    // number of characters in the Search input field.
    const handleSearchInput = () => {
      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        handleClearButtonClass();
      }, 300);
    };
    searchInput.addEventListener('input', handleSearchInput);

    // Clear the value of the Search input field, handle the Clear button
    // class and then submit the form when the user clicks on the reset button.
    clearButton.addEventListener('click', (e) => {
      e.preventDefault();
      searchInput.value = '';
      handleClearButtonClass();
      searchInputWrapper.closest('form').querySelector('.form-submit').click();
    });

    // On page load, check the number of characters in the Search field and
    // handle the visibility of the Clear button based on it.
    handleClearButtonClass();
  };

  Drupal.behaviors.gardenJournalExposedBedSearch = {
    attach(context) {
      once('exposed-form-search', '.block--views-exposed-filter-block .form-item-keyword', context).forEach(initSearch);
    },
  };
})(Drupal, once);
