<?php

declare(strict_types=1);

namespace Drupal\garden_journal_plant_catalog\Presentation\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller to manage Plant catalog page.
 */
final class PlantCatalogController extends ControllerBase {
  /**
   * Displays the Plant catalog page.
   */
  public function page(): array {
    return [
      '#markup' => '<div id="plant-catalog"></div>',
      '#attached' => [
        'library' => [
          'garden_journal/plant_catalog',
        ],
      ],
    ];
  }
}
