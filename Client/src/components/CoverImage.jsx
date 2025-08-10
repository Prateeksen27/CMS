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

      {/* Optional About Content Section */}
      <div className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Since</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          We serve authentic food with passion and tradition.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
