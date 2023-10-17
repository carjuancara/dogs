import React from "react";

import { useEffect } from "react";
import Card from "../Card/Card";
import { useDogStore } from "../../store/dogStore-origin";

export default function Cards() {
  const {
    getAllDogs,
    getTemperaments,
    allDog,
    currentPage,
    GoToPage,
    UpdateCurrentPage,
  } = useDogStore();
  //const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6  ;

  // Calculamos el rango de imágenes a mostrar según la paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtramos las imágenes a mostrar en la página actual
  let currentDogs = allDog?.slice(startIndex, endIndex);

  // Calculamos la cantidad total de páginas
  const totalPages = Math.ceil(allDog.length / itemsPerPage);

  const handleNextPage = async () => {
    if (currentPage === totalPages) {
      GoToPage(1);
    } else {
      await UpdateCurrentPage(1);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage === 1) {
      GoToPage(totalPages);
    } else {
      await UpdateCurrentPage(-1);
    }
  };

  const handleGoToPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(event.currentTarget.value);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      GoToPage(pageNumber);
    }
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Selecciona todo el texto del input al hacer clic en él
    event.currentTarget.select();
  };

  useEffect(() => {
    if (currentPage !== 1) {
      GoToPage(currentPage);
    } else {
      getAllDogs();
      getTemperaments();
    }
  }, [getAllDogs, getTemperaments, currentPage, GoToPage]);

  /* useEffect(() => {
    //currentDogs = allDog;
  }, [allDog]); */
  return (
<div className="p-5 min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto py-1 px-2 sm:px-2 lg:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {currentDogs?.map((d) => (
            <Card
              key={d.id ? d.id : d.ApiID}
              id={String(d.id ? d.id : d.ApiID)}
              name={d.name}
              image={d.image}
              year={d.year}
              temperament={
                typeof d.temperament === "string"
                  ? d.temperament.split(",")
                  : d.temperament
              }
            />
          ))}
        </div>
        <div className="flex mt-5 w-4/5 mx-auto justify-center items-center font-bold py-4 gap-12">
          <button
            className="w-44 h-10 rounded-md font-bold bg-amber-400 cursor-pointer"
            onClick={handlePrevPage}
          >
            {"<< Anterior "}
          </button>
          <input
            className="flex text-center w-20 justify-center items-center rounded-lg text-black"
            //style={{ width: "70px" }}
            type="text"
            value={currentPage}
            onChange={handleGoToPage}
            onClick={handleInputClick}
          />
          <button
            className="w-44 h-10 rounded-md font-bold bg-amber-400 cursor-pointer"
            onClick={handleNextPage}
          >
            {" Siguiente >>"}
          </button>
          <p className="text-white">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>    
)
}