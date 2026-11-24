import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "./profile.css";
export const instant = false;

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("github_user");

    if (!userCookie) {
        redirect("/");
    }

    const user = JSON.parse(userCookie.value);

    return (
        <main className = "profile-page">
            <div className = "profile-card">
                <img
                    src = {user.avatar_url}
                    alt = "GitHub profile"
                    className = "profile-image"
                />
                <h1 className = "profile-name">
                    Welcome, {user.name || user.login}!
                </h1>
                <p className = "profile-username">
                    @{user.login}
                </p>
                <p className = "profile-success">
                    Successfully authenticated with Github.
                </p>
            </div>
        </main>
    );
}