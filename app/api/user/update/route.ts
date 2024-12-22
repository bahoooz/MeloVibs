import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);
    
    // Vérifier l'authentification
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    // Récupérer les données de la requête
    const { email, password } = await request.json();
    
    // Connexion à la base de données
    await connectDb();

    // Trouver l'utilisateur actuel
    const user = await User.findOne({ email: session.user.email });
    console.log("Utilisateur trouvé:", user); // Debug

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Préparer l'objet de mise à jour
    const updateData: any = {};

    // Si un email est fourni et différent de l'actuel
    if (email && email !== session.user.email) {
      // Vérifier si l'email est déjà utilisé
      const emailExists = await User.findOne({ 
        email, 
        _id: { $ne: user._id } 
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 400 }
        );
      }
      updateData.email = email;
    }

    // Si un mot de passe est fourni
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Effectuer la mise à jour si nécessaire
    if (Object.keys(updateData).length > 0) {
      console.log("Données à mettre à jour:", updateData); // Debug
      
      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: updateData },
        { new: true }
      );

      console.log("Utilisateur mis à jour:", updatedUser); // Debug

      if (!updatedUser) {
        return NextResponse.json(
          { error: "Erreur lors de la mise à jour" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: "Profil mis à jour avec succès" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}
