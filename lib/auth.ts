    import { NextAuthOptions } from "next-auth";
    import CredentialsProvider from "next-auth/providers/credentials";
    import { connectToDatabse } from "./db";
    import bcrypt from "bcryptjs";
    import User from "@/models/User";

    export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: {label:"Password", type: "password"}
        },
        async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                throw new Error("Missing Email or password")
            }
            try{
                await connectToDatabse(){
            const user =   await User.findOne({email:credentials.email})
            if(!user){
                throw new Error("No user found with this username");
            } 
        const isValid = await bcrypt.compare(
            credentials.password,
            user.password    
        )
        if(!isValid){
            throw new Error("Invalid password")
        }

        return

        }
            }catch (error){

                }

            )
        }
        })
    ],
    };
