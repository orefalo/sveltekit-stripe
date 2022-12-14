import { findUser, linkStripeSessionId } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, url }) => {
	let sessionId = url.searchParams.get('sessionId') || '';
	const userId = cookies.get('userid') || '';

	if (userId.length > 0) {
		if (sessionId.length > 0) {
			linkStripeSessionId(userId, sessionId);
		} else {
			const user = findUser(userId);
			sessionId = user?.stripe_sessionId;
		}
	}

	return {
		sessionId: sessionId
	};
}) satisfies PageServerLoad;
