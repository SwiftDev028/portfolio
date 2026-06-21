import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {'process.env.NODE_ENV': JSON.stringify('production')},
  build: {
    outDir: 'hero-build',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {format: {comments: false}},
    cssCodeSplit: false,
    lib: {entry: 'src/hero.tsx', formats: ['es'], fileName: () => 'atlas-hero.js'},
    rollupOptions: {output: {assetFileNames: (asset) => asset.name?.endsWith('.css') ? 'atlas-hero.css' : 'assets/[name][extname]'}},
  },
});
