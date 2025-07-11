import { useState, useContext, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Filter from "./Filter";

import { AuthContext } from "../../context/AuthContext";
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
function Products() {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);
  // console.log(products);

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
      toast.error(e.response.data.message ?? "Failed to add to cart");
    }
  };

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
        const  response  = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/products/all`
        );

        if (response.status === 200) {
         
          setProducts(response.data.data);
          
        } else {
          toast.error('Unexpected response while loading products');
        }
      } catch (e) {
        toast.error(e.response?.data?.message ?? 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  function discount(price,originalPrice){
      const dis = (price/originalPrice)*100;
      return dis.toFixed(0);
  }

  return (
    <div className=" mx-auto p-4">
      <div className="flex items-center justify-between text-center">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <span className="text-2xl font-medium mb-6">
          <Filter />
        </span>
      </div>
      {Loading ? (
        <div role="status" className="items-center flex justify-center">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
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
                    if (isLoggedIn && !product.wishList) {
                      // Add to wishlist
                      handleAddToWishlist(product.id);
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
                    ₹{product.originalPrice}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                   {discount(product.price,product.originalPrice)}% OFF
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
                    handleAddToCart(product.id);
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