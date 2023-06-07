const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toLowerCase())
      },
      validate: {
        notEmpty: true,
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    year_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
        max: 99
      }
    },
    year_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
        max: 99
      }
    },
    year: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.year_min} to ${this.year_max} years`;
      },
      set(value) {
        throw new Error('Do not try to set the `year` value!');
      }
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {

      }
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {

      }
    },
    weight: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.weight_min} - ${this.weight_max} weight`;
      },
      set(value) {
        throw new Error('Do not try to set the `weigth` value!');
      }
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    height: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.height_min} - ${this.height_max} height`;
      },
      set(value) {
        throw new Error('Do not try to set the `height` value!');
      }
    }
  }, {
    timestamps: false
  })
}
