import Link from "next/link";
import Cookies from "js-cookie";

export default function Navbar() {
    const token = Cookies.get("token");

    const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
    };

    return (
    <nav className="flex justify-between p-4 bg-black text-white">
        <Link href="/">🪑 Corporate Chairs</Link>
        <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/admin/dashboard">Admin</Link>
        {!token ? (
            <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            </>
        ) : (
            <button onClick={handleLogout}>Logout</button>
        )}
        </div>
    </nav>
    );
}
