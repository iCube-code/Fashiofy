import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { getCookie } from "../../utils/cookies";
import { BsCart } from "react-icons/bs";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/products/orders/fetch`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 404) {
          setIsEmpty(true);
        } else if (response.status === 200) {
          setOrders(response.data.data);
          setIsEmpty(false);
        } else {
          toast.error('Unexpected response while loading order products');
        }
      } catch (e) {
        setIsEmpty(true);
        console.log(e.response?.data?.message ?? 'Failed to load order products');
      }
    };
    getOrders();
  }, []);

  return (
    <div className="mx-auto p-8">
      {isEmpty ? (
        <div className="flex gap-3 items-center">
          <span className="text-l font-semibold">No Data</span>
          <BsCart />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 ">
          <h1 className="text-3xl font-bold mb-8">Orders</h1>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] font-semibold border-b pb-3 text-gray-700 text-sm sm:text-base">
              <div>Item</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Review</div>
            </div>
            <ProductCard
              type="orders"
              products={orders}
            />
          </div>
        </div>)}
    </div>

  );
}

export default Orders;