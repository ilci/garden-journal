/**
 * @file Tag.jsx
 * @description Presentational component that renders an individual tag badge.
 *   Extracts and displays tag labels from either plain strings or structured
 *   Drupal taxonomy term objects.
 */

/**
 * Renders an individual taxonomy tag item inside a list element.
 * Returns null if the label cannot be resolved.
 *
 * @param {Object} props
 *   Component props.
 * @param {Object|string} props.tag
 *   Taxonomy term object ({ id, name }) or raw string label.
 * @returns {JSX.Element|null}
 *   A list item (`<li>`) tag badge, or null if empty.
 */
const Tag = ({ tag }) => {
  // Extract label string whether tag is passed as an object or a string.
  const label = typeof tag === "object" ? tag?.name : tag;

  // Early return if no valid label string exists.
  if (!label) return null;

  // Return the tag as a list item.
  return <li className="tag tag--default">{label}</li>;
};

export default Tag;
