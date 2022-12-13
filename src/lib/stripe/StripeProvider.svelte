<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe } from '@stripe/stripe-js';
	import { onMount, setContext } from 'svelte';

	import { PUBLIC_STRIPE_PUBLIC_KEY } from '$env/static/public';

	const STRIPE_PUBLIC_KEY = PUBLIC_STRIPE_PUBLIC_KEY;

	if (typeof STRIPE_PUBLIC_KEY !== 'string') {
		throw new Error('PUBLIC_STRIPE_PUBLIC_KEY must be added to .env');
	}

	// ID of the connected stripe account
	//export let stripeAccount: string | undefined = undefined;

	let stripe: Stripe | null;

	setContext('getStripe', () => stripe);

	onMount(async () => {
		console.log('StripeProvider onload');
		stripe = await loadStripe(STRIPE_PUBLIC_KEY);
	});
</script>

{#if stripe}
	<slot />
{/if}
