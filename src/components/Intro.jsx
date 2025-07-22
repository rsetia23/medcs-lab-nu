import React from "react";
import { FaChevronDown } from "react-icons/fa"; // top of the file

const Intro = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-medcsblue text-white text-center px-6">
      <img
        src="/medcs-lab-logo.svg"
        alt="MedCS Lab Logo"
        className="w-40 h-40 mb-4 p-2 rounded"
      />
      <h1 className="text-4xl font-bold">MedCS Lab</h1>
      <p className="text-lg mt-2">
        Bridging Medicine and Computer Science
      </p>

      <a href="#about" className="absolute bottom-10 animate-bounce">
        <FaChevronDown className="text-white text-2xl" />
      </a>
    </section>
  );
};

export default Intro;
