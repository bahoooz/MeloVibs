import bcrypt from 'bcryptjs';
import connectDb from '@/lib/mongodb';
import User from '@/models/user';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    await connectDb();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        return null;
                    }

                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        user.password as string
                    );

                    if (!isValidPassword) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        votedTracks: user.votedTracks,
                        isAdmin: user.isAdmin,
                        createdAt: user.createdAt,
                        remainingVotes: user.remainingVotes,
                        lastVoteRefresh: user.lastVoteRefresh,
                        isEmailVerified: user.isEmailVerified
                    };
                } catch (error) {
                    console.error("Erreur d'authentification:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                try {
                    await connectDb();
                    const userExists = await User.findOne({ email: profile?.email });
                    
                    if (!userExists) {
                        let userName = profile?.name;
                        const userNameExists = await User.findOne({ name: userName });
                        
                        if (userNameExists) {
                            userName = `${profile?.name}_${Date.now().toString().slice(-4)}`;
                        }

                        await User.create({
                            email: profile?.email,
                            name: userName,
                            remainingVotes: 5,
                            lastVoteRefresh: new Date(),
                            createdAt: new Date(),
                            votedTracks: [],
                            isEmailVerified: true
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Erreur lors de la connexion Google:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, trigger }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                token.id = user.id;
                token.votedTracks = user.votedTracks;
                token.isAdmin = user.isAdmin;
                token.createdAt = user.createdAt;
                token.remainingVotes = user.remainingVotes;
                token.lastVoteRefresh = user.lastVoteRefresh;
                token.isEmailVerified = user.isEmailVerified;
            }

            if (trigger === "signIn" || trigger === "update") {
                try {
                    await connectDb();
                    const dbUser = await User.findOne({ email: token.email });
                    if (dbUser) {
                        token.name = dbUser.name;
                        token.email = dbUser.email;
                        token.id = dbUser._id.toString();
                        token.votedTracks = dbUser.votedTracks;
                        token.isAdmin = dbUser.isAdmin;
                        token.createdAt = dbUser.createdAt;
                        token.remainingVotes = dbUser.remainingVotes;
                        token.lastVoteRefresh = dbUser.lastVoteRefresh;
                        token.isEmailVerified = dbUser.isEmailVerified;
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
                    id: token.id,
                    votedTracks: token.votedTracks || [],
                    isAdmin: token.isAdmin,
                    createdAt: token.createdAt,
                    remainingVotes: token.remainingVotes,
                    lastVoteRefresh: token.lastVoteRefresh,
                    isEmailVerified: token.isEmailVerified,
                }
            }
            return session;
        }
    },
    events: {
        async signIn({ user }) {
            console.log("Connexion réussie pour:", user.email);
        }
    },
    pages: {
        signIn: "/connexion",
        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
}; 