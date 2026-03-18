// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from '@my/config';

export default defineConfig({
  integrations: [react()],
  site: siteConfig.site,
  base: siteConfig.base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
