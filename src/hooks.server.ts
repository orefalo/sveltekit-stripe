import { createUser } from '$lib/db';
import type { Handle } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const handle: Handle = async ({ event, resolve }) => {
	const uid = event.cookies.get('userid') || nanoid();
	event.locals.userid = uid;

	const response = await resolve(event);

	if (!uid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		event.cookies.set('userid', uid, { httpOnly: true });
		createUser(uid);
	}

	return response;
};
