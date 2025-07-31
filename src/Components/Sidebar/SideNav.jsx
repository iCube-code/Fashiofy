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
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getCookie, deleteCookie } from "../../utils/cookies";
import { jwtDecode } from 'jwt-decode';
import { RiGalleryView2 } from "react-icons/ri";

const SideNav = () => {

  const { handleOpen } = useContext(AuthContext);
  const [isExpand, setIsExpand] = useState(false);
  let isLoggedIn = getCookie("token") !== null;


  const user = getCookie('token') !== null ? jwtDecode(getCookie('token')) : null
  const handleExpand = () => setIsExpand(prev => !prev);
  function handleLogout() {
    setIsExpand(prev => !prev);
    deleteCookie('token');
  }
  return (
    <div className="w-56 h-screen bg-black text-white flex flex-col justify-between mb-1 overflow-y-auto">
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
            <RiGalleryView2 /> <span>All Products</span>
          </NavLink>
          <NavLink
            to="/products?category=mens"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <GiCharacter /> <span>Mens</span>
          </NavLink>
          <NavLink
            to="/products?category=womens"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <GrRestroomWomen /> <span>Womens</span>
          </NavLink>
          <NavLink
            to="/products?category=kids"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaChildReaching /> <span>Kids</span>
          </NavLink>
          <NavLink
            to="/products?category=accessories"
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
                to="/manage-products"
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
            to={isLoggedIn ? "/Orders" : ""}
            onClick={() => {
              if (!isLoggedIn) {
                handleOpen();
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <BsCartCheckFill /> <span>Orders</span>
          </NavLink>
          <NavLink
            to= {isLoggedIn ? "/Cart" : ""}
             onClick={() => {
              if (!isLoggedIn) {
                handleOpen();
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaShoppingCart />
            <span>Cart</span>
          </NavLink>
          <NavLink
            to= {isLoggedIn ? "/wishlist" : ""}
             onClick={() => {
              if (!isLoggedIn) {
                handleOpen();
              }
            }}
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
          <div className=" relative inline-flex flex justify-between gap-5">
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
            <div className=" relative inline-flex">
              <button
                onClick={handleExpand}
                id="hs-dropdown-custom-icon-trigger"
                type="button"
                className=" flex justify-center items-center font-semibold  border-0 cursor-pointer "
                aria-haspopup="menu"
                aria-expanded={isExpand}
                aria-label="Dropdown">
                <svg className="flex-none size-4 text-gray-400 hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
              </button>
              {isExpand ? (
                <div className="absolute bottom-8 right-0 mt-1 bg-white shadow-md rounded-lg z-10"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div>
                    <button onClick={handleLogout} className="text-sm py-1 px-2 text-start rounded-lg font-semibold text-gray-600 cursor-pointer hover:text-black font-bold">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (<div></div>)
              }
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-3 justify-between relative">
            <button
              onClick={handleOpen}
              className=" px-4 py-2 w-full bg-blue-600 text-white font-semibold cursor-pointer rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
