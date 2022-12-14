// this is a poor's man memory db, in more mature implementations a database would be used
// used to link user id to stripe id, a 1-> 1 relationship.

type Subscription = {
	id: string;
	status: string;
	product: string;
	endDate: number;
};

type User = {
	stripe_sessionId?: string;
	creation_date?: number;
	update_date?: number;
	subscription?: Subscription;
};

// uid -> User
const db = new Map<string, User>();

export function createUser(uid: string) {
	const now = Date.now();
	let user = db.get(uid);
	if (!user) user = { creation_date: now, update_date: now };
	db.set(uid, user);
}

export function findUser(uid: string) {
	let user = db.get(uid);
	return user;
}

export function linkStripeSessionId(uid: string, sid: string) {
	const now = Date.now();
	const user = db.get(uid);
	if (user) {
		user.stripe_sessionId = sid;
		user.update_date = now;
	}
}
