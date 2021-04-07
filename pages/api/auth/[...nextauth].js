import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.SECRET,
    session: {
        jwt: true,
    },
    database: process.env.DATABASE_URL + '?entityPrefix=nextauth_',
    callbacks: {
        async session(session, token) {
        // expose user id
        return Promise.resolve({ ...session, user: { ...session.user, id: token.sub } })
        }
    }
};

// we will define `options` up next
const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;