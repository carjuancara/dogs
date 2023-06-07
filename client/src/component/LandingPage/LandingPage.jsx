import React from "react";
import s from './LandingPage.module.css';
import image from '../../image/LandingPage.webp';
import { NavLink } from 'react-router-dom';


export default function LandingPage() {

  return (
    <div className={s.container}>
    <img className={s.img} src={image} alt="" />
    <div className={s.message}>
      <h1 className={s.title}>PI DOG</h1>
      <p className={s.description}>La idea de este proyecto es construir una aplicación web a partir de la API TheDogApi en la que se pueda:</p>
      <ul>
        <li>Buscar perros.</li>
        <li>Visualizar la información de los perros.</li>
        <li>Filtrarlas.</li>
        <li>Ordenarlas.</li>
        <li>Crear nuevos perros.</li>
      </ul>
      <p className={s.description}>⚠️ Para las funcionalidades de filtrado y ordenamiento NO se puede utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados.</p>
      <p className={s.description}>Deberás crear dos modelos para tu base de datos. Una será para los perros y la otra será para los tipos de temperamentos (pueden llevar el nombre que tu quieras). La relación entre ambos modelos debe ser de muchos a muchos</p>
      <p className={s.description}>🖱 BACK-END</p>
      <ul>
        <li>📍 GET | /dogs/:iddog</li>
        <li>📍 GET | /dogs/name?="..."</li>
        <li>📍 POST | /dogs</li>
        <li>📍 GET | /temperaments</li>
      </ul>
      <p className={s.description}>🖱 FRONT-END</p>
      <ul>
        <li>📍 LANDING PAGE | deberás crear una página de inicio o bienvenida</li>
        <li>📍 HOME PAGE | la página principal de tu SPA</li>
        <li>📍 DETAIL PAGE | en esta vista se deberá mostrar toda la información específica de un perro</li>
        <li>📍 FORM PAGE |: en esta vista se encontrará el formulario para crear un nuevo perro</li>
        <li></li>
      </ul>
      <p className={s.description}>🖱 TESTING</p>
      <p className={s.description}>Ten en cuenta que en esta instancia no es obligatorio el desarrollo de testing para tu aplicación. De igual manera, te desafiamos a que los hagas, ¡ya que suman puntos!</p>


    </div>
    <div className={s.enter}>
      <h2 className={s.title}>Dog APP</h2>
      <button className={s.btn}>
        <NavLink className={s.linkHome} to='/home'>
          Enter Site
        </NavLink>
      </button>
    </div>
  </div>
  )
}