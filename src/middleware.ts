import { NextRequest, NextResponse } from "next/server";

const guesturl = ['/login', '/register', '/forgetpassword'];

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('next-auth.session-token');
    const currentUrl = request.nextUrl.pathname;
    
    // If logged in and trying to access guest-only pages
    if (token && guesturl.includes(currentUrl)) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to homepage
    }

    // If not logged in and trying to access restricted pages
    if (!token && !guesturl.includes(currentUrl)) {
        return NextResponse.rewrite(new URL('/login',request.url )); // Redirect to login
    }

    // Allow access to other routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',                // Homepage
        '/client', 
        '/server',         
        '/login',           // Guest route
        '/register',        // Guest route
        '/forgetpassword'   // Guest route
    ],
};
