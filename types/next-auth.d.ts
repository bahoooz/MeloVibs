import "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { InventoryItem } from "@/models/user";

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
        points: number;
        inventory: InventoryItem[];
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
            points: number;
            inventory: InventoryItem[];
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
        points: number;
        inventory: InventoryItem[];
    }
} 