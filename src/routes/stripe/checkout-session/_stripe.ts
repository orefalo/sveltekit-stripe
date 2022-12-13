import Stripe from 'stripe';

import { STRIPE_SECRET_KEY } from '$env/static/private';

//TODO convert to sveltekit
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
	httpClient: Stripe.createFetchHttpClient()
});

export default stripe;
