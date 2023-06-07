import axios from 'axios';
// GET DATA
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const DOG_DETAIL = 'DOG_DETAIL'
export const ALL_DOG = 'ALL_DOG'
export const GET_RAZA_BY_NAME = 'GET_RAZA_BY_NAME';
export const UPDATE_ALL_DOGS = 'UPDATE_ALL_DOGS';
// STATE
export const LOAD_DOG = 'LOAD_DOG'
export const RESTORE_ALL_DOG = 'RESTORE_ALL_DOG'
export const REMOVE_DETAIL = 'REMOVE_DETAIL'
// SORT BY RAZA
export const SORT_BY_NAME = 'SORT_BY_NAME'
// SORT BY WEIGHT
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT';
// SORT BY TEMPERAMENTS
export const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS';
// SORT BY ORIGIN
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'


// update prop allDog
// guarda en el estado todos los resultados encontrados 
// o mantiene las razas que cumplen con el/los filtros
export function updateAllDogs(alldogs) {
  return async function (dispatch) {
    await dispatch({ type: UPDATE_ALL_DOGS, payload: alldogs })
  }
}
// bring all the temperaments 
// trae los temperamentos de la DB
export function getTemperaments() {
  return async function (dispatch) {
    const allTemperaments = await axios('/temperaments')
    await dispatch({ type: GET_TEMPERAMENTS, payload: allTemperaments.data.Temperaments })
  }
}

//bring a breed by ID
// busca una raza por ID distinguiendo DB de API
export function getDogByID(originID, idRaza) {
  return async function (dispatch) {
    await dispatch({ type: DOG_DETAIL, payload: { "origin": originID, "id": idRaza } })
  }
}

//update state loadDog
// pasa un valor para hacer el corte de las siguientes tarjetas que se mostraran
export function updateLoadDog(value) {
  return async function (dispatch) {
    await dispatch({ type: LOAD_DOG, payload: value })
  }
}

// bring all the dogs ( API - DB)
// actualiza el BACKUPDOG y ALLDOGS
export function getAllDogs() {
  return async function (dispatch) {
    const allDogs = await axios('/dogs')
    await dispatch({ type: ALL_DOG, payload: allDogs.data })
  }
}

//busca una raza por nombre, con coincidencia parcial y el resultado lo guarda en ALLDOG
export function getRazaByName(nameRaza) {
  return async function (dispatch) {
    const foundsNames = await axios(`/dogs`, {
      params: { name: nameRaza }
    })
    await dispatch({ type: GET_RAZA_BY_NAME, payload: foundsNames.data })
  }
}

// RESTORE_ALL_DOGS
// restaura una copia de todas las razas de perros en la propiedad ALLDOGS, tomandolos de la prop
// BACKUPDOG 
export function restoreAllDogs() {
  return async function (dispatch) {
    await dispatch({ type: RESTORE_ALL_DOG })
  }
}

// REMOVE_DETAIL
// elimina el contenido de la prop DOGDETAIL
// para ya no ser mostrado
export function removeDetail() {
  return async function (dispatch) {
    await dispatch({ type: REMOVE_DETAIL })
  }
}

// SORT_BY_NAME
// ordena el contenido de ALLDOG , ascendente(ASC) o descente(DES)
export function sortByName(order) {
  return async function (dispatch) {
    await dispatch({ type: SORT_BY_NAME, payload: order })
  }
}

//SORT_BY_WEIGHT
// paso el orden que se aplicara ascendente(ASC) o descendente(DES)
export function sortByWeight(order) {
  return async function (dispatch) {
    await dispatch({ type: SORT_BY_WEIGHT, payload: order })
  }
}

// SORT_TEMPERAMENTS
export function filterByTemperaments(temperament) {
  return async function (dispatch) {
    await dispatch({ type: FILTER_BY_TEMPERAMENTS, payload: temperament })
  }
}

//SORT_DB_DATA
export function filterByOrigin(origin) {
  return async function (dispatch) {
    await dispatch({ type: FILTER_BY_ORIGIN, payload: origin })
  }
}
