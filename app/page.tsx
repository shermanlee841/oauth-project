import "./page.css";

export default function Home() {
    return (
        <main className = "home-page">
            <div className = "home-card">
                <h1>OAuth Authentication</h1>
                <p>
                  Sign in with Github to view your profile information.
                </p>
                <a href = "/api/auth/login" className = "login-button">Login with GitHub</a>
            </div>
        </main>
    );
}