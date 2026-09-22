/**
 * @file constants.js
 * @description Centralized configuration constants for domain origins,
 *   API routes and base request endpoints used across the application.
 */

/**
 * Base browser origin domain (e.g., "https://example.com").
 * @type {string}
 */
export const ORIGIN = window.location.origin;

/**
 * Base endpoint URL for Drupal JSON:API requests.
 * @type {string}
 */
export const BASE_URL = `${ORIGIN}/jsonapi`;
