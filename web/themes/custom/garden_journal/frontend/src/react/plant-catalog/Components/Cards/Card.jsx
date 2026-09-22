/**
 * @file Card.jsx
 * @description Presentational card component representing a single plant item.
 *   Renders plant imagery, taxonomy tags, status badges, names and sanitized
 *   HTML descriptions. Only displays output if the node is published.
 */

import { memo } from "react";
import DOMPurify from "dompurify";
import Tags from "../Tags/Tags";

/**
 * Single plant card component.
 *
 * @param {Object} props
 *   Component props.
 * @param {boolean} props.published
 *   Drupal publication status state, card renders only when true.
 * @param {string} props.href
 *   Relative path to node (URL alias or internal node id).
 * @param {string} props.title
 *   Primary plant title.
 * @param {boolean} props.active
 *   Active garden status flag.
 * @param {string|null} props.imageUrl
 *   Background image URL path.
 * @param {string} props.lifecycle
 *   Single lifecycle taxonomy term name.
 * @param {string} props.hungarianName
 *   Hungarian translation or local name for the plant.
 * @param {string} props.description
 *   Processed HTML text description from Drupal.
 * @param {Array<{id: string, name: string}>} props.sunlightNeeds
 *   Array of sunlight needs taxonomy term objects.
 * @param {Array<{id: string, name: string}>} props.waterNeeds
 *   Array of water needs taxonomy term objects.
 * @returns {JSX.Element}
 *   The rendered plant card element if published, or null if unpublished.
 */
const Card = ({
  published,
  href,
  title,
  active,
  imageUrl,
  lifecycle,
  hungarianName,
  description,
  sunlightNeeds,
  waterNeeds,
}) => {
  // Combine both arrays into a single list.
  const combinedTags = [...sunlightNeeds, ...waterNeeds];

  // Early return if node is unpublished to prevent unnecessary wrapper rendering.
  if (!published) {
    return null;
  }

  return (
    <div className="col--12 col--tablet-landscape--6">
      <article className="card card--quicklink card--plant">
        <div className="card__header card__header--with-image">
          <div
            className="card__image card__image--header has-background-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          <span
            className={`card__availability tag ${active ? "tag--active" : "tag--inactive"}`}
            aria-hidden="true"
          >
            {active ? Drupal.t("Active") : Drupal.t("Inactive")}
          </span>
        </div>
        <div className="card__overline text--overline">{lifecycle}</div>
        <h2 className="card__title h1">{title}</h2>
        <div className="card__body">
          <span className="text--small">{hungarianName}</span>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
          <Tags tags={combinedTags} />
        </div>
        <a
          className="card__link"
          href={href}
          rel="bookmark"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              Drupal.t("Read more about @title", { "@title": title }),
            ),
          }}
        />
      </article>
    </div>
  );
};

/*
 * Memoize component to skip re-renders when parent catalog state updates
 * unchanged items.
 */
export default memo(Card);
