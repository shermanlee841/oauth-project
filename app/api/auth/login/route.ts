import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
    const state = randomBytes(16).toString("hex");
    const githubURL = new URL("https://github.com/login/oauth/authorize");

    githubURL.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
    githubURL.searchParams.set("redirect_uri", process.env.REDIRECT_URI!);
    githubURL.searchParams.set("scope", "read:user user:email");
    githubURL.searchParams.set("state", state);

    const response = NextResponse.redirect(githubURL);

    response.cookies.set("oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 600,
    });

    return response;
}