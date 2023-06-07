import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import NavBar from './component/NavBar/NavBar';
import LandingPage from './component/LandingPage/LandingPage';
import Filter from './component/Filter/Filter';
import Cards from './component/Cards/Cards';
import CardDetail from './component/CardDetail/CardDetail';
import NewRaza from './component/NewRaza/NewRaza';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, getTemperaments, updateLoadDog } from './redux/actions';
import { useEffect, useState } from 'react';
//axios.defaults.baseURL = 'https://pi-dog-production-bab3.up.railway.app/'
axios.defaults.baseURL = 'http://localhost:3001/'

function App() {
  const LIMIT = 8;
  const INITIALSTATE = 0;
  const [offset, setOffset] = useState(INITIALSTATE)
  const allDogs = useSelector(state => state.allDog)
  const cantDog = useSelector(state => state.loadDog.length)
  const filterTemperaments = useSelector(state => state.filterTemperaments)
  const filterName = useSelector(state => state.filterName)
  const filterWeight = useSelector(state => state.filterWeight)
  const filterOrigin = useSelector(state => state.filterOrigin)
  const dispatch = useDispatch()

  const nextPage = () => {
    if (cantDog < LIMIT) {
      dispatch(updateLoadDog(offset))
    } else if (cantDog === LIMIT) {
      setOffset(offset + LIMIT)
      dispatch(updateLoadDog(offset))

    }
  }

  const previousPage = () => {
    if (offset >= 0 && offset < 9) {
      return dispatch(updateLoadDog(0))
    } else {
      const value = setOffset(offset - LIMIT)
      dispatch(updateLoadDog(value))
    }
  }

  async function initial() {
    await dispatch(getAllDogs())
    await dispatch(getTemperaments())
    await dispatch(updateLoadDog(INITIALSTATE))
  }
  useEffect( () => {
    initial()
  }, [])

  useEffect(() => {
    dispatch(updateLoadDog(offset))
  }, [filterName, filterOrigin, filterTemperaments, filterWeight, offset, allDogs])

  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Route path='/home'>
        <NavBar />
        <Filter />
        <Cards />
        <div className="btnPaginado">
          <button className="boton" onClick={previousPage}> {"<< Previous Page"}</button>
          <button className="boton" onClick={nextPage}>{"Next Page >>"}</button>
        </div>
      </Route>
      <Route path='/newdog'>
        <NavBar />
        <NewRaza />
      </Route>
      <Route path='/dogdetail/:id'>
        <NavBar />
        <CardDetail />
      </Route>
      <Route path='/updatedog/:id'>
        <NavBar />
        <NewRaza />
      </Route>
    </div>
  );
}

export default App;
