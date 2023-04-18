import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "@helius-labs/xray";

import { PublicKey } from "@solana/web3.js";

import { getAllDomains, reverseLookupBatch } from "@bonfida/spl-name-service";

const { HELIUS_KEY } = process.env;

export const domains = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        const connection = connect("mainnet", HELIUS_KEY);

        const pubKey = new PublicKey(address);

        const domainKeys = await getAllDomains(connection, pubKey);
        const domainNames = await reverseLookupBatch(connection, domainKeys);

        let domains: any[] = [];
        for (let i = 0; i < domainKeys.length; i++) {
            domains.push({
                key: domainKeys[i] ?? "",
                name: domainNames[i] ?? "",
            });
        }

        return domains;
    });
