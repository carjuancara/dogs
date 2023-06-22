import React from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import image from "../../image/icono.jpg";
import { getRazaByName } from "../../redux/actions.js";

export default function NavBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getRazaByName(name));
  };

  return (
    <div className={s.container}>
      <nav className={s.navbar}>
        <div className={s.divImg}>
          <img className={s.image} src={image} alt="" />
        </div>
        <div className={s.divItem}>
          <Link className={s.linkNav} to="/home">
            <li className={s.item}>Home</li>
          </Link>
          <Link className={s.linkNav} to="/newdog">
            <li className={s.item}>New Raza</li>
          </Link>
          <Link className={s.linkNav} to="/atribuciones">
            <li className={s.item}>Atribuciones</li>
          </Link>
        </div>
        <form className={s.divInput} onSubmit={handleSubmit}>
          <input
            className={s.inputNavbar}
            value={name}
            name="search"
            autoFocus
            placeholder="Search Raza"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            autoComplete="off"
          />

          <input
            className={s.inputButton}
            type="button"
            value="Search"
            onClick={handleSubmit}
          />
        </form>
      </nav>
    </div>
  );
}
