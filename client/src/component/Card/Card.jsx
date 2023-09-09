import React from "react";
import s from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, temperament }) {

  return (
    <Link className={s.links} to={`/dogdetail/${id}`}>
      <div key={id} className={s.tarjetaContenedor}>
        <div className={s.titulo}>
          <h4>RAZA: {name}</h4>
        </div>
        <div className={s.containerImage}>
          <img src={image} className={s.image} alt="" />
        </div>
        <div className={s.pieTarjeta}>
        {temperament ?
          <h4>TEMPERAMENTS: {temperament.length<20 ? temperament : temperament.slice(0,20)+"..."}</h4>
          :
          null
        }
        </div>
      </div>
    </Link>
  );
}
