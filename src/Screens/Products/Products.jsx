import { useState, useContext, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
function Products() {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);

  const { handleOpen } = useContext(AuthContext);

  let isLoggedIn = getCookie("token") !== null;

  const toggleWishlist = (id) => {
    const updatedProducts = products.map((product) =>
      product._id === id
        ? { ...product, wishListed: !product.wishListed }
        : product
    );

    setProducts(updatedProducts);
  };

  // ADD TO CART
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
      toast.error(e.response.data.message ?? "Failed to add to cart");
    }
  };

  // ADD TO WISHLIST
  const handleAddToWishlist = async (productId) => {
    try {
      const token = getCookie("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/products/wishlist/add`,
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
        toast.success("Product added to wishlist successfully");
      }
    } catch (e) {
      toast.error(e.response.data.message ?? "Failed to add to wishlist");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/products/all`
        );

        if (response.status === 200) {
          setProducts(response.data.data);
        } else {
          toast.error("Unexpected response while loading products");
        }
      } catch (e) {
        toast.error(e.response?.data?.message ?? "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  function discount(price, originalPrice) {
    const dis = (price / originalPrice) * 100;
    return dis.toFixed(0);
  }

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className=" mx-auto p-4">
      <div className="flex items-center justify-between text-center">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <span className="text-2xl font-medium mb-6">
          <Filter />
        </span>
      </div>
      {Loading ? (
        <div className="flex justify-center items-center h-96">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-lg">No Products been added</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.images?.[0] ?? "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      handleOpen(); // Show login popup
                    }
                    if (isLoggedIn && product.wishList === false) {
                      // Add to wishlist
                      handleAddToWishlist(product._id);
                      toggleWishlist(product._id);
                    } else {
                      // Remove Product from wishlist
                      // toggleWishlist(product._id);
                    }
                  }}
                  className="absolute top-2 right-2 text-xl text-red-500 z-10 cursor-pointer"
                >
                  {product.wishListed ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div
                className="mt-4 space-y-1 flex-1 flex flex-col justify-between cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
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
                    ₹{product.originalPrice}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    {discount(product.price, product.originalPrice)}% OFF
                  </p>
                </div>
              </div>

              <button
                className="mt-4 bg-black text-white py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition text-sm"
                onClick={() => {
                  if (!isLoggedIn) {
                    handleOpen(); // Show login popup
                  }
                  if (isLoggedIn) {
                    // Add to cart logic here
                    handleAddToCart(product._id);
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Products;
