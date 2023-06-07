const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;

const getApiTemperaments = async () => {
    const allApiRaza = await axios('https://api.thedogapi.com/v1/breeds')
    const allRaza = await allApiRaza.data
    let uniques = new Set(allRaza.map(p => p.temperament?.split(', ')).flatMap(un => un))
    uniques = [...uniques]
    const temperaments = uniques.filter(u => u !== undefined)
    
    return temperaments.map(t => {
        return {
            name: t
        }
    })

}

module.exports = getApiTemperaments

