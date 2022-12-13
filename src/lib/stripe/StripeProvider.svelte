<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe } from '@stripe/stripe-js';
	import { onMount, setContext } from 'svelte';
	import { PUBLIC_STRIPE_PUBLIC_KEY } from '$env/static/public';

	if (
		PUBLIC_STRIPE_PUBLIC_KEY === null ||
		typeof PUBLIC_STRIPE_PUBLIC_KEY !== 'string' ||
		PUBLIC_STRIPE_PUBLIC_KEY.length === 0
	) {
		throw new Error('PUBLIC_STRIPE_PUBLIC_KEY must be added to .env');
	}

	let stripe: Stripe | null;

	setContext('getStripe', () => stripe);

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLIC_KEY);
	});
</script>

{#if stripe}
	<slot />
{/if}
