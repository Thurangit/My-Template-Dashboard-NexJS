// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const { nextUrl } = request;

  // Si la langue n'est pas définie, redirige vers '/fr'
  if (!nextUrl.pathname.startsWith('/fr') && !nextUrl.pathname.startsWith('/en')) {
    const url = nextUrl.clone();
    url.pathname = `/fr${nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/', // Middleware s'applique à la racine
};
