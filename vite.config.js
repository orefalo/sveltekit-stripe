// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import dns from 'dns';
import basicSsl from '@vitejs/plugin-basic-ssl';

dns.setDefaultResultOrder('verbatim');

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		host: 'localhost',
		port: 3000
	},
	plugins: [basicSsl(), sveltekit()]
};

export default config;
