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
      },

      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.woff') || assetInfo.name?.endsWith('.woff2')) {
            return 'fonts/[name][extname]';
          }

          if (assetInfo.name?.endsWith('.css')) {
            return '[name][extname]';
          }

          return '[name][extname]';
        },
      },
    },
  },
});
