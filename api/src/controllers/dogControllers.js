require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperaments } = require('../db');



// obtener todas las razas de perros de la api
const getAllRazaAPI = async () => {
  /*  let response;
   const {data:{message: listBrands}} = await axios('https://dog.ceo/api/breeds/list/all')
   const brands = Object.keys(listBrands)
   const arrayBrands = brands.map(brand => (
     //`https://cdn2.thedogapi.com/images/`
     `https://dog.ceo/api/breed/${brand}/images/random`
     
   ))
   const allPhotos = await Promise.all(arrayBrands.map(async url => {
     const response = await axios.get(url);
     console.log(response.data)
     return response.data.message;
   })); */

  const allraza = await axios('https://api.thedogapi.com/v1/breeds')
  if (allraza.data.length > 0) {
    response = allraza.data.map((raza, i) => {
      return {
        ApiID: raza.id,
        name: raza.name.toLowerCase(),
        image: `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.jpg`
          ? `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.jpg`
          : `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.png`,
        //image: allPhotos[i],
        height: raza.height.metric,
        weight: raza.weight.metric,
        temperament: raza.temperament,
        year: raza.life_span
      }
    })
  }
  return response
} // -----------------------------------------------


// obtener todas las razas de perros de la BDD
const getAllRazaDB = async () => {
  const dbAllRaza = await Dog.findAll({ include: Temperaments })
  return dbAllRaza
}
// ------------------------------------------

// limpiar datos { API }
/*const cleanAPI = allRaza => {
   return allRaza.map(raza => {
    return {
      ApiID: raza.id,
      name: raza.name.toLowerCase(),
      year: raza.life_span,
      weight: raza.weight.metric,
      height: raza.height.metric,
      image: `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.png` 
      ? `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.png` 
      : `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.jpg`,
      temperament: raza.temperament
    }
  }) 
}
*/

const cleanAPI = allRaza => {
  return allRaza.map(raza => {
    return {
      ApiID: raza.id,
      name: raza.name.toLowerCase(),
      year: raza.life_span,
      weight: raza.weight.metric,
      height: raza.height.metric,
      image: raza.id !== 15 && raza.id !== 125 && raza.id !== 212 ? `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.jpg` : `https://cdn2.thedogapi.com/images/${raza.reference_image_id}.png`,
      temperament: raza.temperament
    }
  });
};


// limpiar datos { DB }
const cleanDB = allRaza => {
  return allRaza.map(raza => {
    return {
      id: raza.id,
      name: raza.name,
      year: raza.year,
      weight: raza.weight,
      height: raza.height,
      image: raza.image,
      temperament: raza.temperaments?.map(t => t.name).toString()
    }
  })
}

// limpia datos {DB por id}
const cleanDBid = raza => {
  return {
    id: raza.id,
    name: raza.name,
    year: raza.year,
    weight: raza.weight,
    height: raza.height,
    image: raza.image,
    temperament: raza.temperament?.map(t => t.name).toString()
  }
}

// obtener las razas coincidentes por nombre { API }
const getApiNameRaza = async (raza_can) => {
  const allRazaAPI = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${raza_can}`)
  const getApiName = await cleanAPI(allRazaAPI.data)
  return getApiName
}

// obtener las razas coincidentes por nombre { DB}
const getDbNameRaza = async (name) => {
  const allRazaDB = await Dog.findAll({
    where: {
      name: { [Op.substring]: name }
    },
    include: Temperaments
  }
  )
  return allRazaDB
}

// obtiene un dog de la API -- devuelve un objeto ---
const getApiIdDog = async (idRaza) => {
  const apiDogs = await getAllRazaAPI()
  return await apiDogs.find(dog => dog.id === parseInt(idRaza))
}

// obtiene un dog de la DB
const getBddIdDog = async (idRaza) => {
  const bddDog = await Dog.findByPk(idRaza, {
    include: {
      model: Temperaments,
      through: {
        attributes: []
      }
    }
  })

  return bddDog
}

module.exports = {
  getAllRazaAPI,
  getAllRazaDB,
  getDbNameRaza,
  getApiNameRaza,
  getApiIdDog,
  getBddIdDog,
  cleanAPI,
  cleanDB,
  cleanDBid
}