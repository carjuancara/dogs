import React from "react";
import s from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, weight, temperament }) {
  return (
    <Link className={s.links} to={`/dogdetail/${id}`}>
      <div key={id} className={s.tarjetaContenedor}>
        <div className={s.titulo}>
          <h4>RAZA: {name}</h4>
          <h4>WEIGHT: {weight}</h4>
        </div>
        {/* <div className={s.titulo}>
        </div> */}
        <div className={s.containerImage}>
          <img src={image} className={s.image} alt="" />
        </div>
        <div className={s.pieTarjeta}>
          <h4>TEMPERAMENTS: {temperament}</h4>
        </div>
      </div>
    </Link>
  );
}
