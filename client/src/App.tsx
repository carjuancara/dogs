import React from 'react'
import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar/NavBar";
import LandingPage from "./component/LandingPage/LandingPage";
import Filter from "./component/Filter/Filter";
import Cards from "./component/Cards/Cards";
import CardDetail from "./component/CardDetail/CardDetail";
import NewRaza from "./component/NewRaza/NewRaza";
import Atribuciones from "./component/Atribuciones/Atribuciones";
//axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = 'https://dogserver-io60.onrender.com'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <Filter />
              <Cards />
            </>
          }
        />
        <Route
          path="/newdog"
          element={
            <div>
              <NavBar />
              <NewRaza />
            </div>
          }
        />

        <Route
          path="/dogdetail/:id"
          element={
            <div>
              <NavBar />
              <CardDetail />
            </div>
          }
        />
        <Route
          path="/updatedog/:id"
          element={
            <div>
              <NavBar />
              <NewRaza />
            </div>
          }
        />
        <Route
          path="/atribuciones"
          element={
            <div>
              <NavBar />
              <Atribuciones />
            </div>
          }
        />
      </Routes>
    </div>
  );
}


