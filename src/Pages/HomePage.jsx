import React, { Suspense} from "react";
import HoodieCanvas from "../Components/Model_3D/HoodieCanvas";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate()

  function handleNavigateProducts(){
    navigate('/products')
  }

  return (

    <div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 md:px-12 lg:px-24 py-16 gap-10">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Next-Gen Shopping Experience
          </h1>
          <p className="text-lg md:text-xl mt-4 text-gray-600">
            Discover trendsetting products, seamless design, and a fully immersive
            shopping journey crafted just for you.
          </p>
          <button
            onClick={handleNavigateProducts}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold cursor-pointer rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Shop Now
          </button>
        </div>

        {/* 3D Model Section */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[500px]">
          <Suspense fallback={<div>Loading...</div>}>
            <HoodieCanvas />
          </Suspense>
        </div>
        {/*home screen-product categories*/}
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 flex flex-row p-2 bg-black  justify-between">
          <div className="flex flex-col-reverse lg:flex-row items-center m-2 p-4 rounded bg-white justify-between gap-4 overflow-hidden">
            <div className="my-2">
              <h4 className="text-red-500 font-semibold py-2">MENS</h4>
              <p className=" text-l">Fashionable Ethnic wear</p>
              <div className="mt-12 hover:underline text-blue-800">
                <NavLink to="/products">
                  <span className=" text-blue-800 text-sm">View all </span>
                </NavLink>
              </div>
            </div>
            <div >
              <img src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/z/4/w/l-31677849-here-now-original-imahbk8judgjq6hp.jpeg?q=70&crop=false" alt="image1"
                className="w-50 h-50 "
              />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-center m-2 p-4 rounded bg-white justify-between gap-4 overflow-hidden">
            <div className=" my-2">
              <h4 className="text-red-500 font-semibold py-2">WOMENS</h4>
              <p className=" text-l">Fashionable kurtis wear</p>
              <div className="mt-12 hover:underline text-blue-800">
                <NavLink to="/products">
                  <span className="text-blue-800 text-sm">View all </span>
                </NavLink>
              </div>
            </div>
            <div >
              <img src="https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/o/g/h/xl-dp313-saloni-creation-original-imah38hcdghdqvcg.jpeg?q=70&crop=false" alt="image2"
                className="w-50 h-50"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-center m-2 p-4 rounded bg-white justify-between gap-4 overflow-hidden">
            <div className=" my-2">
              <h4 className="text-red-500 font-semibold py-2">SHOES</h4>
              <p className=" text-l">Trending style sneakers </p>
              <div className="mt-12 hover:underline text-blue-800">
                <NavLink to="/products">
                  <span className=" text-blue-800 text-sm">View all </span>
                </NavLink>
              </div>
            </div>
            <div >
              <img src="https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/i/d/w/8-8545-8-killer-sea-green-original-imah7spdwsy3zete.jpeg?q=70&crop=false" alt="image3"
                className="w-50 h-50"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-center m-2 p-4 rounded bg-white justify-between gap-4 overflow-hidden">
            <div className=" my-2">
              <h4 className="text-red-500 font-semibold py-2">KIDS</h4>
              <p className=" text-l">Comfortable Wears </p>
              <div className="mt-12 hover:underline text-blue-800">
                <NavLink to="/products">
                  <span className=" text-blue-800 text-sm">View all </span>
                </NavLink>
              </div>
            </div>
            <div >
              <img src="https://m.media-amazon.com/images/I/61TIYhUzobL.AC_UL480_FMwebp_QL65.jpg" alt="image4"
                className="w-50"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-center m-2 p-4 rounded bg-white justify-between gap-4 overflow-hidden">
            <div className=" my-2">
              <h4 className="text-red-500 font-semibold py-2">ACCESSORIES</h4>
              <p className=" text-l">Multipurpose leather wallet </p>
              <div className="mt-12  hover:underline text-blue-800">
                <NavLink to="/products">
                  <span className=" text-blue-800 text-sm">View all </span>
                </NavLink>
              </div>
            </div>
            <div >
              <img src="https://m.media-amazon.com/images/I/81x0yUp0T+L.AC_UL480_FMwebp_QL65.jpg" alt="image5"
                className="w-50 h-50"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-row items-center m-2 p-4 rounded bg-white justify-between gap-4 overflow-hidden">
            <div className=" my-2">
              <h4 className="text-red-500 font-semibold py-2">ELECTRONICS</h4>
              <p className=" text-l">Home Appliances </p>
              <div className="mt-12 hover:underline text-blue-800">
                <NavLink to="/products">
                  <span className=" text-blue-800 text-sm">View all </span>
                </NavLink>
              </div>
            </div>
            <div >
              <img src="https://m.media-amazon.com/images/I/81xyPfQrT1L.AC_UL480_FMwebp_QL65.jpg" alt="image6"
                className="w-50 h-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
