import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./globals.css";
import AuthProvider from "@/context/Authprovider";
import ForgetPasswordContextProvider from "@/context/forgetPasswordContext";

export const metadata: Metadata = {
  title: "Exam  App",
};


const poppins = Poppins({
  weight: ['100' , '200' , '300' ,'400' , '500' , '600' , '700' , '800' , '900'], 
  subsets: ['latin'], 
  style : ['normal' , 'italic']

});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        className={``}
      >
        <AuthProvider>
          <ForgetPasswordContextProvider>
          {children}
          </ForgetPasswordContextProvider>
          
          </AuthProvider>
      </body>
    </html>
  );
}
