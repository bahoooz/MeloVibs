import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/auth-options";
import connectDb from "@/lib/mongodb";
import User, { UserTypes } from "@/models/user";
import ShopItem from "@/models/shopItem";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { message: "Vous devez être connecté" },
                { status: 401 }
            );
        }

        const { itemId } = await request.json();
        await connectDb();

        const user: UserTypes | null = await User.findOne({ email: session.user.email });
        
        if (!user) {
            return NextResponse.json(
                {message: "Utilisateur non trouvé"},
                {status: 404}
            )
        }

        const item = await ShopItem.findById(itemId);

        if (!item) {
            return NextResponse.json(
                { message: "Item non trouvé" },
                { status: 404 }
            );
        }
        
        // Vérifier les conditions pour l'achat d'un badge
        if (item.type === "badge") {
            
            const conditionVotes = item.metadata.get('condition_votes');
            
            // Vérifier si l'utilisateur a assez de votes
            if (conditionVotes && user?.votedTracks?.length < conditionVotes) {
                return NextResponse.json(
                    { message: "Vous n'avez pas assez voté pour acheter ce badge" },
                    { status: 400 }
                );
            }

            // Vérifier si l'utilisateur possède déjà le badge
            if (user.inventory.some(i => i.itemId.toString() === itemId)) {
                return NextResponse.json(
                    { message: "Vous possédez déjà ce badge" },
                    { status: 400 }
                );
            }
        }

        // Vérifier si l'utilisateur a assez de points
        if (user.points < item.price) {
            return NextResponse.json(
                { message: "Points insuffisants" },
                { status: 400 }
            );
        }

        // Ajouter l'item à l'inventaire
        user.inventory.push({
            itemId: item._id,
            acquiredAt: new Date(),
            type: item.type,
            name: item.name,
        });

        // Déduire les points
        user.points -= item.price;

        await user.save();

        return NextResponse.json(
            { 
                message: "Achat effectué avec succès",
                user: {
                    points: user.points,
                    inventory: user.inventory
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de l'achat:", error);
        return NextResponse.json(
            { message: "Erreur lors de l'achat : " + error },
            { status: 500 }
        );
    }
}
