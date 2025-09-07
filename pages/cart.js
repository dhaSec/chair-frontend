import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@/store/store";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL; // Vercel-ready environment variable

    const handleCheckout = async () => {
    try {
        const orderData = {
        orderItems: cartItems.map((item) => ({
            product: item._id,
            qty: item.qty,
        })),
        totalPrice: total,
        };

      const token = Cookies.get("token"); // JWT token from login
        await axios.post(`${API_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
        });

        alert("✅ Order placed successfully!");
        dispatch(clearCart());
    } catch (err) {
        console.error(err);
        alert("❌ Checkout failed");
    }
    };

    return (
    <div>
        <Navbar />
        <h1 className="text-2xl text-center font-bold my-4">🛒 Your Cart</h1>
        <div className="p-6">
        {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
        ) : (
            <div>
            {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between p-3 border-b">
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    Remove
                </button>
                </div>
            ))}
            <div className="mt-4 flex justify-between">
                <p className="font-bold">Total: ₹{total}</p>
                <button
                onClick={handleCheckout}
                className="bg-green-500 text-white px-4 py-2 rounded"
                >
                Checkout
                </button>
            </div>
            </div>
        )}
        </div>
    </div>
    );
}
