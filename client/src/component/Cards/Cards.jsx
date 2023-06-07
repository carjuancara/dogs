import React from "react";
import s from './Cards.module.css';
import { getDogByID } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';


export default function Cards() {
  const dog = useSelector(state => state.loadDog)

  const dispatch = useDispatch()
 
  return (
    <div className={s.container}>
      {dog?.map(d =>
        <Card
          key={d.id ? d.id : d.ApiID}
          id={d.id ? d.id : d.ApiID}
          name={d.name}
          image={d.image}
          year={d.year}
          height={d.height}
          weight={d.weight}
          temperament={d.temperament}
          onClick={(e) => { dispatch(getDogByID(e.target.value)) }}
        />
      )}
    </div>
  )
}
