import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const apiVersion = process.env.STRIPE_API_VERSION;

if (!stripeSecret) {
	console.log('STRIPE_SECRET_KEY not set');
	process.exit(1);
}

if (!apiVersion) {
	console.log('STRIPE_API_VERSION not set');
	process.exit(1);
}

const stripe = new Stripe(stripeSecret, {
	//@ts-expect-error
	apiVersion: apiVersion
});

const configuration = await stripe.billingPortal.configurations.create({
	business_profile: {
		headline: 'SnapCore subscriptions',
		privacy_policy_url: 'https://example.com/privacy',
		terms_of_service_url: 'https://example.com/terms'
	},
	default_return_url: null,
	features: {
		customer_update: {
			allowed_updates: ['email' /*, 'tax_id'*/],
			enabled: true
		},
		invoice_history: {
			enabled: true
		},
		payment_method_update: {
			enabled: true
		},
		subscription_cancel: {
			cancellation_reason: {
				enabled: true,
				options: ['too_expensive', 'missing_features', 'low_quality', 'other']
			},
			enabled: true,
			mode: 'at_period_end',
			proration_behavior: 'none'
		},
		subscription_pause: {
			enabled: false
		},
		subscription_update: {
			//Allow updating subscription quantities.
			default_allowed_updates: ['quantity'],
			enabled: true,
			proration_behavior: 'create_prorations'
		}
	}
});
