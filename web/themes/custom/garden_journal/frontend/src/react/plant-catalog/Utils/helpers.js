/**
 * @file helpers.js
 * @description Utility functions for fetching, mapping, and resolving Drupal
 *   JSON:API data.
 *   Handles entity relationship resolution for media, files, and taxonomy terms.
 */

import { BASE_URL } from "./constants";

/**
 * Fetches JSON data from a given API endpoint with built-in status validation.
 *
 * @param {string} endpoint
 *   The relative endpoint path (e.g., "/node/plant?include=...").
 * @returns {Promise<Object>}
 *   The parsed JSON response data from the server.
 * @throws {Error}
 *   Throws an error if the HTTP status is not OK (200-299).
 */
export const fetchData = async (endpoint) => {
  try {
    // Perform network request to the combined endpoint URL.
    const response = await fetch(`${BASE_URL}${endpoint}`);

    // Check if HTTP response status is in the 200-299 range.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the raw response body as JSON and return the data.
    const data = await response.json();
    return data;

  } catch (error) {
    // Log network or parsing errors to the console before rethrowing.
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

/**
 * Creates a Map lookup table for Drupal JSON:API side-loaded `included`
 * entities.
 * Keys entities using the format `${type}:${id}`
 * (e.g., "taxonomy_term--sun_exposure:123").
 *
 * @param {Array<Object>} [included=[]]
 *   Array of entity objects from the `included` API key.
 * @returns {Map<string, Object>}
 *   Fast lookup table mapping compound keys to entity objects.
 */
export const createIncludedMap = (included = []) => {
  const map = new Map();

  included.forEach((item) => {
    if (item?.type && item?.id) {
      map.set(`${item.type}:${item.id}`, item);
    }
  });

  return map;
};

/**
 * Resolves a Drupal Media relationship into an image URL path.
 * Extracts the URI path from the nested File entity.
 *
 * @param {Object} relationship
 *   The Media relationship field from a Drupal entity node.
 * @param {Map<string, Object>} includedMap
 *   The entity lookup map created by `createIncludedMap`.
 * @returns {string|null}
 *   The resolved image URL path, or null if unresolvable.
 */
export const getImageUrl = (relationship, includedMap) => {
  /*
  * Normalize reference data (extracts first item if array, or single object if
  * object.
  */
  const mediaRef = Array.isArray(relationship?.data) ? relationship.data[0] : relationship?.data;

  // 1. Find the parent Media entity in the included map.
  const media = includedMap.get(`${mediaRef?.type}:${mediaRef?.id}`);

  // Normalize the nested File reference inside the Media entity.
  const fileRef = media?.relationships?.field_media_image?.data;
  const fileRefData = Array.isArray(fileRef) ? fileRef[0] : fileRef;

  // 2. Find the child File entity in the included map.
  const file = includedMap.get(`${fileRefData?.type}:${fileRefData?.id}`);

  // 3. Extract and return the URI path.
  const url = file?.attributes?.uri?.url;
  return url || null;
};

/**
 * Resolves Drupal taxonomy term relationships into an array of clean term
 * objects.
 *
 * @param {Object|Array} relationship
 *   Taxonomy relationship object or array from JSON:API response.
 * @param {Map<string, Object>} includedMap
 *   The entity lookup map created by `createIncludedMap`.
 * @returns {Array<{id: string, name: string}>}
 *   Array of simplified term objects [{ id, name }].
 */
export const getIncludedTerms = (relationship, includedMap) => {
  /*
  * Normalize raw references into an array (supports { data: [...] },
  * { data: {...} }, or raw arrays).
  */
  const rawData = relationship?.data ?? relationship;
  if (!rawData) return [];

  const references = Array.isArray(rawData) ? rawData : [rawData];

  return references
    .map((ref) => {
      // 1. Look up term entity from included map using "type:id" key.
      const term = includedMap.get(`${ref?.type}:${ref?.id}`);
      if (!term?.attributes?.name) return null;

      // 2. Return simplified term object.
      return {
        id: term.id,
        name: term.attributes.name,
      };
    })
    .filter(Boolean); // Remove null entries (unresolved terms or empty names).
};
