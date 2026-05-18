import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [react(), icon()],
  site: 'https://pafanimazione.it',
});
