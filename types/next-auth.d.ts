import "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    export interface User {
        id: string;
        email: string;
        name: string;
        image?: string;
        votedTracks: string[];
        isAdmin: boolean;
        createdAt: Date;
        remainingVotes: number;
        lastVoteRefresh: Date;
        isEmailVerified: boolean;
    }

    export interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
            votedTracks: string[];
            isAdmin: boolean;
            createdAt: Date;
            remainingVotes: number;
            lastVoteRefresh: Date;
            isEmailVerified: boolean;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name: string;
        picture?: string;
        votedTracks: string[];
        isAdmin: boolean;
        createdAt: Date;
        remainingVotes: number;
        lastVoteRefresh: Date;
        isEmailVerified: boolean;
    }
} 