import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "../../utils/cookies";
import { BsCart } from "react-icons/bs";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const incrementQty = (id) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.fk_product_id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.fk_product_id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.fk_product_id.price * item.count,
    0
  );
  const total = subtotal + 250;

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/products/cart/fetch`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 404) {
          setIsEmpty(true);
        } else if (response.status === 200) {
          setCartProducts(response.data.data);
          setIsEmpty(false);
        } else {
          toast.error('Unexpected response while loading cart products');
        }
      } catch (e) {
        setIsEmpty(true);
        console.log(e.response?.data?.message ?? 'Failed to load cart products');
      }
    };
    getCartProducts();
  }, [])

  return (
    <div className=" mx-auto p-8">
      {isEmpty ? (
        <div className=" flex gap-3 items-center">
           <span className="text-l font-semibold ">No Data</span>  <BsCart />
        </div>
      ) : (<div className="max-w-7xl mx-auto p-6 bg-gray-50">
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
      </div>)}
    </div>
  );
}

export default Cart;
