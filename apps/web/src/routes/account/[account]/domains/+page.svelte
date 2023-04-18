<script>
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    // import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import { SOL } from "@helius-labs/xray/dist";
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";
    import formatMoney from "src/lib/util/format-money";

    const account = $page.params.account;

    const client = trpcWithQuery($page);
    const domains = client.domains.createQuery(account);
    $: domainRecords = $domains?.data;
    
</script>

<div>
    {#if domainRecords}
    {#each domainRecords as domain}
        <div
            class="col-span-10 flex items-center justify-between text-right md:col-span-11"
        >
            <div>
                {domain.name}
            </div>
            <div>
                {domain.key}
            </div>
        </div>
    {/each}
    {/if}
</div>
