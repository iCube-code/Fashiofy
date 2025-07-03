import { useState, useContext } from "react";
import { fashiofyData } from "../../data/index";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Filter from "./Filter";

import { AuthContext } from "../../context/AuthContext";
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
function Products() {
  const [products, setProducts] = useState(fashiofyData);
  const { handleOpen } = useContext(AuthContext);

  let isLoggedIn = getCookie("token") !== null;

  const toggleWishlist = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, wishList: true } : product
    );

    setProducts(updatedProducts);
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = getCookie("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/products/cart/add`,
        {
          productId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added to cart successfully");
      }
    } catch (e) {
      console.log('ERROR ADD TO CART: ',e);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className=" mx-auto p-4">
      <div className="flex items-center justify-between text-center">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <span className="text-2xl font-medium mb-6">
          <Filter />
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
              <img
                src={product.imgURIs}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    handleOpen(); // Show login popup
                  }
                  if (isLoggedIn) {
                    toggleWishlist(product.id);
                  }
                }}
                className="absolute top-2 right-2 text-xl text-red-500 z-10 cursor-pointer"
              >
                {product.wishList ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <div className="mt-4 space-y-1 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm text-gray-500 font-semibold">
                  {product.brand}
                </h2>
                <h3 className="text-base font-medium text-gray-900">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm mt-1 text-yellow-600">
                <span>{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews} Reviews)
                </span>
              </div>

              <div className="mt-2">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{product.price}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ₹{product.MRP}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  {product.discount}% OFF
                </p>
              </div>
            </div>

            <button
              className="mt-4 bg-black text-white py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition text-sm"
              onClick={() => {
                // if (!isLoggedIn) {
                //   handleOpen(); // Show login popup
                // }
                // if (isLoggedIn) {
                //   // Add to cart logic here

                //   console.log(`Added ${product.name} to cart`);
                // }
                handleAddToCart(product.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
