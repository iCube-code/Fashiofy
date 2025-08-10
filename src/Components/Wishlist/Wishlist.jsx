import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { getCookie } from "../../utils/cookies";
import axios from "axios";
import { toast } from "react-toastify";
import { BsCart } from "react-icons/bs";


function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleAddToCart = (product) => {
     console.log("Product received:", product);

    if (product.inCart === true) {
      alert("Item already in cart");
    } else {
      product.inCart = true;
      alert(`${product.fk_product_id.name} added to cart!`);
    }
  };
  useEffect(() => {
    const getWishlistProducts = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/products/wishlist/fetch`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 404) {
          setIsEmpty(true);
        } else if (response.status === 200) {
          setWishlistProducts(response.data.data);
          setIsEmpty(false);
        } else {
          toast.error("Unexpected response while loading whishlist products");
        }
      } catch (e) {
        setIsEmpty(true);
        console.error("Error fetching wishlist products:", e);
      }
    };

    getWishlistProducts();
  }, []);
  return (
    <div className="mx-auto p-8">
      {isEmpty ? (
        <div className="flex gap-3 items-center">
          <span className="text-l font-semibold">No Data</span>
          <BsCart />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50">
          <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="grid grid-cols-[3fr_1fr_1fr_1fr] font-semibold border-b pb-3 text-gray-700 text-sm sm:text-base">
              <div>Item</div>
              <div>Price</div>
              <div>Total</div>
            </div>
            <ProductCard
              type="wishlist"
              products={wishlistProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
