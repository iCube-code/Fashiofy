import logo from "../../assets/logo-1.jpeg";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
import { FaRegUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiCharacter } from "react-icons/gi";
import { GrRestroomWomen } from "react-icons/gr";
import { FaChildReaching, FaBoxOpen } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from 'jwt-decode'

const SideNav = () => {

  const { handleOpen } = useContext(AuthContext);

  const user = getCookie('token') !== null ? jwtDecode(getCookie('token')) : null

  return (
    <div className="w-56 h-screen bg-black text-white flex flex-col justify-between mb-1">
      {/* Logo */}
      <div className="p-4 border-b border-zinc-700">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-40 mx-auto" />
        </NavLink>
      </div>

      {/* Nav Sections */}
      <div className="flex-1">
        {/* Menu Section */}
        <div className="px-4 pt-4">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <GiCharacter /> <span>Mens</span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <GrRestroomWomen /> <span>Womens</span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaChildReaching /> <span>Kids</span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaBoxOpen /> <span>Accessories</span>
          </NavLink>
          <hr className="border-gray-700 my-3 mx-[-16px]" />
        </div>

        {/* Manage Section */}
        <div className="px-4">

          {user?.role === "Seller" && (
            <>
              <div className="flex items-center gap-3 py-2 cursor-pointer px-2 hover:bg-gray-700 rounded">
                <RxDashboard /> <span>Dashboard</span>
              </div>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <TbBrandProducthunt /> <span>Products</span>
              </NavLink>
              <NavLink
                to="/Reviews"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <MdOutlineReviews /> <span>Reviews</span>
              </NavLink>
              <hr className="border-gray-700 my-3 mx-[-16px]" />
            </>
          )}

          {user?.role === "Admin" && (
            <>
              <NavLink
                to="/Users"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <FaRegUser /> <span>Users</span>
              </NavLink>
              <hr className="border-gray-700 my-3 mx-[-16px]" />
            </>
          )}
        </div>

        {/* Options Section */}
        <div className="px-4">
          <NavLink
            to="/Orders"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <BsCartCheckFill /> <span>Orders</span>
          </NavLink>
          <NavLink
            to="/Cart"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaShoppingCart />
            <span>Cart</span>
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaHeart />
            <span>Wishlist</span>
          </NavLink>
        </div>
      </div>

      {/* User Section */}

      <div className="p-4 border-t border-gray-700">
        {user !== null ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
              {user.avatar ? (
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span>{user?.userName.charAt(0)}</span>
              )}
            </div>
            <span className="text-sm font-medium truncate">{user.userName}</span>
          </div>
        ) : (
          <button
            onClick={handleOpen}
            className="mt-6 px-6 py-3 w-full bg-blue-600 text-white font-semibold cursor-pointer rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        )}
      </div>


    </div>
  );
};

export default SideNav;
