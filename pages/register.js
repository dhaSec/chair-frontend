import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5000/api/users/register", { name, email, password });
        alert("Registration successful! Please login.");
        window.location.href = "/login";
    } catch (err) {
        alert("Registration failed");
    }
    };

    return (
    <div>
        <Navbar />
        <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 p-6 border rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3"
        />
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Register
        </button>
        </form>
    </div>
    );
}
