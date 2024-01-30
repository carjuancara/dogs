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

interface useDog {
  allDog: responseDog[];
  backupDog: responseDog[];
  currentPage: number;
  temperaments: objectTemperament[];
  temperamentByRaza: object[];
  filterTemperaments: string;
  filterWeight: string;
  filterName: string;
  filterOrigin: string;
  UpdateCurrentPage: (value: number) => void;
  GoToPage: (value: number) => void;
  searchTemperaments: (temp: []) => void;
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
  currentPage: 1, // pagina actual 
  temperaments: [], // listado de todos los temperamentos de las razas de perro
  temperamentByRaza: [], //listado de los temperamentos con sus ID cargarlos en div
  filterTemperaments: "ALL", // FILTRO todos los temperamentos
  filterWeight: "ASC",  // FILTRO raza por peso ascendente
  filterName: "ASC",  // FILTRO raza por nombre ascendente
  filterOrigin: "ALL", // FILTRO de raza por origen: API | DB | ALL
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
    const allDog = await (await axios(`http://localhost:3001/dogs`, { params: { name: nameRaza } })).data
    set((state: useDog) => ({
      ...state,
      currentPage: 1,
      allDog
    }))
  }
}
))
