// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  redirects: {
    // a landing de escritórios virou a home (15/07); manter o link antigo vivo
    '/escritorio': '/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
