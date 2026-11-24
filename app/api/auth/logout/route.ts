import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = NextResponse.redirect(new URL("/", request.url));

    response.cookies.delete("github_user");
    response.cookies.delete("oauth_state");

    return response;
}