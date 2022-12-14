const stripe = require('stripe')(
	'sk_test_51KyzNVC01N1ZZY0868xefwnAMbuq83CsPx6bI99QuwWVtY3LTZi8kngn6ndDHFMgSiO8dPgapS6GkgVp19pojh6J00nYS8N0P7'
);

const configuration = await stripe.billingPortal.configurations.create({
	business_profile: {
		headline: 'SnapCore subscriptions'
	},
	features: { invoice_history: { enabled: true } }
});
