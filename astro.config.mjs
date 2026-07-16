// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://karteo.com.br',
  // 100% estatico (GitHub Pages). O endpoint /api/lead-churn foi desativado —
  // ver src/servidor-futuro/LEIA-ME.md pra reativar com hospedagem com servidor.
  output: 'static',
  redirects: {
    // a landing de escritórios virou a home (15/07); manter o link antigo vivo
    '/escritorio': '/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
