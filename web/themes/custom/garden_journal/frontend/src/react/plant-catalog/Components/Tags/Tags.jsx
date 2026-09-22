/**
 * @file Tags.jsx
 * @description Container list component for rendering taxonomy terms as tag
 *   badges.
 */

import Tag from "./Tag";

/**
 * Renders an unordered list of Tag components for a given array of taxonomy
 * terms.
 * Returns null if the tags array is missing or empty to avoid rendering empty
 * list markup.
 *
 * @param {Object} props
 *   Component props.
 * @param {Array<Object>} [props.tags=[]]
 *   Array of taxonomy term objects [{ id, name }].
 * @returns {JSX.Element|null}
 *   An unordered list (`<ul>`) of `<Tag />` components, or null if no tags
 *   exist.
 */
const Tags = ({ tags = [] }) => {
  // Early return if tags is not an array or contains no items.
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <ul className="card__tags tags">
      {tags.map((tag, index) => (
        <Tag key={tag?.id || tag?.uuid || index} tag={tag} />
      ))}
    </ul>
  );
};

export default Tags;
