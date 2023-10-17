import React from "react";
import image from "../../image/background.jpg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className='container flex items-center justify-center w-screen h-screen'>
      <img className="w-screen h-screen absolute bg-no-repeat bg-cover bg-center" src={image} alt="" />
      <div className="flex flex-col mr-80 items-center relative border-2 border-solid border-antiquewhite rounded-lg h-36 w-72 justify-evenly">
        <h2 className="text-xl font-bold text-white" >Dog APP</h2>
        <button className="w-48 h-12 rounded-md bg-gray-500 text-white font-bold text-2xl cursor-pointer">
          <Link className="no-underline" to="/home">
            Enter Site
          </Link>
        </button>
      </div>
    </div>
  );
}
