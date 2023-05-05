import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
            clientId: process.env.GOOGLE_ID,
        })
    ], 
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email, 
            })
            session.user.id = sessionUser._id.toString()
            return session
        }, 
        async signIn({ profile }) {
            try {
                // serverless -> lambda -> dynamdb
                await connectToDB()
    
                // check if a user aleady exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                console.log(profile.name.replace(' ', '').toLowerCase())
                // console.log(profile.email)
    
                // if not, create a new user 
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(), 
                        image: profile.picture
                    })
                }
    
                return true
            } catch (error) {
                return false
            }
        }
    }
    
})

export { handler as GET, handler as POST }