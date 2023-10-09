import { create } from 'zustand'
import axios from 'axios'

interface objectTemperament {
  name: string;
  id: number
}

interface responseDog {
  ApiID?: number;
  id?: string;
  name: string;
  image: string;
  height: string;
  weight: string;
  temperament: string;
  year: string;
}
interface details {
  image: string;
  name: string;
  ApiID?: number;
  id?: string;
  temperament: string;
  weight: string;
  height: string;
  year: string;
}
interface useDog {
  allDog: responseDog[];
  backupDog: responseDog[];
  dogDetail: details;
  currentPage: number;
  temperaments: objectTemperament[];
  temperamentByRaza: object[];
  filterTemperaments: string;
  filterWeight: string;
  filterName: string;
  filterOrigin: string;
  UpdateCurrentPage: (value: number) => void;
  GoToPage: (value: number) => void;
  cleanDogDetail: () => void;
  searchTemperaments: (temp: []) => void;
  DogDetail: (origin: string, id: number) => void;
  restoreAllDogs: () => void;
  filterByOrigin: (origin: string) => void;
  filterByTemperaments: (value: string) => void;
  sortByName: (name: string) => void
  sortByWeight: (weight: string) => void;
  getAllDogs: () => void;
  getTemperaments: () => void;
  getRazaByName: (nameRaza: string) => void;
}
export const useDogStore = create<useDog>()((set) => ({
  allDog: [], //todas las razas de perros
  backupDog: [], // una copia de las razas de perros  
  dogDetail: {
    image: "",
    name: "",
    ApiID: 0,
    id: "",
    temperament: "",
    weight: "",
    height: "",
    year: ""
  }, // los detallas de una raza
  currentPage: 1, // pagina actual 
  temperaments: [], // listado de todos los temperamentos de las razas de perro
  temperamentByRaza: [], //listado de los temperamentos con sus ID cargarlos en div
  filterTemperaments: "ALL", // FILTRO todos los temperamentos
  filterWeight: "ASC",  // FILTRO raza por peso ascendente
  filterName: "ASC",  // FILTRO raza por nombre ascendente
  filterOrigin: "ALL", // FILTRO de raza por origen: API | DB
  UpdateCurrentPage: (value: number) => {
    set((state: useDog) => ({
      currentPage: state.currentPage + value
    }))
  },
  GoToPage: (value: number) => {
    set(() => ({
      currentPage: value
    }))
  },
  cleanDogDetail: () => {
    set((state) => ({
      ...state,
      dogDetail: {
        image: "",
        name: "",
        ApiID: 0,
        id: "",
        temperament: "",
        weight: "",
        height: "",
        year: ""
      }
    }))
  },
  /* searchTemperaments: (temp: []) => set( state => {
    temp.forEach(r => {
      const found = state.temperaments.find((t) => t.name === r)
      if (found) {
        state.temperamentByRaza.push({ id: found.id, name: found.name })
      }
    })
}), */
  searchTemperaments: (temp: string[]) => set((state) => {
    const newTemperamentByRaza = [...state.temperamentByRaza]; // Copia el estado existente

    temp.forEach((r) => {
      const found = state.temperaments.find((t) => t.name === r);
      if (found) {
        newTemperamentByRaza.push({ id: found.id, name: found.name });
      }
    });

    return {
      ...state,
      temperamentByRaza: newTemperamentByRaza, // Actualiza la propiedad temperamentByRaza
    };
  }),
  /* DogDetail: (origen: string, id: number) => {
    set((state) => ({
      ...state,
      dogDetail: origen === 'ApiID'
        ? state.allDog.find( dog => dog.ApiID === id)
        : state.allDog.find( dog => dog.id === id)
    }))
  }, */
  DogDetail: (origen: string, id: number) => {
    set((state: useDog) => ({
      ...state,
      dogDetail: {
        ...state.dogDetail, // Mantén los datos existentes en dogDetail
        ...(
          origen === 'ApiID'
            ? state.allDog.find(dog => dog.ApiID === id)
            : state.allDog.find(dog => dog.id === id.toString())
        )
      }
    }))
  },
  
  restoreAllDogs: () => set((state: useDog) => ({
    ...state,
    allDog: state.backupDog
  })),
  filterByOrigin: async (origin: string) => {
    if (origin === 'ALL') {
      set((state: useDog) => ({
        allDog: state.backupDog
      }))
    } else if (origin === 'ApiID') {
      set((state: useDog) => ({
        allDog: state.backupDog.filter((d) => d.ApiID)
      }))
    } else {
      set((state: useDog) => ({
        allDog: state.backupDog.filter(d => d.id)
      }))
    }
    set(() => ({
      currentPage: 1
    }))
  },
  filterByTemperaments: (value: string) => set((state: useDog) => ({
    ...state,
    currentPage: 1,
    allDog: value === 'ALL' ? state.backupDog : state.backupDog?.filter(d => d.temperament?.includes(value)),
    filterTemperaments: value
  })),
  sortByName: (value: string) => set((state: useDog) => {
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
  sortByWeight: (value: string) => set(state => {
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
  /* sortByWeight: (value: string | number) => set((state) => {
    let sortOrder: number;
    if (typeof value === "string") {
      sortOrder = value === 'ASC' ? 1 : -1;
    } else if (typeof value === "number") {
      sortOrder = value; // Si ya es un número, úsalo directamente
    } else {
      sortOrder = 1; // Valor predeterminado si el tipo no es reconocido
    }
  
    const clonedAllDog = [...state.allDog];
    const sortedAllDog = clonedAllDog.sort((a, b) => {
      return a.weight.localeCompare(b.weight) * sortOrder;
    });
  
    return {
      ...state,
      currentPage: 1,
      allDog: sortedAllDog,
    };
  }), */
  getAllDogs: async () => {
    try {
      const response = await axios.get("/dogs");
      const allDog = response.data;
      // Actualiza las imágenes en las posiciones

      allDog[14].image = "https://cdn2.thedogapi.com/images/HkC31gcNm.png";
      allDog[89].image = "https://cdn2.thedogapi.com/images/B12uzg9V7.png";
      allDog[136].image = "https://cdn2.thedogapi.com/images/_Qf9nfRzL.png";

      set((state: useDog) => ({
        ...state,
        allDog,
        backupDog: allDog,
      }),
      );
    } catch (error: any) {
      console.error("Error fetching dog data:", error.message);
    }
  },
  getTemperaments: async () => {
    const temperaments = await (await axios.get('/temperaments')).data
    set({ temperaments: temperaments.Temperaments })
  },
  getRazaByName: async (nameRaza: string) => {
    const allDog = await (await axios(`/dogs`, { params: { name: nameRaza } })).data
    set((state: useDog) => ({
      ...state,
      currentPage: 1,
      allDog
    }))
  }
}
))
