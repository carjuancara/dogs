require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Dog } = require('../db');
const { getAllRazaAPI, getAllRazaDB, getApiNameRaza, getDbNameRaza, getApiIdDog, getBddIdDog, cleanDB, cleanDBid } = require('../controllers/dogControllers');


/* 
📍 GET | /dogs
Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.
*/
const handleDogsAll = async (req, res) => {
  const { name } = req.query
  try {
    if (!name) {
    
      const apiAllRaza = await getAllRazaAPI()
      const dbAllRaza = await getAllRazaDB()
      const dbRaza = await cleanDB(dbAllRaza)
      const allRaza = [...apiAllRaza, ...dbRaza]
      return res.status(200).json(allRaza)
    } else {

      const apiNameRaza = await getApiNameRaza(name.toLowerCase())
      const dbNameRaza = await getDbNameRaza(name.toLowerCase())
      const dbAllName = await cleanDB(dbNameRaza)
      const allNameRaza = [...apiNameRaza, ...dbAllName]
      return res.status(200).json(allNameRaza)
    }
  } catch (error) {
    
    res.status(400).json({ message: error.message })
  }
}


// -------------------------------------------------------


const handleDogById = async (req, res) => {
  const { idRaza } = req.params;

  try {
    let findDog;
    if (idRaza.length < 4) {
      findDog = await getApiIdDog(idRaza)
    } else {
      findDog = await getBddIdDog(idRaza)
      findDog = cleanDBid(findDog)
    }
    return res.status(200).json(findDog)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}



const handleDogCreate = async (req, res) => {
  const { name, image, height_min, height_max, weight_min, weight_max, year_min, year_max, temperaments } = req.body;
  try {
    let newDog;
    if (!name || !image || !height_min || !height_max || !weight_min || !weight_max || !year_min || !year_max || temperaments.length === 0) {
      return res.status(400).json({ Error: 'Missing data', data: { name, image, height_min, height_max, weight_max, weight_min, year_max, year_min, temperaments } })
    } else {
      const itDog = await Dog.findOne({
        where: {
          name: name
        }
      })
      if (itDog===null) {

        newDog = await Dog.create({
          name,
          image,
          height_min,
          height_max,
          weight_min,
          weight_max,
          year_min,
          year_max,
        })
        newDog.addTemperaments(temperaments)
        res.status(201).json({ message: 'the breed has been successfully created', Dog: newDog })
      } else {
        res.status(200).json({ message: 'the breed already exists', Dog: itDog })
      }
    }

  } catch (error) {
    return res.status(400).json({ Error: error.message })
  }
}


module.exports = {
  handleDogsAll,
  handleDogById,
  handleDogCreate
}