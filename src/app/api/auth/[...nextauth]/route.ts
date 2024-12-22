import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

 session :{
  strategy : 'jwt'
 },
 callbacks : {
  async jwt({token , user}){
    return {...token , ...user}
  },
  async session({session , token}){
    return {...session , ...token}
  }
 },
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    GoogleProvider( {
      clientId :process.env.GOOGLE_CLIENT_ID ,
      clientSecret : process.env.GOOGLE_CLIENT_SECREST
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
      
        const data = await fetch(`https://exam.elevateegy.com/api/v1/auth/signin`,{
          body : JSON.stringify({
            email : credentials?.email,
            password : credentials?.password
          }) , 
          method : 'POST',
          headers : {
            'content-type' : 'application/json' 
          }
        }
      );
        const response = await data.json();
       
       if(response.message === 'success'){
        return response
       }
          
       else {
        // Pass error as a string to be consumed by the frontend
        throw new Error(response.message || 'An error occurred.');
      }
      },
      credentials: {
        email: {
          label: "User Name",
          placeholder: "Please enter your user Name",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Please enter your password",
          type: "password",
        },
      },
    }),
    
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
