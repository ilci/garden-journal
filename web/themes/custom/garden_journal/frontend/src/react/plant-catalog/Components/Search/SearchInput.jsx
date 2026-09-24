/**
 * @file SearchInput.jsx
 * @description Search input component for filtering Plant catalog items.
 */

/**
 * Renders the search bar with a clear button.
 *
 * @param {Object} props
 *   Component props.
 * @param {string} props.searchText
 *   Current search input text.
 * @param {Function} props.onSearchChange
 *   Callback when search input changes.
 * @param {Function} props.onReset
 *   Callback to clear the search query.
 * @returns {JSX.Element}
 *   The search bar component.
 */
const SearchInput = ({ onSearchChange, searchText = "", onReset }) => {
  return (
    <div className="search-form form-item-keyword">
      <label className="visually-hidden" htmlFor="plant-search">
        {Drupal.t("Search plants")}
      </label>
      <input
        id="plant-search"
        className="search-input"
        placeholder={Drupal.t("Search")}
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      ></input>
      {searchText.length > 0 && (
        <button
          className="icon-x icon-button icon-button--small"
          type="button"
          aria-label={Drupal.t("Clear search")}
          onClick={onReset}
        ></button>
      )}
    </div>
  );
};

export default SearchInput;
