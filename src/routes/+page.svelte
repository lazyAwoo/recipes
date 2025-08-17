<script lang="ts">
	import recipes from "$lib/data/recipes.json";
	import { getIcon } from "$lib/icons";

	import * as Select from "$lib/components/ui/select/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

	type Recipe = { id: string; title: string; description: string; icon?: string, steps?: string[] };

	let value = $state("");
	let selected = $derived(recipes.find((r: Recipe) => r.id === value));
	let Icon = $derived(getIcon(selected?.icon));
	const triggerContent = $derived(
		recipes.find((f) => f.id === value)?.title ?? "Выборать рецепт"
	);
</script>

<svelte:head>
	<title>Recipes</title>
	<meta name="description" content="A collection of favorite recipes." />
</svelte:head>

<ScrollArea class="min-h-dvh h-dvh">
	<section class="mx-auto max-w-xl py-6 px-4 lg:p-6 grid gap-6 items-center justify-items-center">
		<Select.Root type="single" name="selectedRecipe" bind:value>
			<Select.Trigger class="w-[260px]">
				<span class="truncate">{triggerContent}</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each recipes as recipe (recipe.id)}
						<Select.Item
							value={recipe.id}
							label={recipe.title}
						>
							{recipe.title}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>

		{#if selected}
			<Card.Root class="w-full">
				<Card.Header >

					<Card.Title class="flex items-center gap-3">
						{#if Icon}
							<Icon class="w-6 h-6 shrink-0" />
						{/if}
						{selected.title}
					</Card.Title>
					<Card.Description>{selected.description}</Card.Description>
				</Card.Header>
			</Card.Root>

			{#if selected.steps && selected.steps.length > 0}
				{#each selected.steps as step, index}
					<label class="block w-full">
						<input type="checkbox" class="peer sr-only" aria-label={`Отметить шаг ${index+1}`} />
						<Card.Root class="w-full pt-7 pb-3 relative peer-checked:opacity-40 overflow-hidden cursor-pointer select-none transition-colors transition-opacity hover:bg-muted/50">
							 <span class="absolute left-0 top-0 inline-flex h-6 min-w-6 items-center justify-center rounded-br-lg bg-muted px-2 text-xs leading-none font-semibold text-muted-foreground">
								<span class="">{index + 1}</span>
							</span>
							<Card.Content class="px-3">
								<p>{step}</p>
							</Card.Content>
						</Card.Root>
					</label>
				{/each}
			{:else}
				<p class="mt-4 text-muted-foreground">Этот рецепт ещё не описан</p>
			{/if}

		{/if}
	</section>
</ScrollArea>