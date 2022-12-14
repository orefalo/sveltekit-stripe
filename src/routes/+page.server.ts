import json from './plansData.json';

export interface Offers {
	plans: Array<Offer>;
}
export interface Offer {
	product: Product;
	price: Price;
	includes?: string[] | null;
}
export interface Product {
	name: string;
	description: string;
	id?: string | null;
}
export interface Price {
	currency: string;
	unit_amount: number;
	recurring: Recurring;
	id?: string | null;
}
export interface Recurring {
	interval: string;
}

const plans = json as Array<Offer>;

export function load(): Offers {
	return {
		plans
	};
}
