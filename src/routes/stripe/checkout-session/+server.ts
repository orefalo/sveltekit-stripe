import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { stripe } from '../_stripe';
import { json } from '@sveltejs/kit';

export async function POST(event: RequestEvent): Promise<Response> {
	const req = event.request;

	const formData = await req.json();
	const priceId = formData.priceId;

	console.log(formData);

	if (typeof priceId !== 'string') {
		return json({
			status: 400,
			error: {
				message: 'priceId is required'
			}
		});
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],

			success_url: `${event.url.origin}/?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${event.url.origin}`
		});
		console.log(session);
		return json({
			sessionId: session.id
		});
	} catch (err) {
		console.log(err);
		return json({
			status: 500,
			error: err
		});
	}
}
