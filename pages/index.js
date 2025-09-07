import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use env variable

    useEffect(() => {
    axios.get(`${API_URL}/api/products`)
        .then(res => setProducts(res.data))
        .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
    <div>
        <Navbar />
        <h1 className="text-3xl text-center mt-4 font-bold">Our Chairs</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {products.length > 0 ? (
            products.map(product => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p className="text-center text-gray-500 col-span-3">No products found</p>
        )}
        </div>
    </div>
    );
}
