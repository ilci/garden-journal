/**
 * @file PlantCatalogPage.jsx
 * @description Primary view component for the Plant catalog application.
 *   Coordinates data fetching via the `usePlants` custom hook and structures
 *   the sidebar and card grid layouts.
 */

import { usePlants } from "../Hooks/usePlants";
import { usePlantFilters } from "../Hooks/usePlantFilters";
import Cards from "../Components/Cards/Cards";
import SearchInput from "../Components/Search/SearchInput";

/**
 * PlantCatalogPage Component.
 * Renders the catalog layout containing the filtering sidebar and content (with
 * card grids and future pagination).
 *
 * @returns {JSX.Element} The structured catalog page view.
 */
const PlantCatalogPage = () => {
  /*
   * Extract catalog state, loading flags, and network error messages from
   * custom hook.
   */
  const { plants, loading, error } = usePlants();

  // Manage search input and filtering logic.
  const { searchText, setSearchText, handleResetSearch, filteredPlants } =
    usePlantFilters(plants);

  return (
    <div className="plant-catalog-layout grid grid--tablet--2 has-sidebar">
      <div className="sidebar-with-filters sidebar-with-filters--react col--12 col--tablet-landscape--4">
        <div className="sidebar-wrapper">
          <section className="sidebar-first">
            <div className="container">
              <div className="panel">
                <SearchInput
                  searchText={searchText}
                  onSearchChange={setSearchText}
                  onReset={handleResetSearch}
                />
                {/* Filter controls will be mounted here. */}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Primary content area housing the card grid and pagination. */}
      <section className="plant-catalog-content-wrapper col--12 col--tablet-landscape--8">
        <div className="catalog__card-content">
          <Cards plants={filteredPlants} loading={loading} error={error} />
        </div>
        {/* Pagination Container (Reserved for catalog page controls) */}
        <div className="catalog__pagination">
          {/* <Pagination /> component will be mounted here */}
        </div>
      </section>
    </div>
  );
};

export default PlantCatalogPage;
