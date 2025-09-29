import { defineConfig } from 'astro/config';

import purgecss from 'astro-purgecss';

export default defineConfig({
  integrations: [purgecss()],
});
