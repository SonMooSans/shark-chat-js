import { getServerSession } from "next-auth/next";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
    return {
        session: await getServerSession(opts.req, opts.res, authOptions),
    };
}
