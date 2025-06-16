import React, { Suspense, useContext } from "react";
import HoodieCanvas from "../Components/Model_3D/HoodieCanvas";
import { LoginPopupContext } from "../Components/LoginPopup/LoginPopupContext";

function Home() {

  const { handleOpen } = useContext(LoginPopupContext)

  return (
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
        <button onClick={handleOpen} className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold cursor-pointer rounded-xl hover:bg-blue-700 transition duration-300">
          Shop Now
        </button>
      </div>

      {/* 3D Model Section */}
      <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[500px]">
        <Suspense fallback={<div>Loading...</div>}>
          <HoodieCanvas />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
