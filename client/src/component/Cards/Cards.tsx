import React from "react";
import s from "./Cards.module.css";
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
  const itemsPerPage = 5;

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
    <div>
      <div className={s.container}>
        {currentDogs?.map((d) => (
          <Card
            key={d.id ? d.id : d.ApiID}
            id={String(d.id ? d.id : d.ApiID)}
            name={d.name}
            image={d.image}
            year={d.year}
            temperament={typeof d.temperament === 'string' ? d.temperament.split(',') : d.temperament}
            //temperament={d.temperament}
          />
        ))}
      </div>
      <div className={s.btnPaginado}>
        <button className={s.boton} onClick={handlePrevPage}>
          {"<< Anterior "}
        </button>
        <input
          className={s.page}
          style={{ width: "100px" }}
          type="text"
          value={currentPage}
          onChange={handleGoToPage}
          onClick={handleInputClick}
        />
        <button className={s.boton} onClick={handleNextPage}>
          {" Siguiente >>"}
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
