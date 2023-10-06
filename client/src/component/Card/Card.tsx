import React from "react";
import s from "./Card.module.css";
import { Link } from "react-router-dom";

interface CardDetail {
  id:string,
  name:string,
  image:string,
  temperament:string[]
}

export default function Card(card:CardDetail) {
  return (
    <Link className={s.links} to={`/dogdetail/${card.id}`}>
      <div key={card.id} className={s.tarjetaContenedor}>
        <div className={s.titulo}>
          <h4>RAZA: {card.name}</h4>
        </div>
        <div className={s.containerImage}>
          <img src={card.image} className={s.image} alt="" />
        </div>
        <div className={s.pieTarjeta}>
        {card.temperament ?
          <h4>TEMPERAMENTS: {card.temperament.length<20 ? card.temperament : card.temperament.slice(0,20)+"..."}</h4>
          :
          null
        }
        </div>
      </div>
    </Link>
  );
}
