import { createSlice } from '@reduxjs/toolkit'

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

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducer: {
    UPDATE_ALL_DOGS: (state, action) => {
      state.allDog = action.payload
    },
    SORT_BY_WEIGHT: (state, action) => {
      state.allDog = action.payload === 'ASC' ? state.allDog.sort((a, b) => {
        if (a.weight > b.weight) return 1
        if (a.weight < b.weight) return -1
        return 0
      })
        :
        state.allDog.sort((a, b) => {
          if (a.weight < b.weight) return 1
          if (a.weight > b.weight) return -1
          return 0
        })
    },
    GET_TEMPERAMENTS: (state, action) => {
      state.temperaments = action.payload
    },
    ALL_DOG: (action, state) => {
      state.allDog = action.payload
      state.backupDog = action.payload
    },
    DOG_DETAIL: (action, state) => {
      state.dogDetail = state.loadDog.filter(dog => dog[action.payload["origin"]] === action.payload["id"])
    },
    GET_RAZA_BY_NAME: (action, state) => {
      state.allDog = action.payload
    },
    REMOVE_DETAIL: (action, state) => {
      state.dogDetail = []
    },
    LOAD_DOG: (action, state) => {
      state.loadDog = state.allDog.slice(action.payload, action.payload + state.limit)
    },
    FILTER_BY_TEMPERAMENTS: (action, state) => {
      state.allDog = action.payload === 'ALL' ? state.allDog = state.backupDog : state.allDog?.filter(d => d.temperament?.includes(action.payload))
      state.filterTemperaments = action.payload
    },
    RESTORE_ALL_DOG: (action, state) => {
      state.allDog = state.backupDog
    },
    SORT_BY_NAME: (action, state) => {
      state.allDog = action.payload === 'ASC' ? state.allDog.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
        :
        state.allDog.sort((a, b) => {
          if (a.name < b.name) return 1
          if (a.name > b.name) return -1
          return 0
        })
    },
    FILTER_BY_ORIGIN: (action, state) => {
      state.allDog = action.payload === 'ApiID' ? state.allDog.filter(d => {
        return d.ApiID
      }) : state.allDog.filter(d => {
        return d.id
      })
        
    }
  }
})


export const { UPDATE_ALL_DOGS, SORT_BY_NAME, RESTORE_ALL_DOG, FILTER_BY_TEMPERAMENTS, LOAD_DOG, REMOVE_DETAIL, 
  GET_RAZA_BY_NAME, DOG_DETAIL, ALL_DOG, GET_TEMPERAMENTS, SORT_BY_WEIGHT, FILTER_BY_ORIGIN,  
   } = brandSlice.actions

   export default brandSlice.reducer