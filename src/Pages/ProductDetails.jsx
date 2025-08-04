import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookies";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { handleOpen } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/products/${id}`
        );
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to Load product", err)
        toast.error("Something went wrong");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!getCookie("token")) {
      handleOpen();
      return;
    }

    try {
      const token = getCookie("token");
      const userId = jwtDecode(token).id;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/products/cart/add`,
        { productId: product._id, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast.success("Added to cart!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message ?? "Failed to add to cart");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-96">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
      <div className="hidden lg:flex lg:w-0.5/6  sticky top-4 flex-col gap-4">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`h-24 w-fit object-contain rounded-md cursor-pointer border-2 ${index === selectedImageIndex
              ? "border-blue-600"
              : "border-gray-200"
              }`}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>

      <div className="lg:w-2/5 w-full">
        <img
          src={product.images[selectedImageIndex]}
          alt="main"
          className="w-fit object-contain rounded-lg"
        />
        <div className="flex lg:hidden gap-3 overflow-x-auto mt-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`h-20 w-20 object-cover rounded-md cursor-pointer flex-shrink-0 border-2 ${index === selectedImageIndex
                ? "border-blue-600"
                : "border-gray-200"
                }`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-sm text-gray-500 uppercase font-semibold">
            {product.brand}
          </h2>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">
            {product.name}
          </h1>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 font-semibold">
            ★ {product.rating}
          </span>
          <span className="text-sm text-gray-600">
            ({product.reviews} Reviews)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-xl font-bold text-green-700">
            ₹{product.price}
          </span>
          <span className="text-sm line-through text-gray-500">
            ₹{product.originalPrice}
          </span>
          <span className="text-sm font-semibold text-red-600">
            {((1 - product.price / product.originalPrice) * 100).toFixed(0)}%
            OFF
          </span>
        </div>

        <button
          className="mb-6 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md text-md font-medium transition-all duration-200 cursor-pointer"
          onClick={handleAddToCart}
        >
          🛒 Add to Cart
        </button>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Product Description</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">Ravi</p>
                  <div className="flex text-yellow-500 text-sm">
                    <span>★ ★ ★ ★ ☆</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Reviewed on July 5, 2025
                </p>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Nice product! Build quality feels premium. Worth the price.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border border-gray-200 p-4 rounded-md shadow-sm bg-gray-50">
              <div className="w-10 h-10  bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">Suresh</p>
                  <div className="flex text-yellow-500 text-sm">
                    <span>★ ★ ★ ★ ★</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Reviewed on July 2, 2025
                </p>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  Quality was great 👌 Delivery was fast. Satisfied with the
                  product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
