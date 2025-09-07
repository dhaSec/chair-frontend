import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
    <div>
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="mb-2">₹{product.price}</p>
        <p className="mb-2">{product.description}</p>
        </div>
    </div>
    );
}
