// app/middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

// Función para verificar el token
async function verifyToken(token: string) {
  try {
    // Usa la misma clave secreta que tu backend
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
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
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Si no existe un token, redirige a la página de login
  if (!token && !refreshToken) {
    console.log("No tokens found - redirecting to login");
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  if (token) {
    const payload = await verifyToken(token);
    
    // Si el token es válido, permite el acceso
    if (payload) {
      return NextResponse.next();
    }
  }
  if (refreshToken) {
    const refreshPayload = await verifyRefreshToken(refreshToken);
    
    if (refreshPayload) {
      // El refresh token es válido
      // Crear una respuesta que permita continuar
      const response = NextResponse.next();
      
      // Establecer un header especial para indicar que se necesita refresh
      response.headers.set('x-needs-token-refresh', '1');
      
      return response;
    }
  }

  // Si ningún token es válido, redirige al login
  return NextResponse.redirect(new URL('/sign-in', req.url));
}
export const config = {
  matcher: ['/dashboard/:path*'], // Rutas que quieres proteger
};