import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import prerender from "@prerenderer/rollup-plugin";
import RendererPuppeteer from "@prerenderer/renderer-puppeteer";
import Sitemap from "vite-plugin-sitemap";
import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { projectSlugs, blogSlugs, productCategories } from "./src/data/routes.js";

const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

const staticRoutes = [
  '/about',
  '/projects',
  '/products',
  '/downloads',
  '/brands',
  '/gallery',
  '/contact',
  '/blog',
  '/faq',
  '/lighting-company-dubai',
  '/lighting-showroom-dubai',
  '/ceiling-lights-dubai',
  '/outdoor-lighting-dubai',
  '/pendant-lights-dubai',
  '/led-strip-lights-dubai'
];

const dynamicRoutes = [
  ...projectSlugs.map(slug => `/projects/${slug}`),
  ...blogSlugs.map(slug => `/blog/${slug}`),
  ...productCategories.map(cat => `/products/${slugify(cat)}`)
];

const allRoutes = [...staticRoutes, ...dynamicRoutes];

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    Sitemap({
      hostname: 'https://www.credencelighting.com',
      dynamicRoutes: allRoutes
    }),
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