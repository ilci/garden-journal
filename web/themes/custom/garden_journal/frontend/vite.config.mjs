import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        style: resolve(__dirname, 'src/scss/style.scss'),
        font_faces: resolve(__dirname, 'src/scss/font-faces.scss'),
        garden_journal_navigation: resolve(__dirname, 'src/js/garden_journal_navigation.js'),
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
