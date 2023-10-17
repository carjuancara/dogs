import React, { useState, ChangeEvent } from "react";
import { useDogStore } from "../../store/dogStore-origin";
import axios from "axios";
import image from "../../image/icono.jpg";



interface Temperament {
  id: number;
  name: string;
}

interface InputInterface {
  id: number;
  name: string;
  image?: string;
  weight_min: number;
  weight_max: number;
  height_min: number;
  height_max: number;
  year_min: number;
  year_max: number;
  temperaments: Temperament[];
}

interface ValidationError {
  name?: string;
  weight_min?: string;
  weight_max?: string;
  year_min?: string;
  year_max?: string;
  height_min?: string;
  height_max?: string;
}

export default function NewRaza() {
  const { temperaments } = useDogStore();
  const [error, setError] = useState<ValidationError>({});
  const [showSelectError, setShowSelectError] = useState(false);
  const [input, setInput] = useState<InputInterface>({
    id: 0,
    name: "",
    image: "",
    weight_min: 0,
    weight_max: 0,
    height_min: 0,
    height_max: 0,
    year_min: 0,
    year_max: 0,
    temperaments: [],
  });

  const handleOpenWidget = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const previewImage = document.getElementById("preview-image") as HTMLImageElement;

    let myWidget = await (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dezvujzed",
        uploadPreset: "ymjvjtup",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;

          setInput((prevInput: InputInterface) => ({
            ...prevInput,
            image: imageUrl,
          }));

          previewImage.src = imageUrl;
          previewImage.alt = "Vista previa de la imagen";
        }
      }
    );

    myWidget.open();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const newDog = async () => {
        const {
          name,
          image,
          weight_min,
          weight_max,
          height_min,
          height_max,
          year_min,
          year_max,
          temperaments,
        } = input;

        const result = await axios.post("/dogs", {
          name,
          image,
          weight_min,
          weight_max,
          height_min,
          height_max,
          year_min,
          year_max,
          temperaments: temperaments.map((t) => t.id),
        });
        return result;
      };

      if (error.name || error.height_max || error.height_min || error.weight_max || error.weight_min || error.year_max || error.year_min) {
        alert("ERROR: Faltan datos");
      } else {
        const message = await newDog();
        alert(message.data.message);
        setInput({
          id: 0,
          name: "",
          image: "",
          weight_min: 0,
          weight_max: 0,
          height_min: 0,
          height_max: 0,
          year_min: 0,
          year_max: 0,
          temperaments: [],
        });
      }
    } catch (err) {
      alert("Error");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: validateField(name, value),
    }));
  };
  //validar entradas
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value) return "Es requerido";
        if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/\+~%\/.\w-_]*)?\??(?:\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(value)) {
          return "Es inválido";
        } else {
          return undefined;
        }
      case "weight_min":
      case "weight_max":
      case "year_min":
      case "year_max":
      case "height_min":
      case "height_max":
        if (!value) return "Es requerido";
        if (!/^[0-9]+$/i.test(value)) return "Es inválido";
        const numValue = parseInt(value);
        if (numValue < 1 || numValue > 100) return "Rango de 1 a 100";
        return undefined;
      default:
        return undefined;
    }
  };
  // agregar boton al textarea
  const handleSubmitAdd = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const temperamentId = parseInt(e.target.value);
    const yaAgregado = input.temperaments.some(
      (temperamento) => temperamento.id === temperamentId
    );
    if (!yaAgregado && temperamentId !== 0) {
      const temperamentoSeleccionado = temperaments.find(
        (temperamento) => temperamento.id === temperamentId
      );
      if (temperamentoSeleccionado) {
        setInput((inputAnterior) => ({
          ...inputAnterior,
          temperaments: [...inputAnterior.temperaments, temperamentoSeleccionado],
        }));
      }
    }
    if (showSelectError) {
      setShowSelectError(false);
    }
  };

  // quitar boton del textarea
  const hanlerClose = (temperamentoId: number) => {
    setInput((prevInput) => ({
      ...prevInput,
      temperaments: prevInput.temperaments.filter(
        (temperamento) => temperamento.id !== temperamentoId
      ),
    }));
  };

  return (
    <div className="flex justify-start bg-gray-800 text-black h-[40.3vw]">
      <div className="flex flex-col max-w-3xl">
        <div className="flex h-9 w-screen justify-center items-center">
          <h2 className="text-white text-4xl font-bold ">Nueva Raza</h2> {/* h2NewDog */}
        </div>
        <div className="flex justify-around items-center w-[800px] h-[450px]">
          <div className="flex flex-col items-center justify-around h-72 w-56 "> {/*s.container_image*/}
            <button onClick={handleOpenWidget}>
              <img
                src={!input.image ? image : input.image}
                id="preview-image"
                className="w-full h-auto rounded-3xl"
                alt="Vista previa"
              />
            </button>
          </div>
          <div className="flex pt-10 flex-col items-center w-[400px] h-[432px] border-2 border-solid border-gray-500 rounded-xl"> {/*s.container_detalle*/}
            <input
              type="text"
              className=" w-96 rounded-md"
              placeholder="Nombre de la raza"
              name="name"
              onChange={handleInputChange}
              value={input.name}
            />
            {error.name && <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.name}</p>}
            <div className="flex mt-5 justify-between w-96"> {/* {s.container_detalle_input} */}
              <div className="flex flex-col"> {/* s.container_input */}
                <label className="text-white">Altura mínima</label>
                <input
                  type="number"
                  name="weight_min"
                  placeholder="Peso mínimo"
                  className="w-36 rounded-md" //{s.detalle_input}
                  onChange={handleInputChange}
                  value={input.weight_min}
                />
                {error.weight_min && (
                  <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.weight_min}</p>
                )}
              </div>
              <div className="flex flex-col"> {/* {s.container_input} */}
                <label className="text-white">Altura máxima</label>
                <input
                  type="number"
                  name="weight_max"
                  placeholder="Peso máximo"
                  className="w-36 rounded-md" //{s.detalle_input}
                  onChange={handleInputChange}
                  value={input.weight_max}
                />
                {error.weight_max && (
                  <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.weight_max}</p>
                )}
              </div>
            </div>
            <div className="flex mt-5 justify-between w-96"> {/* {s.container_detalle_input} */}
              <div className="flex flex-col">{/* {s.container_input} */}
                <label className="text-white">Peso mínimo</label>
                <input
                  type="number"
                  name="height_min"
                  placeholder="Altura mínima"
                  className="w-36 rounded-md" //{s.detalle_input}
                  onChange={handleInputChange}
                  value={input.height_min}
                />
                {error.height_min && (
                  <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.height_min}</p>
                )}
              </div>
              <div className="flex flex-col">{/* {s.container_input} */}
                <label className="text-white">Peso máximo</label>
                <input
                  type="number"
                  name="height_max"
                  placeholder="Altura máxima"
                  className="w-36 rounded-md" //{s.detalle_input}
                  onChange={handleInputChange}
                  value={input.height_max}
                />
                {error.height_max && (
                  <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.height_max}</p>
                )}
              </div>
            </div>
            <div className="flex mt-5 justify-between w-96"> {/* {s.container_detalle_input} */}
              <div className="flex flex-col">{/* {s.container_input} */}
                <label className="text-white">Año mínimo</label>
                <input
                  type="number"
                  name="year_min"
                  placeholder="Año mínimo"
                  className="w-36 rounded-md" //{s.detalle_input}
                  onChange={handleInputChange}
                  value={input.year_min}
                />
                {error.year_min && <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.year_min}</p>}
              </div>
              <div className="flex flex-col">{/* {s.container_input} */}
                <label className="text-white">Año máximo</label>
                <input
                  type="number"
                  name="year_max"
                  placeholder="Año máximo"
                  className="w-36 rounded-md" //{s.detalle_input}
                  onChange={handleInputChange}
                  value={input.year_max}
                />
                {error.year_max && <p className="text-sm text-red-600 w-32"/* {s.danger} */>{error.year_max}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-start h-[432px] gap-4 mt-11 ml-10 border-2 border-solid border-gray-500 rounded-lg">
        <form action="#" className="flex flex-col ml-7 h-[6vh] rounded-lg justify-around">
          <label className=" text-white">
            Temperamentos
          </label>
          <select id="temperaments" onChange={handleSubmitAdd} className="rounded-lg mb-4">
            {/* <option key="0" value="Temperamentos" /> */}
            {temperaments?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
            {showSelectError && (
              <p className="text-sm text-red-600 w-32">Selecciona un temperamento</p>
            )}
          <div>
          </div>
        </form>
        <div className="flex justify-evenly content-evenly flex-wrap ml-[2vw] w-[36vw] h-[27vh] bg-white text-black rounded-lg">
          {input.temperaments?.map((d) => (
            <button
              key={d.id}
              className="px-3 w-min h-12 rounded-lg bg-yellow-500 font-bold text-white cursor-pointer"
              value={d.name}
              onClick={() => hanlerClose(d.id)}
            >
              {" "}{d.name}
            </button>
          ))}
        </div>
        <div className="flex items-center mt-8 justify-end w-[600px] h-9">
          <div className="flex mt-4 mr-4 font-bold text-xl justify-center items-center w-48 h-9 rounded-lg text-white bg-yellow-500 hover:cursor-pointer">
            <button
              onClick={handleSubmit}
              className="w-min h-8 rounded-lg bg-yellow-500 font-bold text-white cursor-pointer"
            >
              Guardar
            </button>

          </div>
        </div>
      </div>
    </div>

  );
}

