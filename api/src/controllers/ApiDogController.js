require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');


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



const cleanAPI = allRaza => {
    if (!Array.isArray(allRaza)) {
      return {
        ApiID: allRaza.id,
        name: allRaza.name?.toLowerCase(),
        year: allRaza.life_span,
        weight: allRaza.weight.metric,
        height: allRaza.height.metric,
        image: allRaza.id !== 15 && allRaza.id !== 125 && allRaza.id !== 212 ? `https://cdn2.thedogapi.com/images/${allRaza.reference_image_id}.jpg` : `https://cdn2.thedogapi.com/images/${allRaza.reference_image_id}.png`,
        temperament: allRaza.temperament
      }
    } else {
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
      })
    }
  }

  // obtener las razas coincidentes por nombre { API }
const getApiNameRaza = async (raza_can) => {
    const allRazaAPI = await (await axios(`https://api.thedogapi.com/v1/breeds/search?q=${raza_can}`)).data
    const getApiName = await cleanAPI(allRazaAPI)
    return getApiName
  }

  // obtiene un dog de la API -- devuelve un objeto ---
const getApiIdDog = async (idRaza) => {
    const apiDogs = await axios(`https://api.thedogapi.com/v1/breeds/${idRaza}`)
    const cleanedAPI = await cleanAPI(apiDogs.data)
    return cleanedAPI
  }



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

module.exports = {
    getAllRazaAPI,
    getApiIdDog,
    getApiNameRaza,
    cleanAPI
}