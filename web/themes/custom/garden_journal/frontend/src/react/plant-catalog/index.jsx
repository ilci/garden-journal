/**
 * @file index.jsx
 * @description Application entry point for the Plant catalog React application.
 *   Mounts the root <App /> component onto the DOM element.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/**
 * Locate the target HTML container element where the React application will be
 * mounted.
 * 
 * @type {HTMLElement|null}
 */
const plantCatalogContainer = document.getElementById("plant-catalog");


// Check to ensure the mount element exists on the current page.
if (plantCatalogContainer) {
  /* 
  * Create a concurrent root attached to the DOM container, and render the root
  * component inside StrictMode to highlight potential problems in development.
  */
  createRoot(plantCatalogContainer).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  // Add a helpful developer log if the container is missing from the template.
  console.warn(
    'Plant catalog mount failed: Element with ID "#plant-catalog" was not found in the DOM.',
  );
}
