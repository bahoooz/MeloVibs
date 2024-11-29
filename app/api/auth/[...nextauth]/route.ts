import bcrypt from 'bcryptjs';
import connectDb from '@/lib/mongodb';
import User from '@/models/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    await connectDb();
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error("Email non trouvé");
                    }
                    const isValidPassword = await bcrypt.compare(credentials?.password ?? "", user.password as string);
                    if (!isValidPassword) {
                        throw new Error("Mot de passe incorrect");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        votedTracks: user.votedTracks,
                        isAdmin: user.isAdmin,
                    };
                } catch (error) {
                    console.error("Erreur d'authentification:", error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Propriétés standard
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                // Propriétés personnalisées
                token.id = user.id;
                token.votedTracks = user.votedTracks;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    // Propriétés standard  
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    // Propriétés personnalisées
                    id: token.id,
                    votedTracks: token.votedTracks,
                    isAdmin: token.isAdmin,
                }
            }
            return session;
        }
    },
    pages: {
        signIn: "/connexion",
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { authOptions };
export { authOptions as GET, authOptions as POST };