import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    // ViteImageOptimizer({
    //   jpeg: { quality: 80 },
    //   png: { quality: 80 },
    //   webp: { quality: 80 },
    //   avif: { quality: 70 },
    // }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // This line is added
    globals: true,
  },
})
