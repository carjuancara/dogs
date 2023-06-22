import React, { useState } from "react";
import axios from "axios";
import s from "./NewRaza.module.css";
import { useSelector } from "react-redux";
import image from "../../image/icono.jpg";

export default function NewRaza() {
  const temperaments = useSelector((state) => state.temperaments);
  const [error, setError] = useState({});
  const [images, setImages] = useState({});
  const [imageToRemove, setImageToRemove] = useState(false);
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
        alert("ERROR: Data entry is missing");
      } else {
        const message = await newDog();
        alert(message.data.message);
      }
    } catch (err) {
      alert("error");
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
    const temperament = {
      id: document.getElementById("temperaments").options[
        document.getElementById("temperaments").selectedIndex
      ].id,
      value:
        document.getElementById("temperaments").options[
          document.getElementById("temperaments").selectedIndex
        ].value,
    };
    //console.log(temperament)
    // VALIDA QUE NO HAYA REPETIDOS
    if (temperament.id !== "0") {
      const findTemperament = input.temperaments.find(
        (t) => t.id === temperament.id
      );
      //console.log(findTemperament)
      if (!findTemperament) {
        setInput((input) => ({
          ...input,
          temperaments: [...input.temperaments, temperament],
        }));
      }
    }
  };

  const hanlerClose = (e) => {
    e.preventDefault();
    if (input.temperaments.length === 0) {
      error.temperaments = "temperaments is required";
    }
    setInput((input) => ({
      ...input,
      temperaments: input.temperaments.filter(
        (d) => d.value !== e.target.value
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

          // Actualiza la imagen en el DOM
          input.image = imageUrl;
          setImages(imageUrl);
          previewImage.src = imageUrl;
          previewImage.alt = "Vista previa de la imagen";
        }
      }
    );

    myWidget.open();
  };

  function validate(input) {
    let error = {};

    // validate NAME
    // should be just letters
    if (!input.name) {
      error.name = "is required";
    } else if (
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/\+~%\/.\w-_]*)?\??(?:\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
        input.name
      )
    ) {
      error.name = "is invalid";
    }

    // validate WEIGHT_MIN
    // only integer between 1 and 100
    if (!input.weight_min) {
      error.weight_min = "Is required";
    } else if (!/[0-9]+/i.test(input.weight_min)) {
      error.weight_min = "is invalid";
    } else {
      if (input.weight_min < 1 || input.weight_min > 100) {
        error.weight_min = "range 1 to 100";
      }
    }

    // validate WEIGHT_MAX
    // only integer between 1 and 100
    if (!input.weight_max) {
      error.weight_max = "is required";
    } else if (!/[0-9]+/i.test(input.weight_max)) {
      error.weight_max = "is invalid";
    } else {
      if (input.weight_max < 1 || input.weight_max > 100) {
        error.weight_max = "range 1 to 100";
      }
    }

    if (!input.image) {
      error.image = "is required";
    } else if (
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        input.image
      )
    ) {
      error.image = "is invalid";
    }

    if (input.temperaments.length === 0) {
      error.temperaments = ["is clean"];
    }

    if (!input.year_min) {
      error.year_min = "is required";
    } else if (!/[0-9]+/i.test(input.year_min)) {
      error.year_min = "is invalid";
    } else {
      if (input.year_min < 1 || input.year_min > 50) {
        error.year_min = "range 1 to 50";
      }
    }

    if (!input.year_max) {
      error.year_max = "is required";
    } else if (!/[0-9]+/i.test(input.year_max)) {
      error.year_max = "is invalid";
    } else {
      if (input.year_max < 1 || input.year_max > 50) {
        error.year_max = "range 1 to 50";
      }
    }

    if (!input.height_min) {
      error.height_min = "is required";
    } else if (!/[0-9]+/i.test(input.height_min)) {
      error.height_min = "is invalid";
    } else {
      if (input.height_min < 1 || input.height_min > 100) {
        error.height_min = "range 1 to 100";
      }
    }
    if (!input.height_max) {
      error.height_max = "is required";
    } else if (!/[0-9]+/i.test(input.height_max)) {
      error.height_max = "is invalid";
    } else {
      if (input.height_max < 1 || input.height_max > 100) {
        error.height_max = "range 1 to 100";
      }
    }

    return error;
  }

  return (
    <div className={s.container}>
      <div className={s.container_raza}>
        <div className={s.titulo}>
          <h2 className={s.h1NewDog}>Raza</h2>
        </div>
        <div className={s.container_info}>
          <div className={s.container_image}>
            <div className={s.container_foto}>
              <img
                src={!input.image && image}
                id="preview-image"
                alt="preview"
              />
            </div>
            <div className={s.container_boton}>
              <input
                type="button"
                value="Cambiar Imagen"
                onClick={handleOpenWidget}
              />
            </div>
          </div>
          <div className={s.container_detalle}>
            <div className={s.container_detalle_input}>
              <input
                type="text"
                className={s.input_name}
                placeholder="Nombre Raza"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              />
              {error.name && <p className={s.danger}>{error.name}</p>}
            </div>
            <div className={s.container_detalle_input}>
              <div className={s.container_input}>
                <input
                  type="number"
                  name="weight_min"
                  placeholder="peso_min"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.weight_min}
                />
                {error.weight_min && (
                  <p className={s.danger}>{error.weight_min}</p>
                )}
              </div>
              <div className={s.container_input}>
                <input
                  type="number"
                  name="weight_max"
                  placeholder="peso_max"
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
                <input
                  type="number"
                  name="height_min"
                  placeholder="altura_min"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.height_min}
                />
                {error.height_min && (
                  <p className={s.danger}>{error.height_min}</p>
                )}
              </div>
              <div className={s.container_input}>
                <input
                  type="number"
                  name="height_max"
                  placeholder="altura_max"
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
                <input
                  type="number"
                  name="year_min"
                  placeholder="año_min"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.year_min}
                />
                {error.year_min && <p className={s.danger}>{error.year_min}</p>}
              </div>
              <div className={s.container_input}>
                <input
                  type="number"
                  name="year_max"
                  placeholder="año_max"
                  className={s.detalle_input}
                  onChange={handleInputChange}
                  value={input.year_max}
                />
                {error.year_max && <p className={s.danger}>{error.year_max}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className={s.container_temperament}>
          <form action="#" className={s.formTemperaments}>
            <select name="temperaments" id="temperaments">
              <option key="0" id="0" value="Select a temperaments">
                Select a temperaments
              </option>
              {temperaments?.map((d) => (
                <option
                  key={d.id}
                  id={d.id}
                  value={d.name}
                  onClick={handleSubmitAdd}
                >
                  {d.name}
                </option>
              ))}
            </select>
            <div className={s.ErrorContainer}>
              {error.temperaments && (
                <p className={s.danger}>{error.temperaments[0]}</p>
              )}
            </div>
          </form>
          <div className={s.addTemperaments}>
            {input.temperaments?.map((d) => (
              <button
                key={d.id}
                className={s.btn}
                value={d.value}
                onClick={hanlerClose}
              >
                {" "}
                {d.value}
              </button>
            ))}
          </div>
        </div>
        {/* <div className={s.container_select}></div>
        <div className={s.container_temperament}></div> */}
        <div className={s.container_save}>
          <div className={s.container_boton}>
            <input type="button" value="Guardar" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
<div className={s.container_raza}>
        <div className={s.raza}>
          <h2 className={s.h1NewDog}>New Raza</h2>
        </div>
        <div className={s.image_detalles}>
          <div className={s.detalles}>
            <div className={s.image}>
              <img src={image} alt="not found" />
              <div className={s.input_guardar}>
                <input
                  type="button"
                  value="imagen"
                  className={s.input_guardar}
                />
              </div>
            </div>
            <div className={s.inputs}>
              <input
                className={s.detailInput_name}
                type="text"
                name="name"
                placeholder="Name Raza"
                value={input.name}
                onChange={handleInputChange}
              />
              {error.name && <p className={s.danger}>{error.name}</p>}
              <input
                className={s.detailInput}
                type="text"
                name="image"
                placeholder="image"
                value={input.image}
                onChange={handleInputChange}
              />
              {error.image && <p className={s.danger}>{error.image}</p>}

              <input
                className={s.detailInput}
                type="text"
                name="weight_min"
                placeholder="Peso Min"
                value={input.weight_min}
                onChange={handleInputChange}
              />
              {error.weight_min && (
                <p className={s.danger}>{error.weight_min}</p>
              )}

              <input
                className={s.detailInput}
                name="weight_max"
                type="number"
                value={input.weight_max}
                onChange={handleInputChange}
              />
              {error.weight_max && (
                <p className={s.danger}>{error.weight_max}</p>
              )}

              <input
                className={s.detailInput}
                placeholder="height_min"
                name="height_min"
                type="text"
                value={input.height_min}
                onChange={handleInputChange}
              />
              {error.height_min && (
                <p className={s.danger}>{error.height_min}</p>
              )}

              <input
                className={s.detailInput}
                placeholder="height max"
                name="height_max"
                type="text"
                value={input.height_max}
                onChange={handleInputChange}
              />
              {error.height_max && (
                <p className={s.danger}>{error.height_max}</p>
              )}

              <input
                className={s.detailInput}
                name="year_min"
                type="text"
                value={input.year_min}
                onChange={handleInputChange}
              />
              {error.year_min && <p className={s.danger}>{error.year_min}</p>}

              <input
                className={s.detailInput}
                name="year_max"
                type="text"
                value={input.year_max}
                onChange={handleInputChange}
              />
              {error.year_max && <p className={s.danger}>{error.year_max}</p>}
            </div>
          </div>
        </div>
      </div>
      */

/*
      <div className={s.temperaments}>
         <form action="#" className={s.formTemperaments}>
          <select name="temperaments" id="temperaments">
            <option key="0" id="0" value="Select a temperaments">
              Select a temperaments
            </option>
            {temperaments?.map((d) => (
              <option
                key={d.id}
                id={d.id}
                value={d.name}
                onClick={handleSubmitAdd}
              >
                {d.name}
              </option>
            ))}
          </select>
          <div className={s.ErrorContainer}>
            {error.temperaments && (
              <p className={s.danger}>{error.temperaments[0]}</p>
            )}
          </div>
        </form>
/*        <div className={s.addTemperaments}>
          {input.temperaments?.map((d) => (
            <button
              key={d.id}
              className={s.btn}
              value={d.value}
              onClick={hanlerClose}
            >
              {" "}
              {d.value}
            </button>
          ))}
        </div>
      </div>
      <div className={s.containerBtn}>
        <button className={s.btnSubmit} type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className={s.input_guardar}>
        <input type="button" value="Guardar" />
      </div>
*/
