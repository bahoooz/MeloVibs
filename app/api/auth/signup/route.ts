import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const { name, email, password, confirmPassword } = await request.json();
  
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }
  
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Les mots de passe ne correspondent pas" },
        { status: 400 }
      );
    }
  
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }
  
    try {
      const db = await connectDb();
      if (db.connection && db.connection.db) {
        console.log("Connected to DB:", db.connection.db.databaseName); // Log pour vérifier la base
      } else {
        console.error("La connexion à la base de données a échoué");
        return NextResponse.json(
          { error: "Erreur de connexion à la base de données" },
          { status: 500 }
        );
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Cette email est déjà utilisé" },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
        // image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        // votes: 0,
        // isEmailVerified: false,
        // isAdmin: false
      });
  
      await newUser.save();
  
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de la création de l'utilisateur" },
        { status: 500 }
      );
    }
  }
  