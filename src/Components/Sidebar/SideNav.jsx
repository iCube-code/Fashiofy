import logo from "../../assets/logo-1.jpeg";
import { NavLink, useLocation } from "react-router-dom";
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
import { useNavigate } from 'react-router-dom'

const SideNav = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const { handleOpen } = useContext(AuthContext);

  const [isExpand, setIsExpand] = useState(false);

  let isLoggedIn = getCookie("token") !== null;

  const user = getCookie('token') !== null ? jwtDecode(getCookie('token')) : null

  const handleExpand = () => setIsExpand(prev => !prev);

  function handleLogout() {
    setIsExpand(prev => !prev);
    deleteCookie('token');
  }

  function checkActive(path) {

    const urlPath = location.pathname + location.search

    if (urlPath === path) {
      return true
    }

    return false

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
          <span
            onClick={() => navigate('/products')}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive('/products') ? "bg-gray-800 text-white" : "hover:bg-gray-700"}`
            }
          >
            <RiGalleryView2 /> <span>All Products</span>
          </span>
          <span
            onClick={() => navigate('/products?category=mens')}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive('/products?category=mens') ? "bg-gray-800 text-white" : "hover:bg-gray-700"}`
            }
          >
            <GiCharacter /> <span>Mens</span>
          </span>
          <span
            onClick={() => navigate("/products?category=womens")}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/products?category=womens") ? "bg-gray-800 text-white" : "hover:bg-gray-700"}`
            }
          >
            <GrRestroomWomen /> <span>Womens</span>
          </span>
          <span
            onClick={() => navigate("/products?category=kids")}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/products?category=kids") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaChildReaching /> <span>Kids</span>
          </span>
          <span
            onClick={() => navigate("/products?category=accessories")}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/products?category=accessories") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaBoxOpen /> <span>Accessories</span>
          </span>
          <hr className="border-gray-700 my-3 mx-[-16px]" />
        </div>

        {/* Manage Section */}
        <div className="px-4">

          {user?.role === "Seller" && (
            <>
              <div className="flex items-center gap-3 py-2 cursor-pointer px-2 hover:bg-gray-700 rounded">
                <RxDashboard /> <span>Dashboard</span>
              </div>
              <span
                onClick={() => navigate("/manage-products")}
                className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/manage-products") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <TbBrandProducthunt /> <span>Products</span>
              </span>
              <span
                onClick={() => navigate("/reviews")}
                className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/reviews") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <MdOutlineReviews /> <span>Reviews</span>
              </span>
              <hr className="border-gray-700 my-3 mx-[-16px]" />
            </>
          )}

          {user?.role === "Admin" && (
            <>
              <span
                onClick={() => navigate("/users")}
                className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/users") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <FaRegUser /> <span>Users</span>
              </span>
              <hr className="border-gray-700 my-3 mx-[-16px]" />
            </>
          )}
        </div>

        {/* Options Section */}
        <div className="px-4">
          <span
            onClick={() => {
              if (!isLoggedIn) {
                handleOpen();
              } else {
                navigate('/Orders')
              }
            }}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/orders") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <BsCartCheckFill /> <span>Orders</span>
          </span>
          <span
            onClick={() => {
              if (!isLoggedIn) {
                handleOpen();
              } else {
                navigate('/Cart')
              }
            }}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/cart") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaShoppingCart />
            <span>Cart</span>
          </span>
          <span
            onClick={() => {
              if (!isLoggedIn) {
                handleOpen();
              } else {
                navigate('/wishlist')
              }
            }}
            className={`flex items-center gap-3 py-2 px-2 rounded transition-colors cursor-pointer ${checkActive("/wishlist") ? "bg-gray-800 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <FaHeart />
            <span>Wishlist</span>
          </span>
        </div>
      </div>

      {/* User Section */}

      <div className="p-4 border-t border-gray-700">
        {user !== null ? (
          <div className=" relative flex justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                {user.avatar ? (
                  <img
                    src={user?.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="capitalize">{user?.userName.charAt(0) + user?.userName.split(' ')[1].charAt(0)}</span>
                )}
              </div>
              <span className="text-sm font-medium truncate capitalize">{user.userName}</span>
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
                <div className="absolute bottom-8 -right-2 mt-1 bg-white shadow-md rounded-lg z-10 py-1 px-3"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div>
                    <button onClick={handleLogout} className="text-sm py-1 px-2 text-start rounded-lg font-semibold text-gray-600 cursor-pointer hover:text-black">
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
