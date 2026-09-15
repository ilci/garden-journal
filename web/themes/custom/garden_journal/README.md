# Garden Journal Theme

Custom Drupal theme for the **Garden Journal** project — a personal garden catalogue for keeping track of plants, garden beds, and journal entries.

The theme provides the visual design and front-end structure for the Garden Journal website, with a focus on a calm, earthy, and accessible gardening-inspired interface.

## Features

* Custom Drupal theme with no base theme
* Responsive layouts for desktop, tablet, and mobile
* Custom SCSS-based styling
* Vite-based front-end development workflow
* Reusable UI components and layout patterns
* Accessible forms and interactive elements
* Custom styling for:

  * Plant catalogue
  * Garden bed catalogue
  * Journal entries
  * Landing pages
  * Navigation
  * Forms
  * Buttons
  * Cards
  * Filters and exposed forms
  * Empty states

## Structure

```text
garden_journal/
├── frontend/
│   ├── src/
│   │   ├── scss/
│   │   └── ...
│   ├── package.json
│   └── vite.config.mjs
├── js/
├── templates/
│   ├── block/
│   ├── content/
│   ├── field/
│   ├── layout/
│   └── ...
├── garden_journal.info.yml
├── garden_journal.libraries.yml
├── garden_journal.theme
└── README.md
```

## Styling

The theme uses **SCSS** for authoring styles.

Source styles are located in:

```text
frontend/src/scss/
```

The compiled stylesheet is generated into:

```text
frontend/dist/
```

The theme loads the compiled stylesheet through the `garden_journal/global_styling` library.

### Design direction

The visual design is inspired by a quiet, natural garden journal:

* muted greens
* soft neutrals
* subtle purple accents
* warm off-white backgrounds
* serif headings
* clean sans-serif body text
* generous spacing
* simple, understated interactions

### Fonts

The theme uses:

* **Cormorant Garamond** for headings and decorative typography
* **Source Sans 3** for body text and interface elements

Font definitions are maintained in:

```text
frontend/src/scss/font-faces.scss
```

## Local Development

The Garden Journal project uses **DDEV** for the local Drupal development environment.

Start the DDEV environment from the project root:

```bash
ddev start
```

Common Drupal commands can be run through DDEV:

```bash
ddev drush cr
```

```bash
ddev drush status
```

### Front-end development

The theme uses **Yarn**, **Vite**, and **Sass** for front-end development.

The front-end project is located in:

```text
themes/custom/garden_journal/frontend/
```

Install dependencies with:

```bash
ddev yarn install
```

Start the front-end watcher with:

```bash
ddev yarn watch
```

The watcher recompiles the front-end assets while developing.

The available scripts are defined in:

```text
frontend/package.json
```

## Drupal

The theme is a standalone custom theme:

```yaml
base theme: false
```

It is intended to be used with the Garden Journal Drupal installation and is not designed as a general-purpose Drupal theme.

The theme contains Twig templates and theme-specific overrides for the Garden Journal content model.

## Accessibility

Accessibility is considered part of the component and template design.

The theme aims to provide:

* semantic HTML
* keyboard-accessible interactions
* visible focus states
* appropriate button and link semantics
* accessible form controls
* meaningful labels
* appropriate image alternative text
* responsive layouts without relying on hover-only interactions

## Browser Support

The theme is intended for modern browsers with support for current CSS and JavaScript features.

## Project

Garden Journal is a personal garden management and documentation project for recording:

* 🌱 Plants
* 🌿 Garden beds
* 📖 Journal entries
* 📝 Garden observations
* 🌸 Seasonal changes and experiments

The project is primarily a learning and personal-use project, while also serving as a space to experiment with Drupal, front-end architecture, accessibility, and modern development workflows.
