import { sequelize } from "../dbConnection.js";
import { DataTypes } from 'sequelize';

export const userModel = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
  },
  age: {
    type: DataTypes.INTEGER,
  }
});