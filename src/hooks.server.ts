import type { Handle } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = event.cookies.get('userid') || nanoid();
	event.locals.userid = userId;

	const response = await resolve(event);

	if (!userId) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		event.cookies.set('userid', userId, { httpOnly: true });
	}

	return response;
};
