import connectDb from "@/lib/mongodb";
import ShopItem from "@/models/shopItem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        
        await connectDb();
        
        const query = type 
            ? { isActive: true, type: type }
            : { isActive: true };
            
        const items = await ShopItem.find(query).sort({ price: 1 });
        
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