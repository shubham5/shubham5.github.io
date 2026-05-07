import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://notaquizzer.in',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
