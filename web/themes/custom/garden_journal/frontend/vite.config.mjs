import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: './',

  plugins: [react()],

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        style: resolve(__dirname, 'src/scss/style.scss'),
        font_faces: resolve(__dirname, 'src/scss/font-faces.scss'),
        garden_journal_navigation: resolve(__dirname, 'src/js/garden_journal_navigation.js'),
        garden_journal_image_fields: resolve(__dirname, 'src/js/garden_journal_image_fields.js'),
        garden_journal_exposed_form_search: resolve(__dirname, 'src/js/garden_journal_exposed_form_search.js'),
        garden_journal_sidebar_first_exposed_filters: resolve(__dirname, 'src/js/garden_journal_sidebar_first_exposed_filters.js'),
        garden_journal_plant_catalog: resolve(__dirname, 'src/react/plant-catalog/index.jsx'),
      },

      output: {
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name?.endsWith('.woff') ||
            assetInfo.name?.endsWith('.woff2')
          ) {
            return 'fonts/[name][extname]';
          }

          if (assetInfo.name?.endsWith('.css')) {
            return '[name][extname]';
          }

          return '[name][extname]';
        },
        entryFileNames: 'js/[name].js',
      },
    },
  },
});
