import { create } from 'zustand'
import axios from 'axios'
export const useDogStore = create((set) => ({
  allDog: [], //todas las razas de perros
  backupDog: [], // una copia de las razas de perros  
  dogDetail: {}, // los detallas de una raza
  currentPage: 1, // pagina actual 
  temperaments: [], // listado de todos los temperamentos de las razas de perro
  temperamentByRaza: [], //listado de los temperamentos con sus ID cargarlos en div
  filterTemperaments: "ALL", // FILTRO todos los temperamentos
  filterWeight: "ASC",  // FILTRO raza por peso ascendente
  filterName: "ASC",  // FILTRO raza por nombre ascendente
  filterOrigin: "ALL", // FILTRO de raza por origen: API | DB
  UpdateCurrentPage: (value) => {
    set((state) => ({
      currentPage: state.currentPage + value
    }))
  },
  GoToPage: (value) => {
    set((state) => ({
      currentPage: value
    }))
  },
  UPDATE_ALL_DOGS: (value) => set(state => ({  // ???
    allDog: value
  })),
  ALL_DOG: (value) => set(state => ({   // ???
    allDog: value,
    backupDog: value,
  })),
  cleanDogDetail: () => {
    set(() => ({
      dogDetail: {}
    }))
  },
  searchTemperaments: (temp) => set(state => (
    temp.forEach(r => {
      const found = state.temperaments.find(t => t.name === r)
      if (found) {
        state.temperamentByRaza.push({ id: found.id, name: found.name })
      }
    })
  )),
  DogDetail: (origen, id) => set((state) => ({
    dogDetail: origen === 'ApiID'
      ? state.allDog.find(dog => dog.ApiID === id)
      : state.allDog.find(dog => dog.id === id)
  })),
  UPDATE_OFFSET: () => set(state => ({
    ...state,
    offset: state.offset + state.limit
  }))
  ,
  UPDATE_LOAD_DOG: () => set(state => ({
    ...state,
    loadDog: state.allDog.slice(state.offset, state.offset + state.limit)
  })),
  REMOVE_DETAIL: () => set(state => ({
    ...state,
    dogDetail: {},
  })),
  restoreAllDogs: () => set(state => ({
    ...state,
    allDog: state.backupDog
  })),
  filterByOrigin: async (origin) => {
    if (origin === 'ALL') {
      set(state => ({
        allDog: state.backupDog
      }))
    } else if (origin === 'ApiID') {
      set(state => ({
        allDog: state.backupDog.filter(d => d.ApiID)
      }))
    } else {
      set(state => ({
        allDog: state.backupDog.filter(d => d.id)
      }))
    }
    set((state) => ({
      currentPage: 1
    }))
  },
  filterByTemperaments: (value) => set(state => ({
    ...state,
    currentPage: 1,
    allDog: value === 'ALL' ? state.backupDog : state.backupDog?.filter(d => d.temperament?.includes(value)),
    filterTemperaments: value
  })),
  sortByName: (value) => set(state => {
    // Clonar el arreglo state.allDog usando el spread operator
    const clonedAllDog = [...state.allDog];
    // Determinar el tipo de ordenamiento según el valor de 'value'
    const sortOrder = value === 'ASC' ? 1 : -1;
    // Ordenar la copia en función del nombre y el orden especificado
    const sortedAllDog = clonedAllDog.sort((a, b) => {
      return a.name.localeCompare(b.name) * sortOrder;
    });
    return {
      currentPage: 1,
      allDog: sortedAllDog,
    };
  }),

  sortByWeight: (value) => set(state => {
    const clonedAllDog = [...state.allDog];
    const sortOrder = value === 'ASC' ? 1 : -1;
    const sortedAllDog = clonedAllDog.sort((a, b) => {
      return a.weight.localeCompare(b.weight) * sortOrder;
    });
    return {
      ...state,
      currentPage: 1,
      allDog: sortedAllDog,
    };
  }),
  getAllDogs: async () => {
    try {
      const response = await axios.get("/dogs");
      const allDog = response.data;
      // Actualiza las imágenes en las posiciones 3, 5 y 10
     
      allDog[14].image = "https://cdn2.thedogapi.com/images/HkC31gcNm.png";
      allDog[89].image = "https://cdn2.thedogapi.com/images/B12uzg9V7.png";
      allDog[136].image = "https://cdn2.thedogapi.com/images/_Qf9nfRzL.png";

      set(state => ({
        ...state,
        allDog,
        backupDog: allDog,
      }),
      );
    } catch (error) {
      console.error("Error fetching dog data:", error.message);
    }
  },
  getTemperaments: async () => {
    const temperaments = await (await axios.get('/temperaments')).data
    set({ temperaments: temperaments.Temperaments })
  },
  getRazaByName: async (nameRaza) => {
    const allDog = await (await axios(`/dogs`, { params: { name: nameRaza } })).data
    set(state => ({
      ...state,
      currentPage: 1,
      allDog
    }))
  }
}
))
