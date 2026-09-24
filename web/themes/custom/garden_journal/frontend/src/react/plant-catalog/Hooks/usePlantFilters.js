/**
 * @file usePlantFilters.js
 * @description Custom hook for managing client-side catalog filtering.
 *   Currently manages search input filtering, designed to easily scale
 *   for additional taxonomy/attribute filter categories.
 */

import { useState, useMemo, useCallback } from "react";

/**
 * Custom hook to filter plants by text search.
 *
 * @param {Array<Object>} [plants=[]]
 *   Array of transformed plant objects from `usePlants`.
 * @returns {{
 *   searchText: string,
 *   setSearchText: Function,
 *   handleResetSearch: Function,
 *   filteredPlants: Array<Object>,
 *   hasActiveFilters: boolean
 * }} State variables, event handlers, and derived filtered plants list.
 */
export function usePlantFilters(plants = []) {
  const [searchText, setSearchText] = useState("");

  /**
   * Resets the search input back to an empty string.
   */
  const handleResetSearch = useCallback(() => {
    setSearchText("");
  }, []);

  /**
   * Evaluates if any active filters are currently set.
   */
  const hasActiveFilters = useMemo(() => {
    return searchText.trim.length > 0;
  }, [searchText]);

  /**
   * Derives the filtered array of plants based on text search match.
   * Compares query against plant title, Hungarian name, and processed
   * description fields.
   */
  const filteredPlants = useMemo(() => {
    if (!searchText.trim()) return plants;

    const query = searchText.toLowerCase().trim();

    return plants.filter((plant) => {
      const titleMatch = plant.title?.toLowerCase().includes(query);
      const hungarianNameMatch = plant.hungarianName?.toLowerCase().includes(query);
      const descriptionMatch = plant.description?.toLowerCase().includes(query);

      return titleMatch || hungarianNameMatch || descriptionMatch;
    });
  }, [plants, searchText]);

  return {
    searchText,
    setSearchText,
    handleResetSearch,
    filteredPlants,
    hasActiveFilters,
  };
}
