import Stripe from 'stripe';

//TODO convert to sveltekit
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'], {
	apiVersion: '2022-11-15',
	httpClient: Stripe.createFetchHttpClient()
});

export default stripe;
