export default {
  // Relative asset paths work both locally and in a GitHub Pages project site.
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        cv: 'cv.html',
      },
    },
  },
}
