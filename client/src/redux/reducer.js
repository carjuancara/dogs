import {
  GET_TEMPERAMENTS, ALL_DOG, DOG_DETAIL, REMOVE_DETAIL, LOAD_DOG, SORT_BY_NAME,
  FILTER_BY_TEMPERAMENTS, RESTORE_ALL_DOG, FILTER_BY_ORIGIN, GET_RAZA_BY_NAME, SORT_BY_WEIGHT, UPDATE_ALL_DOGS
} from './actions.js';

const initialState = {
  allDog: [],
  backupDog: [],
  loadDog: [],
  dogDetail: [],
  temperaments: [],
  filterTemperaments: "ALL",
  filterWeight: "ASC",
  filterName: "ASC",
  filterOrigin: "ALL",
  limit: 8,
  offset: 0
}

function RootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ALL_DOGS:
      return {
        ...state,
        allDog: action.payload
      }
    case SORT_BY_WEIGHT:
      return {
        ...state,
        allDog: action.payload === 'ASC' ? state.allDog.sort((a, b) => {
          if (a.weight > b.weight) return 1
          if (a.weight < b.weight) return -1
          return 0
        })

          :
          state.allDog.sort((a, b) => {
            if (a.weight < b.weight) return 1
            if (a.weight > b.weight) return -1
            return 0
          }),
        filterWeight: action.payload
      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }
    case ALL_DOG:
      return {
        ...state,
        allDog: action.payload,
        backupDog: action.payload,
      }
    case DOG_DETAIL:
      return {
        ...state,
        dogDetail: state.loadDog.filter(dog => dog[action.payload["origin"]] === action.payload["id"])
      }
    case GET_RAZA_BY_NAME:
      return {
        ...state,
        allDog: action.payload,
      }
    case REMOVE_DETAIL:
      return {
        ...state,
        dogDetail: [],
      }
    case LOAD_DOG:
      return {
        ...state,
        loadDog: state.allDog.slice(action.payload, action.payload + state.limit)
      }
    case FILTER_BY_TEMPERAMENTS:
      return {
        ...state,
        allDog: action.payload === 'ALL' ? state.allDog = state.backupDog : state.allDog?.filter(d => d.temperament?.includes(action.payload)),
        filterTemperaments: action.payload,
      }
    case RESTORE_ALL_DOG:
      return {
        ...state,
        allDog: state.backupDog
      }
    case SORT_BY_NAME:
      return {
        ...state,
        allDog: action.payload === 'ASC' ? state.allDog.sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })

          :
          state.allDog.sort((a, b) => {
            if (a.name < b.name) return 1
            if (a.name > b.name) return -1
            return 0
          }),
        filterName: action.payload
      }
    case FILTER_BY_ORIGIN:
      return {
        ...state,
        allDog: action.payload === 'ApiID' ? state.allDog.filter(d => {
          return d.ApiID
        }) : state.allDog.filter(d => {
          return d.id
        }),
        filterOrigin: action.payload
      }

    default:
      return {
        ...state
      }

  }
}

export default RootReducer;