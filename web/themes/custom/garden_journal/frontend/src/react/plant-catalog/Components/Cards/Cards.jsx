/**
 * @file Cards.jsx
 * @description Catalog cards grid container component. Handles async UI states
 *   (loading, error, empty results) and maps over plant data to render
 *   individual cards.
 */

import Card from "./Card";

/**
 * Renders a responsive grid container displaying plant cards or status
 * feedback messages.
 *
 * @param {Object} props
 *   Component props.
 * @param {Array<Object>} [props.plants=[]]
 *   Array of transformed plant objects.
 * @param {boolean} [props.loading=false]
 *   Asynchronous loading state flag.
 * @param {string|null} [props.error=null]
 *   Asynchronous error message state.
 * @returns {JSX.Element}
 *   Status feedback element or grid of `<Card />` components.
 */
const Cards = ({ plants = [], loading, error }) => {
  // Render loading feedback while network request is pending.
  if (loading) {
    return (
      <div className="catalog-status">{Drupal.t("Loading plants...")}</div>
    );
  }

  // Render error feedback if network request or data processing failed.
  if (error) {
    return (
      <div className="catalog-status catalog-status--error">
        {Drupal.t("Error loading catalog.")}
      </div>
    );
  }

  // Render empty state feedback if request succeeded but no matching plants exist.
  if (!plants.length) {
    return (
      <div className="no-results">
        <h2 className="h1--hero">{Drupal.t("No plants found.")}</h2>
        <p>
          {Drupal.t(
            "There are no plants to display. Try adjusting your filters or search, or check back when more plants have been added.",
          )}
        </p>
      </div>
    );
  }

  // Render catalog grid containing mapped plant items.
  return (
    <div className="grid grid--tablet-landscape--2 plant-catalog-grid">
      {plants.map((plant) => (
        <Card
          key={plant.id}
          href={plant.href}
          published={plant.published}
          title={plant.title}
          active={plant.active}
          imageUrl={plant.imageUrl}
          lifecycle={plant.lifecycle}
          hungarianName={plant.hungarianName}
          description={plant.description}
          sunlightNeeds={plant.sunlightNeeds}
          waterNeeds={plant.waterNeeds}
        />
      ))}
    </div>
  );
};

export default Cards;
