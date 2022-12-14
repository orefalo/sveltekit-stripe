// thsi script will create test products on stripe

import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';

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

const plans = [
	{
		product: {
			id: '',
			name: 'Free Plan',
			description: 'The bare minimum.'
		},
		price: {
			id: '',
			currency: 'usd',
			unit_amount: 0,
			recurring: {
				interval: 'month'
			}
		},
		includes: [
			'A number starting at 0',
			'A "plus" button',
			'A "minus" button',
			'Infinite button clicks'
		]
	},
	{
		product: {
			id: '',
			name: 'Basic Plan',
			description: 'The basic services.'
		},
		price: {
			id: '',
			currency: 'usd',
			unit_amount: 1000,
			recurring: {
				interval: 'month'
			}
		},
		includes: [
			'All the features in the free plan.',
			'You get to pay money for it.',
			'Lifetime support'
		]
	},
	{
		product: {
			id: '',
			name: 'Premium Plan',
			description: 'Everything in the basic plan and then some.'
		},
		price: {
			id: '',
			currency: 'usd',
			unit_amount: 1500,
			recurring: {
				interval: 'month'
			}
		},
		includes: ['All the features of the basic plan', 'A sense of superiority', 'Nothing else']
	}
];

async function main() {
	await Promise.all(
		plans.map(async (plan) => {
			// Only create the product if it's not free
			if (plan.price.unit_amount > 0) {
				const product = await stripe.products.create(plan.product);
				const price = await stripe.prices.create({
					...plan.price,
					product: product.id
				});
				console.log(`${plan.product.name} id: ${product.id}`);
				plan.product.id = product.id;
				plan.price.id = price.id;
			}
		})
	);
	fs.writeFileSync(
		path.join(path.resolve(path.dirname('')), './src/routes/plansData.json'),
		JSON.stringify(plans, null, 2),
		'utf8'
	);
	console.log('Products configured in the application and synced with stripe');
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
