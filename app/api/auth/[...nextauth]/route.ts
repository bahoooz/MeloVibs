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
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
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