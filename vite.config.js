import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-sitemap";

import { projectSlugs, blogSlugs, productCategories } from "./src/data/routes.js";

const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

const staticRoutes = [
  '/about',
  '/projects',
  '/products',
  '/solutions',
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
  '/led-strip-lights-dubai',
  '/hotel-lighting',
  '/residential-lighting',
  '/office-lighting',
  '/retail-lighting',
  '/restaurant-lighting',
  '/entertainment-lighting',
  '/lighting-suppliers-abu-dhabi',
  '/lighting-companies-sharjah',
  '/lighting-solutions-ajman',
  '/lighting-solutions-rak',
  '/lighting-companies-uae',
  '/lighting-companies-saudi-arabia',
  '/lighting-companies-bahrain'
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
      hostname: 'https://credencelighting.com',
      dynamicRoutes: allRoutes,
      exclude: ['/googlec1f5f2059d49e07d.html', '/googlec1f5f2059d49e07d']
    }),
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
    modulePreload: false,
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/framer-motion/')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
});