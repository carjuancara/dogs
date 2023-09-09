import React, { useState, useEffect } from "react";
import { useDogStore } from "../../store/dogStore-origin";
import s from "./NewRaza.module.css";
import axios from "axios";
import image from "../../image/icono.jpg";

export default function NewRaza() {
  const { temperaments } = useDogStore();
  const [error, setError] = useState({});
  const [showSelectError, setShowSelectError] = useState(false);
  const [input, setInput] = useState({
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

  const handleSubmit = async (e) => {
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
          temperaments: temperaments.map((t) => parseInt(t.id)),
        });
        return result;
      };
      if (Object.entries(error).length > 0) {
        alert("ERROR: Faltan datos");
      } else {
        const message = await newDog();
        alert(message.data.message);
        setInput({
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

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const temperamentId = parseInt(e.target.value);

    const yaAgregado = input.temperaments
      ? input.temperaments.some(
          (temperamento) => temperamento.id === temperamentId
        )
      : null;

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
  };

  const hanlerClose = (temperamentoId) => {
    setInput((prevInput) => ({
      ...prevInput,
      temperaments: prevInput.temperaments.filter(
        (temperamento) => temperamento.id !== temperamentoId
      ),
    }));
  };

  const handleOpenWidget = async (e) => {
    e.preventDefault();
    const previewImage = document.getElementById("preview-image");
    let myWidget = await window.cloudinary.createUploadWidget(
      {
        cloudName: "dezvujzed",
        uploadPreset: "ymjvjtup",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;

          setInput((prevInput) => ({
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

  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = "es requerido";
    } else if (
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/\+~%\/.\w-_]*)?\??(?:\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
        input.name
      )
    ) {
      error.name = "es inválido";
    }

    if (!input.weight_min) {
      error.weight_min = "es requerido";
    } else if (!/[0-9]+/i.test(input.weight_min)) {
      error.weight_min = "es inválido";
    } else {
      if (input.weight_min < 1 || input.weight_min > 100) {
        error.weight_min = "rango de 1 a 100";
      }
    }

    if (!input.weight_max) {
      error.weight_max = "es requerido";
    } else if (!/[0-9]+/i.test(input.weight_max)) {
      error.weight_max = "es inválido";
    } else {
      if (input.weight_max < 1 || input.weight_max > 100) {
        error.weight_max = "rango de 1 a 100";
      }
    }

    if (!showSelectError) {
      setShowSelectError(false);
    }

    if (!input.year_min) {
      error.year_min = "es requerido";
    } else if (!/[0-9]+/i.test(input.year_min)) {
      error.year_min = "es inválido";
    } else {
      if (input.year_min < 1 || input.year_min > 50) {
        error.year_min = "rango de 1 a 50";
      }
    }

    if (!input.year_max) {
      error.year_max = "es requerido";
    } else if (!/[0-9]+/i.test(input.year_max)) {
      error.year_max = "es inválido";
    } else {
      if (input.year_max < 1 || input.year_max > 50) {
        error.year_max = "rango de 1 a 50";
      }
    }

    if (!input.height_min) {
      error.height_min = "es requerido";
    } else if (!/[0-9]+/i.test(input.height_min)) {
      error.height_min = "es inválido";
    } else {
      if (input.height_min < 1 || input.height_min > 100) {
        error.height_min = "rango de 1 a 100";
      }
    }

    if (!input.height_max) {
      error.height_max = "es requerido";
    } else if (!/[0-9]+/i.test(input.height_max)) {
      error.height_max = "es inválido";
    } else {
      if (input.height_max < 1 || input.height_max > 100) {
        error.height_max = "rango de 1 a 100";
      }
    }

    return error;
  }

  useEffect(() => {
    if (input.temperaments) {
      setShowSelectError(false);
    } else {
      setShowSelectError(true);
    }
  }, [input.temperaments]);

  return (
    <div className={s.container}>
      <div className={s.container_raza}>
        <div className={s.titulo}>
          <h2 className={s.h2NewDog}>Raza</h2>
        </div>
        <div className={s.container_info}>
          <div className={s.container_image}>
            <div className={s.container_foto}>
              <img
                src={!input.image ? image : input.image}
                id="preview-image"
                alt="Vista previa"
                onClick={handleOpenWidget}
              />
            </div>
          </div>
          <div className={s.container_detalle}>
            <div className={s.container_detalle_name}>
              <label>Raza</label>
              <input
                type="text"
                className={s.input_name}
                placeholder="Nombre de la raza"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              />
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
        <form action="#" className={s.formTemperaments}>
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
            <input type="button" value="Guardar" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
