import { useEffect, useState } from "react";
import { useDogStore } from '../../store/dogStore-origin';

interface Filters {
  label: string,
  options: string[],
  value: string,
  onChange: (e: any) => void
}

function FilterForm(prop: Filters) {
  return (
    <form className="flex border-4 rounded-lg bg-gray-900 font-bold text-black"> {/* formFilter */}
      <select name={prop.label} value={prop.value} onChange={prop.onChange}>
        {prop.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </form>
  )
}

export default function Filter() {
  const [selectedName, setSelectedName] = useState("ASC");
  const [selectedWeight, setSelectedWeight] = useState("ASC");
  const [selectedOrigin, setSelectedOrigin] = useState("ALL");
  const [selectedTemperament, setSelectedTemperament] = useState(
    "Select a temperament"
  );
  
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
    sortByWeight(selectedWeight)
  }, [selectedWeight, sortByWeight]);

  return (
    <div className="flex bg-gray-800 h-14 "> {/* container */}
      <div className="flex text-lg items-center w-4/5 no-underline list-none justify-evenly"> {/* filters */}
        <span className=" ml-32 text-3xl text-white font-bold">FILTERS</span> {/* title */}
        <FilterForm
          label="temperaments"
          options={["Select a temperament", ...temperaments.map((t: any) => t.name)]}
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
          className=" ml-1 font-bold rounded-lg bg-yellow-500 px-lg w-44 h-8 cursor-pointer"
          type="button"
          value="Restaurar Todos"
          onClick={() => restoreAllDogs()}
        />
      </div>
    </div>
  );
}
