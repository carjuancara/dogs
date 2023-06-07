const { Temperaments } = require('../db');
const getApiTemperaments = require('../controllers/temperamentsControllers')


const allTemperaments = async (req, res) => {

  try {
    const allTemperamentDB = await Temperaments.findAll()
    if (allTemperamentDB.length > 0) {
      return res.status(200).json({ Message: 'List of temperaments', Temperaments: allTemperamentDB })
    } else {
      const temperaments = await getApiTemperaments()
      await Temperaments.bulkCreate(temperaments)
      return res.status(201).json({ Message: 'List of temperaments', Temperaments: temperaments })
    }

  } catch (error) {
    return res.status(400).json({ Message: error.message })
  }
}

module.exports = allTemperaments