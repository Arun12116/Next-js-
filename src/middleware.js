// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('accessToken');

  if (!token) {
    return NextResponse.redirect(new URL('/loginPage', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/about'],
};
