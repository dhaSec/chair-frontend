import { useDispatch } from "react-redux";
import { addToCart } from "@/store/store";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
    <div className="border p-4 rounded shadow bg-white">
    <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
    />
        <h2 className="text-lg font-bold mt-2">{product.name}</h2>
        <p className="text-gray-700">₹{product.price}</p>
        <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-3"
        >
        Add to Cart
        </button>
    </div>
    );
}
