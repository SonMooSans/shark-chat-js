import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "../trpc";
import { Serialize } from "../types";

export type Result =
    | {
          status: "authenticated";
          profile: Serialize<User>;
      }
    | {
          status: "unauthenticated" | "loading";
          profile: null;
      };

/**
 * Get user profile, as an alternative to next-auth's `useSession`
 *
 * If no requirements on realtime mutates, please use `useSession` instead
 */
export default function useProfile(): Result {
    const { status } = useSession();
    const query = trpc.account.get.useQuery(undefined, {
        enabled: status === "authenticated",
        staleTime: Infinity,
    });

    if (query.isLoading) {
        return {
            status: "loading",
            profile: null,
        };
    }

    if (status === "unauthenticated" || query.isError) {
        return {
            status: "unauthenticated",
            profile: null,
        };
    }

    return {
        status: "authenticated",
        profile: query.data,
    };
}
