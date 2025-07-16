import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

function ProductCard({ products, type, incrementQty, decrementQty, onAddToCart }) {
  return (
    <div>
      {products.map((product) => (
        <div
          key={product._id}
          className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b py-4"
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

          {/* Total or Add to Cart */}
          <div className="text-gray-800 text-sm sm:text-lg font-medium">
            ₹{product.count * parseInt(product.fk_product_id.price)}
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
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
