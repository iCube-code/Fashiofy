import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
import React, { useState } from "react";
import './CommentBox.css'
import { TextField } from '@mui/material';
import axios from "axios";
import { toast } from 'react-toastify';
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from "jwt-decode";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

function ProductCard({ products, type, incrementQty, decrementQty, onAddToCart }) {
  const [dropDown, setdropDown] = useState(null)
  const [comment, setComment] = useState({})
  const [rating, setRating] = useState({})

  function handleDropDown(productId) {
    setdropDown(prev => prev === productId ? null : productId)
  }

  const gridCols =
    type === "orders"
      ? "grid-cols-[3fr_1fr_1fr_1fr_1fr]"
      : "grid-cols-[3fr_1fr_1fr_1fr]";

  const handleSubmitt = async (productId) => {
    try {
      const token = getCookie("token");
      const userId = jwtDecode(token).id;
      const reviewComment = comment[productId] || "";
      const reviewRating = Number(rating[productId]);
      const result = await axios.post(`${BACKEND_URI}/products/review`, {
        userId,
        productId,
        rating: reviewRating,
        comment: reviewComment
      });
      if (result.status  === 200) {
        toast.info(result.data.message || "Review updated successfully");
        setdropDown(prev => prev === productId ? null : productId);
        setComment({});
        setRating({});

      } else if (result.status  === 201) {
        toast.info(result.data.message || "Review added successfully");
        setdropDown(prev => prev === productId ? null : productId);
        setComment({});
        setRating({});

      }
    } catch (err) {
      toast.error("something went wrong", err);
    }
  }
  return (
    <div>
      {products.map((product) => (
        <div
          key={product._id}
          className={`grid ${gridCols} items-center border-b py-4 product-row`}
        >
          {/* Product Info */}
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.images?.[0] ?? "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm sm:text-base">
                {product.fk_product_id.brand}
              </div>
              <div className="text-gray-700 text-sm">{product.fk_product_id.name}</div>
            </div>
          </div>

          {/* Price */}
          <div className="text-gray-800 text-sm sm:text-lg">
            ₹{product.fk_product_id.price}
          </div>

          {/* Quantity */}
          <div>
            {
              type === "cart" ? (
                <div>
                  <div className="flex items-center">
                    <button
                      className="text-xl cursor-pointer"
                      onClick={() => decrementQty(product.fk_product_id)}
                    >
                      <CiCircleMinus className="text-2xl text-[#d49b6d]" />
                    </button>
                    <span className="px-2">{product.count}</span>
                    <button
                      className="text-xl cursor-pointer"
                      onClick={() => incrementQty(product.fk_product_id)}
                    >
                      <CiCirclePlus className="text-[#d49b6d] text-2xl" />
                    </button>
                  </div>
                </div>
              ) : type === "orders" ? (
                <div className="flex items-center justify-center h-full">
                  <span className="px-2">{product.count}</span>
                </div>
              ) : null
            }
          </div>

          {/* Total or Add to Cart */}
          <div className="text-gray-800 text-sm sm:text-lg font-medium">
            {type === "wishlist" ? (<div>
              ₹{product.fk_product_id.price}
            </div>) : (<div>
              ₹{product.count * parseInt(product.fk_product_id.price)}
            </div>)}
            {type === "wishlist" && (
              <div className="mt-2">
                <button
                  className="bg-[#d49b6d] text-white py-1 px-3 rounded cursor-pointer"
                  onClick={() => onAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            )}
          </div>

          {/* CommentBox */}
          {(type === "orders") && (
            <div className='review-icon flex justify-center items-center h-full'>
              <i><MdOutlineRateReview size={25} onClick={() => handleDropDown(product._id)} /></i>
              {dropDown === product._id && (
                <div className='dropdown-box'>
                  <form className="max-w-sm mx-auto">
                    <label htmlFor="numbers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Give a rating</label>
                    <select id="numbers"
                      value={rating[product._id] || ""}
                      onChange={(e) => setRating(prev => ({
                        ...prev,
                        [product._id]: e.target.value
                      }))}
                      size="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </form>
                  <div className='comment-box'>
                    <TextField
                      className='comment-box-textfield'
                      type='text'
                      variant='outlined'
                      multiline rows={4}
                      value={comment[product._id] || ''}
                      onChange={(e) => setComment(prev => ({
                        ...prev,
                        [product._id]: e.target.value
                      }))}
                      margin='dense'
                      placeholder='Write the comment'
                      fullWidth
                    />
                    <button onClick={() => handleSubmitt(product._id)} className='comment-box-button'>Submit</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}


    </div>
  );
}

export default ProductCard;
