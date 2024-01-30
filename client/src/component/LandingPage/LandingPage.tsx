import React from "react";

import { Link } from "react-router-dom"
import image from '../../image/background.jpg'

export default function LandingPage () {

  return (
    <div className="flex h-screen text-white">
      <div className="w-1/3 bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">The Dog Api</h1>
          <p>Descubre todo lo que tenemos para ofrecer.</p>
          <Link className="no-underline" to="/home">
            <button className="bg-yellow-500 text-white px-6 py-2 mt-4 hover:bg-yellow-600 rounded-lg font-bold">Ingresar</button>
          </Link>

        </div>
      </div>
      <div className="w-2/3 relative overflow-hidden">
        <img
          src={image}
          alt="Landing"
          className={`w-full h-full object-cover`}
        />

      </div>
    </div>
  )
}
