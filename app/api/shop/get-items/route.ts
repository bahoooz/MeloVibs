import connectDb from "@/lib/mongodb";
import ShopItem from "@/models/shopItem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    try {
        await connectDb();
        const items = await ShopItem.find({ isActive: true });
        
        return NextResponse.json({ items });
    } catch (error) {
        console.error("Erreur lors de la récupération des items:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des items" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { type } = await request.json();
        
        if (!type) {
            return NextResponse.json(
                { error: "Le type est requis" }, 
                { status: 400 }
            );
        }

        await connectDb();
        
        const items = await ShopItem.find({ 
            isActive: true,
            type: type 
        }).sort({ price: 1 });
        
        return NextResponse.json(
            { items }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de la récupération des items:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des items" }, 
            { status: 500 }
        );
    }
}