<script lang="ts">
	//	export const prerender = true;
	import Pricing from '$lib/Pricing/index.svelte';
	import StripeProvider from '$lib/stripe/StripeProvider.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

<StripeProvider>
	<section>
		<h2>Choose your subscription to start using the service!</h2>
		<Pricing plans={data.plans} />
	</section>
</StripeProvider>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h2 {
		color: var(--heading-color);
		font-weight: bold;
		font-size: 2rem;
	}
</style>
