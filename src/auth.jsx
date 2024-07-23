import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";
import bcrypt from "bcryptjs";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;

                try {
                    const user = await User.findOne({
                        email: credentials?.email
                    });

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return { ...user, id: user._id }; // Ensure the correct id format
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            async profile(profile) {
                const user = await User.findOne({ email: profile.email });
                if (!user) {
                    throw new Error("User not found. Please register at /register");
                }
                return { ...user.toObject(), id: user._id.toString(), name: user.name }; // Ensure the correct id format
            },
        }),
    ],
    pages: {
        error: '/register',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                return true;
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            if (url === "/api/auth/signin" || url === "/api/auth/callback/google") {
                return baseUrl;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Ensure the correct id format
                token.phone = user.phone;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id; // Ensure the correct id format
                session.user.phone = token.phone;
                session.user.name = token.name;
            }
            return session;
        },
    },
});
