import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import prerender from "@prerenderer/rollup-plugin";
import RendererPuppeteer from "@prerenderer/renderer-puppeteer";
import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getDynamicRoutes = () => {
  const parseSlugs = (filePath, prefix) => {
    try {
      const content = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
      const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
      return matches.map(m => `${prefix}/${m[1]}`);
    } catch (e) {
      console.error(`Error reading ${filePath}:`, e);
      return [];
    }
  };

  const projectRoutes = parseSlugs('src/data/projects.js', '/projects');
  const productRoutes = parseSlugs('src/data/products.js', '/products');
  const blogRoutes = parseSlugs('src/data/blog.js', '/blog');

  return [...projectRoutes, ...productRoutes, ...blogRoutes];
};

const staticRoutes = ['/', '/about', '/projects', '/products', '/contact', '/blog', '/faq'];
const dynamicRoutes = getDynamicRoutes();
const allRoutes = [...staticRoutes, ...dynamicRoutes];

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    /*prerender({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, 'dist/prerendered'),
      routes: allRoutes,
      renderer: new RendererPuppeteer({
        renderAfterTime: 5000,
        headless: true,
        injectProperty: '__PRERENDER_INJECTED',
        inject: {},
        consoleHandler: function(route, message) {
          console.log(`[Puppeteer ${route}]`, message.text());
        }
      }),
    })*/
  ],
  server: {
    middlewareMode: false,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/react-globe.gl')) {
            return 'vendor-3d';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/framer-motion')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
});