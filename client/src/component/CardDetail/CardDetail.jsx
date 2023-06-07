import React, { useEffect } from "react";
import s from './CardDetail.module.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogByID } from '../../redux/actions.js'



export default function CardDetail() {
  const { id } = useParams()
  const dogDetail = useSelector(state => state.dogDetail[0])
  const dispatch = useDispatch()


 
  useEffect(() => {
    if (id.length > 6) {
      dispatch(getDogByID("id", id))
    } else {
      dispatch(getDogByID("ApiID", parseInt(id)))
    }
    /* return () => {
      dispatch(removeDetail())
    } */
  }, [dispatch, id])


  return (
    <div className={s.container}>
      <div className={s.imageDetail}>
        <div className={s.containerImage}>
          <img className={s.img} src={dogDetail?.image} alt="img not found" />
        </div>
        <div className={s.containerDetail}><div></div>
          <div className={s.detalleTitle}>
            <label htmlFor="a">Dog Details </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Dog Name: <span>{dogDetail?.name}</span> </label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Id: <span>{dogDetail?.ApiID ? dogDetail?.ApiID : dogDetail?.id}</span></label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Temperaments: <span>{dogDetail?.temperament}</span></label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Weight: <span>{dogDetail?.weight}</span></label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Height: <span>{dogDetail?.height}</span></label>
          </div>
          <div className={s.detalleItem}>
            <label htmlFor="a">Years: <span>{dogDetail?.year}</span></label>
          </div>
        </div>
      </div>
      <div >
        <Link className={s.btnPaginado} to='/updatedog/:id'>
          <button className="boton" type="submit" onClick={(e)=> dispatch(getDogByID(e.target.value))} >Modify Dog </button>
        </Link>
      </div>
    </div>
  )
}