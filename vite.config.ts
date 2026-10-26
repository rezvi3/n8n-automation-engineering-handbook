import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const d3GeoFixPath = '/tmp/node_fix/node_modules/d3-geo';
const alias: Record<string, string> = {};
if (fs.existsSync(d3GeoFixPath)) {
  alias['d3-geo'] = d3GeoFixPath;
}

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias
  },
  server: {
    port: 5173,
    host: true
  }
});
