import React from "react";
import other from "../assets/otherpagesbg.jpg"; // Local image import

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img
          src={other}
          alt="About Us Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">
            <span className="text-white">Home</span> /{" "}
            <span className="font-semibold">About Us</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
