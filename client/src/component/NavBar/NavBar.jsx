import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import image from "../../image/icono.jpg";
import { useDogStore } from "../../store/dogStore-origin";
export default function NavBar() {
  const [name, setName] = useState("");

  const { getRazaByName, cleanDogDetail } = useDogStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    getRazaByName(name);
    setName('')
  };


  return (
    <div className={s.container}>
      <nav className={s.navbar}>
        <div className={s.divImg}>
          <img className={s.image} src={image} alt="" />
        </div>
        <div className={s.divItem}>
          <Link className={s.linkNav} to="/home">
            <li className={s.item}>Inicio</li>
          </Link>
          <Link className={s.linkNav} onClick={()=>cleanDogDetail()} to="/newdog">
            <li className={s.item}>Nueva Raza</li>
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
            placeholder="Buscar Raza"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            autoComplete="off"
          />

          <input
            className={s.inputButton}
            type="button"
            value="Buscar"
            onClick={handleSubmit}
          />
        </form>
      </nav>
    </div>
  );
}

