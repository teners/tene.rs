import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import purgecss from 'astro-purgecss';

export default defineConfig({
  integrations: [tailwind(), purgecss()],
});
