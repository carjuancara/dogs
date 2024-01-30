const { Op } = require('sequelize');
const { Dog, Temperaments } = require('../db');

// obtener todas las razas de perros de la BDD
const getAllRazaDB = async () => {
  const dbAllRaza = await Dog.findAll({ include: Temperaments })
  return dbAllRaza
}

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
    temperament: (
      raza.temperaments?.map(t => t.name + ' ').toString()
    )
  }
}

// obtener las razas coincidentes por nombre { DB}
const getDbNameRaza = async (name) => {
  const allRazaDB = await Dog.findAll({
    where:{
        name:
        {[Op.iLike]:`%${name}%`}
    },
    include:Temperaments
  }
    
  )
  return allRazaDB
}

// obtiene un dog de la DB
const getBddIdDog = async (idRaza) => {
  console.log('linea 141: dogControllers')
  const bddDog = await Dog.findByPk(idRaza, {
    include: {
      model: Temperaments,
      through: {
        attributes: []
      }
    }
  })
  console.log('DB_by_id: ', bddDog.toJSON())
  return bddDog
}

module.exports = {
  getAllRazaDB,
  getDbNameRaza,
  getBddIdDog,
  cleanDB,
  cleanDBid
}