import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: ""
    });

    const token = Cookies.get("token");

    useEffect(() => {
    if (!token) {
                window.location.href = "/login";
    } else {
        fetchProducts();
        fetchOrders();
    }
    }, []);

    const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
    };

    const fetchOrders = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
    } catch (err) {
        console.error("Not admin or unauthorized");
    }
    };

    const addProduct = async () => {
    try {
        await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
        setNewProduct({ name: "", description: "", price: "", category: "", image: "", stock: "" });
    } catch (err) {
        alert("Only admin can add products");
    }
    };

    const deleteProduct = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
    } catch (err) {
        alert("Only admin can delete products");
    }
    };

    return (
    <div>
        <Navbar />
        <h1 className="text-2xl font-bold text-center mt-4">⚙️ Admin Dashboard</h1>

      {/* Add Product Form */}
        <div className="max-w-md mx-auto mt-6 p-4 border rounded bg-white">
        <h2 className="font-bold mb-3">Add New Product</h2>
        <input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border p-2 w-full mb-2"/>
        <input placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="border p-2 w-full mb-2"/>
        <input placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="border p-2 w-full mb-2"/>
        <input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="border p-2 w-full mb-2"/>
        <input placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="border p-2 w-full mb-2"/>
        <input placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="border p-2 w-full mb-2"/>
        <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>

      {/* Product List */}
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Products</h2>
        <div className="grid grid-cols-3 gap-4 p-6">
        {products.map((product) => (
            <div key={product._id} className="border p-3 rounded bg-gray-100">
            <p><b>{product.name}</b></p>
            <p>₹{product.price}</p>
            <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
            </div>
        ))}
        </div>

      {/* Orders List */}
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Orders</h2>
        <div className="p-6">
        {orders.length === 0 ? (
            <p>No orders yet</p>
        ) : (
            orders.map((order) => (
            <div key={order._id} className="border p-3 mb-3 rounded bg-white">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>User:</b> {order.user?.name} ({order.user?.email})</p>
                <p><b>Total:</b> ₹{order.totalPrice}</p>
                <p><b>Status:</b> {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
            ))
        )}
        </div>
    </div>
    );
}
