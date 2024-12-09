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
                        createdAt: user.createdAt,
                    };
                } catch (error) {
                    console.error("Erreur d'authentification:", error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                token.id = user.id;
                token.votedTracks = user.votedTracks;
                token.isAdmin = user.isAdmin;
                token.createdAt = user.createdAt;
            }

            if (trigger === "signIn" || trigger === "update") {
                try {
                    await connectDb();
                    const dbUser = await User.findOne({ email: token.email });
                    if (dbUser) {
                        token.name = dbUser.name;
                        token.email = dbUser.email;
                        token.picture = dbUser.image;
                        token.id = dbUser._id.toString();
                        token.votedTracks = dbUser.votedTracks;
                        token.isAdmin = dbUser.isAdmin;
                        token.createdAt = dbUser.createdAt;
                    }
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du token:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    id: token.id,
                    votedTracks: token.votedTracks || [],
                    isAdmin: token.isAdmin,
                    createdAt: token.createdAt,
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