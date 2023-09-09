import React, { useEffect } from "react";
import s from "./CardDetail.module.css";
import { useParams } from "react-router-dom";
import { useDogStore } from "../../store/dogStore-origin";

export default function CardDetail() {
  const { id } = useParams();
  const { DogDetail, dogDetail } = useDogStore();
console.log("id: ",id)
   useEffect(() => {
    if (id.length > 6) {
      DogDetail("id", parseInt(id));
    } else {
      DogDetail("ApiID", parseInt(id));
    }
     /* return () => {
      cleanDogDetail();
    }; */ 
  }, [DogDetail, id])
   

  return (
    <div className={s.container}>
      <div className={s.imageDetail}>
        <div className={s.containerImage}>
          <img className={s.img} src={dogDetail?.image} alt="img not found" />
        </div>
        <div className={s.containerDetail}>
          <div></div>
          <div className={s.detalleTitle}>
            <label htmlFor="a">Dog Details </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">
              Dog Name: <span>{dogDetail?.name}</span>{" "}
            </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">
              Id:{" "}
              <span>{dogDetail.ApiID ? dogDetail.ApiID : dogDetail.id}</span>
            </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Temperaments:</label>
            <span className={dogDetail?.temperament > 35 ? s.isLarge : null}>
              {dogDetail?.temperament}
            </span>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">
              Weight: <span>{dogDetail?.weight}</span>
            </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">
              Height: <span>{dogDetail?.height}</span>
            </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">
              Years: <span>{dogDetail?.year}</span>
            </label>
          </div>
        </div>
      </div>

{/*       <Link className={s.btnPaginado} to={`/updatedog/${id}`}>
        <button
          className={s.boton}
          type="submit"
          onClick={() => {
            DogDetail(id.length < 6 ? ("id", id) : ("ApiID", id))
          }}>
          Modify Dog
        </button>
      </Link> */}
    </div>
  );
}
