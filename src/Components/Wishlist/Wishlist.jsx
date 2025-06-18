import React, { useState } from "react";
import { fashiofyData } from "../../data/index";

function Wishlist() {
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
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] font-semibold border-b pb-3 text-gray-700 text-sm sm:text-base">
        <div>Item</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
      </div>
      {fashiofyData.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center border-b py-4"
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
            <div className="inline-flex border rounded items-center">
              <button
                className="px-2 text-lg cursor-pointer"
                onClick={() => decrementQty(product.id)}
              >
                -
              </button>
              <span className="px-3">{product.qty}</span>
              <button
                className="px-2 text-lg cursor-pointer"
                onClick={() => incrementQty(product.id)}
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="text-gray-800 text-sm sm:text-lg font-medium">
            ₹{product.qty * parseInt(product.price)}
          </div>
          <div className="flex">
            <button className=" p-3 rounded-xl bg-[#d49b6d] text-white cursor-pointer">Add To Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
