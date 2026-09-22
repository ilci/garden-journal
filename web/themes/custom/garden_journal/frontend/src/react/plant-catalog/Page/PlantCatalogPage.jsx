/**
 * @file PlantCatalogPage.jsx
 * @description Primary view component for the Plant catalog application.
 *   Coordinates data fetching via the `usePlants` custom hook and structures
 *   the sidebar and card grid layouts.
 */

import { usePlants } from "../Hooks/usePlants";
import Cards from "../Components/Cards/Cards";

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

  return (
    <div className="plant-catalog-layout">
      {/* Sidebar section reserved for catalog search and taxonomy tag filters. */}
      <aside className="plant-catalog-sidebar-wrapper">
        {/* Filter controls will be mounted here. */}
      </aside>

      {/* Primary content area housing the card grid and pagination. */}
      <section className="plant-catalog-content-wrapper">
        <div className="catalog__card-content">
          <Cards plants={plants} loading={loading} error={error} />
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
