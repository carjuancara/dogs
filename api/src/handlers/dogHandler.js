const { Dog } = require('../db');

// API controllers
const { getAllRazaAPI, getApiIdDog, getApiNameRaza } = require('../controllers/ApiDogController')

// DB controllers
const {getAllRazaDB, getDbNameRaza, getBddIdDog, cleanDB, cleanDBid} = require('../controllers/DbDogController')

// trae todos las razas de perros (DB y API)
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
// trae una raza de perro de (DB o API)
const handleDogById = async (req, res) => {
  const { idRaza } = req.params;
  console.log('linea 42: idRaza', idRaza, "es de tipo String: ", typeof idRaza ==='string')
  try {
    let findDog;
    if (idRaza.length === 36) {
      findDog = await getBddIdDog(idRaza)
      findDog = cleanDBid(findDog)
    } else {
      findDog = await getApiIdDog(idRaza)
    }
    return res.status(200).json(findDog)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}
// crea una raza de perros nueva en la DB
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
// modifica una raza de perros (solo de DB)
const handleDogUpdate = async (req, res) => {
  const { id, name, image, height_min, height_max, weight_min, weight_max, year_min, year_max, temperaments } = req.body
  
  const updateDog = Dog.update(
    {
      name, image, height_min, height_max, weight_min, weight_max, year_min, year_max, temperaments
    }, {
    where: {
      id: id
    }
  })
  res.status(200).json({msg:`la raza ${name} se ha actualizado!`})
}
module.exports = {
  handleDogsAll,
  handleDogById,
  handleDogCreate,
  handleDogUpdate
}