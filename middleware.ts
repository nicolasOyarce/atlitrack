// app/middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

// Función para verificar el token
async function verifyToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("Token verification error:", error);
        return null;
    }
}

// Función para verificar si el refresh token es válido
async function verifyRefreshToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("Refresh token verification error:", error);
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;
    const currentPath = req.nextUrl.pathname;

    if (!token && !refreshToken) {
        console.log("No tokens found - redirecting to login");
        if (currentPath !== '/sign-in' && currentPath !== '/sign-up') {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
        return NextResponse.next();
    }

    if (token) {
        const payload = await verifyToken(token);
        if (payload) {
            if (currentPath.startsWith("/dashboard") && payload.role === "Roles.student" && !currentPath.startsWith("/dashboard/student")) {
                return NextResponse.redirect(new URL("/dashboard/student/schedule", req.url));
            }

            if (currentPath.startsWith("/dashboard") && payload.role === "Roles.admin_sportcenter" && !currentPath.startsWith("/dashboard/admin")) {
                return NextResponse.redirect(new URL("/dashboard/admin/sport-center-manager", req.url));
            }
            return NextResponse.next();
        }
    }

    if (refreshToken) {
        const refreshPayload = await verifyRefreshToken(refreshToken);
        if (refreshPayload) {
            const response = NextResponse.next();
            response.headers.set('x-needs-token-refresh', '1');
            return response;
        }
    }

    if (currentPath !== '/sign-in') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};