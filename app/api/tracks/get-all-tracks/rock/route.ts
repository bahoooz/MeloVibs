import connectDb from "@/lib/mongodb";
import Track from "@/models/track";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const tracks = await Track.find({ genres: "rock" });
        return NextResponse.json({ tracks });
    } catch (error) {
        console.error("Erreur lors de la récupération des tracks:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des tracks" },
            { status: 500 }
        );
    }
}