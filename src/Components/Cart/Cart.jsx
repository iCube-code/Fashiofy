import React, { useState } from "react";
import { fashiofyData } from "../../data/index";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

function Cart() {
  const [wishlistProducts, setWishlistProducts] = useState(
    fashiofyData.filter((product) => product.wishList)
  );

  const incrementQty = (id) => {
    const updatedProducts = wishlistProducts.map((product) =>
      product.id === id ? { ...product, qty: product.qty + 1 } : product
    );
    setWishlistProducts(updatedProducts);
  };

  const decrementQty = (id) => {
    const updatedProducts = wishlistProducts.map((product) =>
      product.id === id && product.qty > 1
        ? { ...product, qty: product.qty - 1 }
        : product
    );
    setWishlistProducts(updatedProducts);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>
      <div className="flex lg:flex-row gap-8 ">
        {/* Left: Cart Items */}
        <div className="w-full lg:w-4/6 bg-white p-6 rounded-2xl shadow-md">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr] font-semibold border-b pb-3 text-gray-700 text-sm sm:text-base">
            <div>Item</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>

          {fashiofyData.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b py-4"
            >
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={product.imgURIs}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm sm:text-base">
                    {product.brand}
                  </div>
                  <div className="text-gray-700 text-sm">{product.name}</div>
                </div>
              </div>
              <div className="text-gray-800 text-sm sm:text-lg">
                ₹{product.price}
              </div>
              <div>
                <div className="flex items-center ">
                  <button
                    className="text-xl cursor-pointer "
                    onClick={() => decrementQty(product.id)}
                  >
                    <CiCircleMinus className="text-2xl text-[#d49b6d]" />
                  </button>
                  <span className="px-2">{product.qty}</span>
                  <button
                    className="text-xl cursor-pointer "
                    onClick={() => incrementQty(product.id)}
                  >
                    <CiCirclePlus className="text-[#d49b6d] text-2xl " />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="text-gray-800 text-sm sm:text-lg font-medium">
                ₹{product.qty * parseInt(product.price)}
              </div>
            </div>
          ))}
          </div>
          {/* Right: Order Summary */}
          <div className="w-full lg:w-2/6 bg-white p-6 rounded-2xl shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>
            <div className="grid grid-cols-[3fr_1fr] text-sm sm:text-base text-gray-700 font-semibold border-b pb-3 mb-4">
              <div>Product</div>
              <div className="text-right">Price</div>
            </div>
            <div className="grid grid-cols-[3fr_1fr] text-sm sm:text-base text-gray-700 font-semibold border-b pb-3 mb-4">
              <div>Subtotal</div>
              <div className="text-right">₹ 5000</div>
            </div>
            <div className="grid grid-cols-[3fr_1fr] text-sm sm:text-base text-gray-700 font-semibold border-b pb-3 mb-4">
              <div>Total</div>
              <div className="text-right">₹ 8500</div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
            <button className="bg-[#FF6F61] text-white font-semibold py-3 rounded-full w-full hover:bg-[#e15d51] transition cursor-pointer">
              PLACE ORDER
            </button>
          </div>
      </div>
    </div>
  );
}

export default Cart;
