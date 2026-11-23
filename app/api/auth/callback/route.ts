import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");

    const savedState = request.cookies.get("oauth_state")?.value;
    if (!code || !state || state !== savedState) {
        return NextResponse.redirect(new URL("/?error=invalid_oauth", request.url));
    }

    const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code: code,
                redirect_url: process.env.GITHUB_REDIRECT_URI,
            }),
        }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
        return NextResponse.redirect(new URL("/?error=invalid_token", request.url));
    }

    const userResponse =
}