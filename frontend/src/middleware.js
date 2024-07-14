import { NextResponse } from 'next/server'
// export { default } from "next-auth/middleware"

export async function middleware(request) {
    // const TOKEN = request.cookies.get('token')?.value;
    // const session = await getSession();

    // // w/o login => back to login page
    // if (
    //     (!session && !request.nextUrl.pathname.startsWith('/sign-in')) &&
    //     (!session && !request.nextUrl.pathname.startsWith('/sign-up'))
    // ) {
    //     return NextResponse.redirect(new URL('/sign-in', request.url))
    // }
    //
    // // w/ login => back to home page
    // if (
    //     (session && request.nextUrl.pathname.startsWith('/sign-in')) ||
    //     (session && request.nextUrl.pathname.startsWith('/sign-up'))
    // ) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
