import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/auth-options";
import { getServerSession } from "next-auth";
import connectDb from "@/lib/mongodb";
import ShopItem from "@/models/shopItem";

export async function POST(request: NextRequest) {
    try {
        // Temporairement commenté pour les tests
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const data = await request.json()
        await connectDb()

        const newItem = new ShopItem({
            name: data.name,
            description: data.description,
            type: data.type,
            price: data.price,
            quantity: data.quantity,
            imageUrl: data.imageUrl,
            isActive: true,
            metadata: data.metadata
        })

        await newItem.save()

        return NextResponse.json(
            { message: "Item ajouté avec succès", item: newItem }, 
            { status: 201 }
        )

    } catch (error) {
        console.error("Erreur lors de l'ajout de l'item:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'ajout de l'item" }, 
            { status: 500 }
        )
    }
}