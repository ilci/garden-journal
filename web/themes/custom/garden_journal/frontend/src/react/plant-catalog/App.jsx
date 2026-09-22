/**
 * @file App.jsx
 * @description Root application component for the Plant vatalog.
 *   Serves as the top-level container for global providers, routing, and
 *   primary views.
 */

import PlantCatalogPage from "./Page/PlantCatalogPage";

/**
 * Root App component.
 * Currently mounts the primary Plant catalog page view.
 * 
 * @returns {JSX.Element} The rendered root component hierarchy.
 */
const App = () => {
  // Directly return the main catalog page view.
  return <PlantCatalogPage />;
};

export default App;
