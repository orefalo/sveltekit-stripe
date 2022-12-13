import Stripe from 'stripe';

import { STRIPE_SECRET_KEY, STRIPE_API_VERSION } from '$env/static/private';

//TODO convert to sveltekit
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: STRIPE_API_VERSION,
	httpClient: Stripe.createFetchHttpClient()
});

export default stripe;
