import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("github_user");

    if (!userCookie) {
        redirect("/");
    }

    const user = JSON.parse(userCookie.value);

    return (
        <main className = "">

        </main>
    );
}