import { mdsvex } from 'mdsvex'
import { sveltePreprocess } from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.svelte.md', '.md', '.svx'],
      smartypants: {
        dashes: 'oldschool',
      },
      layout: {
        posts: './src/routes/+layout.svelte',
      },
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],

  kit: {
    adapter: adapter({
      fallback: '404.html',
    }),

    prerender: {
      crawl: true,
      handleMissingId: 'warn',
    },
  },
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
}

export default config
