import React, { useState } from "react";
import { fashiofyData } from "../../data/index";
import ProductCard from "../ProductCard";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    fashiofyData.filter((product) => product.inCart)
  );

  const incrementQty = (id) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const subtotal = cartProducts.reduce(
    (acc,item) =>acc + item.price * item.qty,
    0
  );
  const total = subtotal+250;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-4/6 bg-white p-6 rounded-2xl shadow-md">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr] font-semibold border-b pb-3 text-gray-700 text-sm sm:text-base">
            <div>Item</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
          <ProductCard
            type="cart"
            products={cartProducts}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
        </div>
        <div className="w-full lg:w-2/6 bg-white p-6 rounded-2xl shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          <div className="grid grid-cols-[3fr_1fr] text-gray-700 font-semibold border-b pb-3 mb-4">
            <div>Subtotal</div>
            <div className="text-right">₹ {subtotal}</div>
          </div>
          <div className="grid grid-cols-[3fr_1fr] text-gray-700 font-semibold border-b pb-3 mb-4">
            <div>Total <br />
              <span>(Include All taxes)</span>
            </div>
            <div className="text-right">₹ {total}</div>
          </div>
          <p className="mb-5">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
          <button className="bg-[#FF6F61] text-white font-semibold py-3 rounded-full w-full hover:bg-[#e15d51] transition cursor-pointer">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
