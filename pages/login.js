import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
        Cookies.set("token", res.data.token);
        alert("Login successful!");
        window.location.href = "/";
    } catch (err) {
        alert("Login failed");
    }
    };

    return (
    <div>
        <Navbar />
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-6 border rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3"
        />
        <input 
        type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
        </button>
        </form>
    </div>
    );
}
