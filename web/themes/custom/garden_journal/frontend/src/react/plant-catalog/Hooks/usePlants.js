/**
 * @file usePlants.js
 * @description Custom React hook and data transformation logic for fetching,
 *   normalizing and managing state for Plant nodes from Drupal JSON:API.
 */

import { useState, useEffect } from "react";
import { fetchData, createIncludedMap, getImageUrl, getIncludedTerms } from "../Utils/helpers";

/**
 * Transforms raw Drupal JSON:API Plant node response into simplified JS
 * objects for UI components.
 *
 * @param {Object} json
 *   The raw JSON payload returned by Drupal JSON:API.
 * @returns {Array<Object>}
 *   Array of formatted plant objects ready for rendering.
 */
export function transformPlants(json) {
  // Check if response payload or data array is missing.
  if (!json?.data) return [];

  // Create an lookup table for side-loaded `included` entities.
  const includedMap = createIncludedMap(json.included || []);

  // Map over every Plant entity node and extract required properties.
  return json.data.map((plant) => {
    const attributes = plant.attributes || {};
    const relationships = plant.relationships || {};    

    return {
      id: plant.id,
      //Defaults to true: Plant node is published unless explicitly unchecked.
      published: attributes.status ?? true,
      // Resolves the link target: prefers the custom path alias, falling back
      // to the canonical Drupal path (`/node/{nid}`).
      href: attributes.path.alias ? attributes.path.alias : `/node/${attributes.drupal_internal__nid}`,
      title: attributes.title,
      // Defaults to false: plant is inactive in the garden unless explicitly
      // checked.
      active: attributes.field_active ?? false,
      imageUrl: getImageUrl(relationships.field_image, includedMap),
      // Lifecycle is a single-value relationship; take the first term's name.
      lifecycle: getIncludedTerms(relationships.field_lifecycle, includedMap)[0]?.name,
      hungarianName: attributes.field_hungarian_name,
      description: attributes.field_description.processed,
      // Multi-value taxonomy relationships mapped into [{ id, name }] arrays.
      sunlightNeeds: getIncludedTerms(relationships.field_sunlight_needs, includedMap),
      waterNeeds: getIncludedTerms(relationships.field_water_needs, includedMap),
    };
  });
}

/**
 * Custom React Hook to fetch and manage the Plant catalog state.
 * Handles API network request, loading flags, error state, and cleanup on
 * unmount.
 *
 * @returns {{ plants: Array<Object>, loading: boolean, error: string|null }}
 *   State object containing the plant list array, asynchronous loading status,
 *   and error message string if request fails.
 */
export const usePlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flag to prevent updating state if component unmounts during active fetch.
    let isMounted = true;

    /*
    * JSON:API Endpoint URL including necessary relationship includes:
    * - field_lifecycle: Single-value taxonomy reference.
    * - field_image.field_media_image: Nested Media entity -> File entity
    *   reference.
    * - field_sunlight_needs: Multi-value taxonomy reference.
    * - field_water_needs: Multi-value taxonomy reference.
    */
    const endpoint =
      "/node/plant?include=field_lifecycle,field_image.field_media_image,field_sunlight_needs,field_water_needs";

    // Initiate async request to backend endpoint.
    fetchData(endpoint)
      .then((json) => {
        /*
        * Abort state updates if the component unmounted while network request
        * was pending.
        */
        if (!isMounted) return;

        // Transform raw data into clean component props.
        const formatted = transformPlants(json);

        // Update state with transformed data and signal request completion.
        setPlants(formatted);
        setLoading(false);
      })
      .catch((err) => {
        // Abort error state updates if the component unmounted.
        if (!isMounted) return;

        /*
        * Fallback to generic message if error object lacks standard message
        * string.
        */
        setError(err.message || "Failed to fetch plant catalog");
        setLoading(false);
      });

    // Cancel pending state updates on component unmount.
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures fetch triggers once on component mount.

  return { plants, loading, error };
};
