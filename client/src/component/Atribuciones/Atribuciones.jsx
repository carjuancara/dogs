import s from "./Atribuciones.module.css";

export default function Atribuciones() {
  return (
    <div className={s.container}>
      <div className={s.container_title}>
        <h2 className={s.title}>Atribuciones</h2>
        <div className={s.container_atribuciones}>
          <div className={s.detail_atribuciones}>
            <p>
              Todas las fotos pertenecen a sus respectivos propietarios, aqui se
              hacen las respectivas atribuciones a cada uno de ellos Foto de{" "}
            </p>

            <a href="https://unsplash.com/es/fotos/2k6v10Y2dIg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
              Mia Anderson en Unsplash
            </a>
            <a href="https://unsplash.com/es/fotos/CLyKy1xvjJc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
              Foto de Gaëtan Werp en Unsplash
            </a>
            <a href="https://unsplash.com/es/fotos/NE0XGVKTmcA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
              Foto de Karsten Winegeart en Unsplash
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
