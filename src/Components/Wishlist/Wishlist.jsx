import React, { useState } from "react";
import { fashiofyData } from "../../data/index";
import ProductCard from "../ProductCard";

function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState(
    fashiofyData.filter((product) => product.wishList)
  );

  const incrementQty = (id) => {
    setWishlistProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setWishlistProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

 const handleAddToCart = (product) => {
  if (product.inCart === true) {
    alert("Item already in cart");
  } else {
    product.inCart = true;
    alert(`${product.name} added to cart!`);
  }
};


  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] font-semibold border-b pb-3 text-gray-700 text-sm sm:text-base">
          <div>Item</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        <ProductCard
          type="wishlist"
          products={wishlistProducts}
          incrementQty={incrementQty}
          decrementQty={decrementQty}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default Wishlist;
