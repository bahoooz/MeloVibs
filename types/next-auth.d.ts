import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id?: string;
        votedTracks?: string[];
        isAdmin?: boolean;
    }

    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            votedTracks?: string[];
            isAdmin?: boolean;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        votedTracks?: string[];
        isAdmin?: boolean;
    }
} 