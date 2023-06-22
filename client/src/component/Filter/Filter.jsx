import React from "react";
import s from './Filter.module.css';
import { useSelector, useDispatch } from "react-redux";
import { sortByName, filterByTemperaments, filterByOrigin, sortByWeight, restoreAllDogs } from "../../redux/actions";

export default function Filter() {

  const temperaments = useSelector(state => state.temperaments)
  const dispatch = useDispatch()

  const handleSubmitTemperaments = async (e) => {
    e.preventDefault();
    let temp = document.getElementById('temperaments').options[document.getElementById('temperaments').selectedIndex].value
    console.log(temp)
    if (temp === "all temperaments") {
      await dispatch(filterByTemperaments('ALL'))
      
    } else {
      await dispatch(filterByTemperaments(temp))
    }
  }
  const handleSubmitOrigin = async (e) => {
    e.preventDefault();
    const origin = document.getElementById('origin').options[document.getElementById('origin').selectedIndex].value
    console.log(origin)
    if (origin==='ALL') {
      await dispatch(filterByOrigin('ALL'))
    }
    else if (origin==='ApiID') {
      await dispatch(filterByOrigin('ApiID'))
    } else {
      await dispatch(filterByOrigin('id'))
    }
  }
  const handleSubmitName = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').options[document.getElementById('name').selectedIndex].value
    console.log(name)
    if (name === "nameDes") {
      await dispatch(sortByName('DES'))
    } else {
      await dispatch(sortByName('ASC'))
    }
  }
  const handleSubmitWeight = async (e) => {
    e.preventDefault();
    const weight = document.getElementById('weight').options[document.getElementById('weight').selectedIndex].value
    console.log(weight)
    if (weight==='weightDes') {
      await dispatch(sortByWeight('DES'))
    } else {
      await dispatch(sortByWeight('ASC'))
    }

  }
  return (
    <div className={s.container}>
      <div className={s.filters}>
        <span className={s.title}>FILTERS</span>
        <form action="#" className={s.formFilter} >
          <select name="temperaments" id="temperaments">
            <option key={-1} value="Select a temperaments">Select a temperaments</option>
            <option key={0} id={0} value="all temperaments" onClick={handleSubmitTemperaments}>all temperaments</option>
            {temperaments?.map(d =>
              <option className={s.btn} key={d.id} id={d.id} value={d.name} onClick={handleSubmitTemperaments}>{d.name}</option>
            )}
          </select>
        </form>
        <form action="#" className={s.formFilter} >
          <select name="origin" id="origin">
            <option key={1} id='originALL'value="ALL" onClick={handleSubmitOrigin} >Origin By: ALL</option>
            <option key={2} id='originApiID'value="ApiID" onClick={handleSubmitOrigin} >Origin By: API</option>
            <option key={3} id='originId'value="id" onClick={handleSubmitOrigin} >Origin By: DB</option>
          </select>
        </form>
        <form action="#" className={s.formFilter} >
          <select name="name" id="name">
            <option key={1} value="nameAsc" id="nameAsc" onClick={handleSubmitName} >Dog By Name: Asc</option>
            <option key={2} value="nameDes" id="nameDes" onClick={handleSubmitName} >Dog By Name: Des</option>
          </select>
        </form>
        <form action="#" className={s.formFilter} >
          <select name="weight" id="weight">
            <option key={1} value="weightAsc" id="weightAsc" onClick={handleSubmitWeight} >Dog By Weight: Asc</option>
            <option key={2} value="weightDes" id="weightDes" onClick={handleSubmitWeight} >Dog By Weight: Des</option>
          </select>

        </form>
        <input className={s.btn} type="button" value="Restore All" onClick={() => dispatch(restoreAllDogs())} />
      </div>
    </div >
  )
}