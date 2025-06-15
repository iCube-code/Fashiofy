import React, { useState } from 'react';
import logo from '../../assets/logo-1.jpeg';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
import { FaRegUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiCharacter } from "react-icons/gi";
import { GrRestroomWomen } from "react-icons/gr";
import { FaChildReaching, FaBoxOpen } from "react-icons/fa6";

const SideNav = () => {

    const [user, setUser] = useState({ name: "Devika" });

    return (
        <div className='w-56 h-screen bg-black text-white flex flex-col justify-between mb-1'>
            {/* Logo */}
            <div className='p-4 border-b border-zinc-700'>
                <Link to='/'>
                <img src={logo} alt="Logo" className='w-40 mx-auto' />
                </Link>
            </div>

            {/* Nav Sections */}
            <div className='flex-1'>

                {/* Menu Section */}
                <div className='px-4 pt-4'>
                    <a href='Mens' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <GiCharacter /> <span>Mens</span>
                    </a>
                    <a href='Womens' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <GrRestroomWomen /> <span>Womens</span>
                    </a>
                    <a href='Kids' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <FaChildReaching /> <span>Kids</span>
                    </a>
                    <a href='Accessories' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <FaBoxOpen /> <span>Accessories</span>
                    </a>
                </div>

                <hr className='border-gray-700 my-3 mx-4' />

                {/* Manage Section */}
                <div className='px-4'>
                    <div className='flex items-center gap-3 py-2 cursor-pointer px-2 hover:bg-gray-700 rounded'>
                        <RxDashboard /> <span>Dashboard</span>
                    </div>
                    <Link to="/products"  className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <TbBrandProducthunt /> <span>Products</span>
                    </Link>
                    <a href='Reviews' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <MdOutlineReviews /> <span>Reviews</span>
                    </a>
                    <a href='Users' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <FaRegUser /> <span>Users</span>
                    </a>
                </div>

                <hr className='border-gray-700 my-3 mx-4' />

                {/* Options Section */}
                <div className='px-4'>
                    <a href='/profile' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <BsCartCheckFill /> <span>Orders</span>
                    </a>
                    <a href='/' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2 relative'>
                        <FaShoppingCart /> <span>Cart</span></a>
                    <a href='/products' className='flex items-center gap-3 py-2 hover:bg-gray-700 rounded px-2'>
                        <FaHeart /> <span>Wishlist</span>
                    </a>
                </div>
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-gray-700">
                {user?.name ? (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                            {user.avatar ? (
                                <img
                                    src={user?.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <span>{user?.name.charAt(0)}</span>
                            )}
                        </div>
                        <span className="text-sm font-medium truncate">{user.name}</span>
                    </div>
                ) : (
                    <button
                        className="text-white cursor-pointer hover:underline"
                        onClick={() => console.log('Login Clicked')}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default SideNav;
