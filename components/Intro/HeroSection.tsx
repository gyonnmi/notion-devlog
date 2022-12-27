import React from "react";

const HeroSection = () => {
  return (
    <section>
      <div className="py-16 md:py-36 bg-[length:100%_55%] bg-no-repeat px-4 flex justify-center items-center bg-gradient-to-r from-purple-300 to-blue-300">
        <div className="p-8 md:p-16 bg-white rounded-xl shadow-lg text-center">
          <h1 className="font-black text-5xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Hello, World!
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
