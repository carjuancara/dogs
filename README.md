# Proyecto | **DOGS v2**

## **📌 OBJETIVOS**

- Construir una Single Page Application utlizando las tecnologías: **React**, **Zustand**, **Typescript**, **TailwindCss** ,**Node**, **Express** y **Sequelize**.
- Prácticar TailwindCss (UX : UI).
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- agregar typescript

<br />

## **📖 ENUNCIADO GENERAL**

La idea de este proyecto es mejorar los estilos y practicar typescript en la aplicación web de la DOG-V1

- Buscar perros.
- Visualizar la información de los perros.
- Filtrarlos.
- Ordenarlos.
- Crear nuevos perros.

**IMPORTANTE**: para poder utilizar la API es necesario crear una cuenta y obtener una ApiKey que luego deberá ser incluida en todos los request. Esto se logra simplemente agregando **`?api_key={YOUR_API_KEY}`** al final de cada end-point.

<br />

### **🖱 BASE DE DATOS**

Se creara dos modelos para la base de datos. Una será para las razas de perros y la otra será para los temperamentos. La relación entre ambos modelos sera de muchos a muchos. Las propiedades que tendra cada modelo.

**📍 MODELO 1 | Dogs**

- ID.\*
- Imagen.\*
- Nombre.\*
- Altura.\*
- Peso.\*
- Años de vida.\*

<br />

**📍 MODELO 2 | Temperaments**

- ID.\*
- Nombre.\*

---

<br />

### **🖱 BACK-END**

Para esta parte construire un servidor utilizando **NodeJS** y **Express**. Lo conectare con la base de datos mediante **Sequelize**.

El servidor contara con las siguientes rutas:

#### **📍 GET | /dogs**

- Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

#### **📍 GET | /dogs/:idRaza**

- Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
- La raza es recibida por parámetro (ID).
- Tiene que incluir los datos de los temperamentos asociadas a esta raza.
- Debe funcionar tanto para los perros de la API como para los de la base de datos.

#### **📍 GET | /dogs/name?="..."**

- Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
- Debe poder buscarlo independientemente de mayúsculas o minúsculas.
- Si no existe la raza, debe mostrar un mensaje adecuado.
- Debe buscar tanto los de la API como los de la base de datos.

#### **📍 POST | /dogs**

- Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
- Toda la información debe ser recibida por body.
- Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

#### **📍 GET | /temperaments**

- Obtiene todos los temperamentos existentes.
- Estos deben ser obtenidos de la API. Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

<br />

---

<br />

### **🖱 FRONT-END**

Se debe desarrollar una aplicación utilizando **React** y **Zustand** que contenga las siguientes vistas:

**📍 LANDING PAGE |** deberás crear una página de inicio o bienvenida con:

- Alguna imagen de fondo representativa al proyecto.
- Botón para ingresar a la **`home page`**.

<br />

**📍 HOME PAGE |** la página principal de tu SPA debe contener:

- SearchBar: un input de búsqueda para encontrar razas de perros por nombre.
- Sector en el que se vea un listado de cards con los perros. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta **`GET /dogs`** y deberá mostrar su:
  - Imagen.
  - Nombre.
  - Temperamentos.
- Cuando se le hace click a una Card deberá redirigir al detalle de esa raza específica.
- Botones/Opciones para **filtrar** por temperamentos, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
- Botones/Opciones para **ordenar** tanto ascendentemente como descendentemente las razas de perros por orden alfabético y por peso.
- Paginado: el listado de razas de perros se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 5 perros por página.

<br/>

**⚠️ IMPORTANTE**: se deben mostrar tanto las razas de perros traidas desde la API como así también las de la base de datos. **Solamente se pueden guardar aquellas creadas desde el form**.

<br />

**📍 DETAIL PAGE |** en esta vista se deberá mostrar toda la información específica de un perro:

- ID.
- Imagen.
- Nombre.
- Altura.
- Peso.
- Temperamentos.
- Años de vida.

<br />

**📍 FORM PAGE |**: en esta vista se encontrará el formulario para crear una nueva raza de perro.

Este formulario sera **controlado completamente con JavaScritp**. Debe contar con los siguientes campos:

- Nombre.
- Altura **(diferenciar entre altura mínima y máxima de la raza)**.
- Peso **(diferenciar entre peso mínimo y máximo de la raza)**.
- Años de vida.
- Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
- Botón para crear la nueva raza.

<br />
