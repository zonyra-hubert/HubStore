import { NextResponse } from "next/server";

export function middleware(request: NextResponse) {
  console.log("Middleware is running", request.url);
  return NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: ["/about/:path*"],
};
