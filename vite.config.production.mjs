import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';

// Production-specific configuration
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Remove console.log in production
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }],
        ],
      },
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
    ViteImageOptimizer({
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 85 },
      avif: { quality: 70 },
      svg: {
        multipass: true,
        plugins: [
          'preset-default',
          'removeDimensions',
          'removeViewBox',
          'removeMetadata',
          'removeComments',
        ],
      },
    }),
    // Multiple compression formats
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('@headlessui') || id.includes('@heroicons')) {
              return 'vendor-ui';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Other vendor libraries
            return 'vendor-misc';
          }
          
          // Page-based chunks
          if (id.includes('/pages/')) {
            const match = id.match(/\/pages\/([^/]+)/);
            if (match) {
              return `page-${match[1].toLowerCase().replace('.jsx', '')}`;
            }
          }
          
          // Component chunks for large components
          if (id.includes('/components/')) {
            const heavyComponents = [
              'AdminDashboard',
              'DashboardPage',
              'QuizInterface',
              'CertificateViewer',
            ];
            
            const match = id.match(/\/components\/([^/]+)/);
            if (match && heavyComponents.includes(match[1].replace('.jsx', ''))) {
              return `component-${match[1].toLowerCase().replace('.jsx', '')}`;
            }
          }
        },
        // Optimized file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          
          return `assets/${extType}/[name]-[hash].[ext]`;
        },
      },
      external: (id) => {
        // Externalize large libraries if using CDN
        // return ['react', 'react-dom'].includes(id);
        return false;
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 3, // Multiple passes for better compression
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  define: {
    __DEV__: false,
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
});