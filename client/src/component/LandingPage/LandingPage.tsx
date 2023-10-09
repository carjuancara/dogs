import React from "react";
import s from "./LandingPage.module.css";
import image from "../../image/background.jpg";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={s.container}>
      <img className={s.img} src={image} alt="" />
      <div className={s.enter}>
        <h2 className={s.title}>Dog APP</h2>
        <button className={s.btn}>
          <Link className={s.linkHome} to="/home">
            Enter Site
          </Link>
        </button>
      </div>
    </div>
  );
}
