import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" />
        <p className="w-full md:w-2/3 text-gray-600">
          ebsjhf sf fejsnf esf iuesf eisfn iuwefnkjwn fkwe fiwefi hef jhbh
          fnhbfhkfjnehbf iwef iw efifb iwefbiweifb wefb ihwe
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About us
            </a>
          </li>
          <li>
            <a href="#delivery" className="hover:underline">
              Delivery
            </a>
          </li>
          <li>
            <a href="#privacy" className="hover:underline">
              Privacy policy
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-212-456-7890</li>
          <li>
            <a href="mailto:contact@fnv.com" className="hover:underline">
              contact@fnv.com
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-full">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ fnv.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
