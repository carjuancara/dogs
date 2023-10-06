import React, { useEffect, useState } from "react";
import s from "./Filter.module.css";
import { useDogStore } from "../../store/dogStore-origin";

function FilterForm({ label, options, value, onChange }) {
  return (
    <form className={s.formFilter}>
      <select name={label} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  );
}

export default function Filter() {
  const [selectedTemperament, setSelectedTemperament] = useState(
    "Select a temperament"
  );
  const [selectedOrigin, setSelectedOrigin] = useState("ALL");
  const [selectedName, setSelectedName] = useState("ASC");
  const [selectedWeight, setSelectedWeight] = useState("ASC");

  const {
    temperaments,
    filterByTemperaments,
    filterByOrigin,
    sortByName,
    getAllDogs,
    sortByWeight,
    restoreAllDogs,
    getTemperaments,
  } = useDogStore();

  useEffect(() => {
    getAllDogs();
    getTemperaments();
  }, [getAllDogs, getTemperaments]);

  useEffect(() => {
    filterByTemperaments(selectedTemperament);
  }, [selectedTemperament, filterByTemperaments]);
  useEffect(() => {
    filterByOrigin(selectedOrigin);

  }, [selectedOrigin, filterByOrigin]);

  useEffect(() => {
    sortByName(selectedName);
  }, [selectedName, sortByName]);

  useEffect(() => {
    sortByWeight(selectedWeight);
  }, [selectedWeight, sortByWeight]);

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <span className={s.title}>FILTERS</span>
        <FilterForm
          label="temperaments"
          options={["Select a temperament", ...temperaments.map((d) => d.name)]}
          value={selectedTemperament}
          onChange={async (e) => {
            await setSelectedTemperament(e.target.value);            

          }}
        />
        <FilterForm
          label="origin"
          options={["ALL", "ApiID", "DB"]}
          value={selectedOrigin}
          onChange={async (e) => {
            await setSelectedOrigin(e.target.value);            

          }}
        />
        <FilterForm
          label="name"
          options={["ASC", "DES"]}
          value={selectedName}
          onChange={async (e) => {
            await setSelectedName(e.target.value);  

          }}
        />
        <FilterForm
          label="weight"
          options={["ASC", "DES"]}
          value={selectedWeight}
          onChange={async (e) => {
            await setSelectedWeight(e.target.value);            
            
          }}
        />
        <input
          className={s.btn}
          type="button"
          value="Restore All"
          onClick={() => restoreAllDogs()}
        />
      </div>
    </div>
  );
}
