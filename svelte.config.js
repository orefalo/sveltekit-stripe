import sveltePreprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),

	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),
		csp: {
			directives: {
				// per stripe doc
				'script-src': ['self', 'https://*.stripe.com', 'https://maps.googleapis.com'],
				'connect-src': ['self', 'data', 'https://*.stripe.com', 'https://maps.googleapis.com'],
				'img-src': ['self', 'https://*.stripe.com']
			}
		}
	}
};

export default config;
