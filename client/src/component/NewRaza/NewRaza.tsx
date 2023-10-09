import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDogStore } from "../../store/dogStore-origin";
import s from "./NewRaza.module.css";
import axios from "axios";
import image from "../../image/icono.jpg";




interface Temperament {
  id: number;
  name: string;
}

interface InputInterface {
  id: number;
  name: string;
  image: string;
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      if (Object.keys(error).length > 0) {
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

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value) return "Es requerido";
        if (!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/\+~%\/.\w-_]*)?\??(?:\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(value)) {
          return "Es inválido";
        }
        return undefined;
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

  /* const handleSubmitAdd = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const temperamentId = parseInt(e.target.value);
 
    const yaAgregado = input.temperaments.some(
      (temperamento) => temperamento.id === temperamentId
    );
 
    if (!yaAgregado && temperamentId !== 0) {
      const temperamentoSeleccionado = temperaments.find(
        (temperamento) => temperamento.id === temperamentId
      );
 
      setInput((inputAnterior) => ({
        ...inputAnterior,
        temperaments: [...inputAnterior.temperaments, temperamentoSeleccionado],
      }));
    }
 
    if (showSelectError) {
      setShowSelectError(false);
    }
  }; */

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


  const hanlerClose = (temperamentoId: number) => {
    setInput((prevInput) => ({
      ...prevInput,
      temperaments: prevInput.temperaments.filter(
        (temperamento) => temperamento.id !== temperamentoId
      ),
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.container_raza}>
        <div className={s.titulo}>
          <h2 className={s.h2NewDog}>Raza</h2>
        </div>
        <div className={s.container_info}>
          <div className={s.container_image}>
            <div className={s.container_foto}>
              <button onClick={handleOpenWidget}>
                <img
                  src={!input.image ? image : input.image}
                  id="preview-image"
                  alt="Vista previa"
                />
              </button>
            </div>
          </div>
          <div className={s.container_detalle}>
            <div className={s.container_detalle_name}>
              <br />
              <input
                type="text"
                className={s.input_name}
                placeholder="Nombre de la raza"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              />
              {/* {error.name && typeof error.name === 'string' && <p className={s.danger}>{error.name}</p>} */}

              {error.name && <p className={s.danger}>{error.name}</p>}
            </div>
            <div className={s.container_detalle_input}>
              <div className={s.container_input}>
                <label>Altura mínima</label>
                <input
                  type="number"
                  name="weight_min"
                  placeholder="Peso mínimo"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.weight_min}
                />
                {error.weight_min && (
                  <p className={s.danger}>{error.weight_min}</p>
                )}
              </div>
              <div className={s.container_input}>
                <label>Altura máxima</label>
                <input
                  type="number"
                  name="weight_max"
                  placeholder="Peso máximo"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.weight_max}
                />
                {error.weight_max && (
                  <p className={s.danger}>{error.weight_max}</p>
                )}
              </div>
            </div>
            <div className={s.container_detalle_input}>
              <div className={s.container_input}>
                <label>Peso mínimo</label>
                <input
                  type="number"
                  name="height_min"
                  placeholder="Altura mínima"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.height_min}
                />
                {error.height_min && (
                  <p className={s.danger}>{error.height_min}</p>
                )}
              </div>
              <div className={s.container_input}>
                <label>Peso máximo</label>
                <input
                  type="number"
                  name="height_max"
                  placeholder="Altura máxima"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.height_max}
                />
                {error.height_max && (
                  <p className={s.danger}>{error.height_max}</p>
                )}
              </div>
            </div>
            <div className={s.container_detalle_input}>
              <div className={s.container_input}>
                <label>Año mínimo</label>
                <input
                  type="number"
                  name="year_min"
                  placeholder="Año mínimo"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.year_min}
                />
                {error.year_min && <p className={s.danger}>{error.year_min}</p>}
              </div>
              <div className={s.container_input}>
                <label>Año máximo</label>
                <input
                  type="number"
                  name="year_max"
                  placeholder="Año máximo"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.year_max}
                />
                {error.year_max && <p className={s.danger}>{error.year_max}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.container_temperament}>
        <form onSubmit={handleSubmit} action="#" className={s.formTemperaments}>
          <select id="temperaments" onChange={handleSubmitAdd}>
            <option key="0" value="Temperamentos" />
            {temperaments?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <div className={s.ErrorContainer}>
            {showSelectError && (
              <p className={s.danger}>Selecciona un temperamento</p>
            )}
          </div>
        </form>
        <div className={s.addTemperaments}>
          {input.temperaments?.map((d) => (
            <button
              key={d.id}
              className={s.btn}
              value={d.name}
              onClick={() => hanlerClose(d.id)}
            >
              {" "}
              {d.name}
            </button>
          ))}
        </div>
        <div className={s.container_save}>
          <div className={s.container_boton}>
            <input type="submit" value="Guardar" />
          </div>
        </div>
      </div>
    </div>
  );
}
