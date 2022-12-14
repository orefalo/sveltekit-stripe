import Stripe from 'stripe';

import { STRIPE_SECRET_KEY, STRIPE_API_VERSION } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
	//@ts-expect-error
	apiVersion: STRIPE_API_VERSION,
	httpClient: Stripe.createFetchHttpClient()
});
