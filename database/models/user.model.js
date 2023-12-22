import { sequelize } from "../dbConnection.js";
import { DataTypes } from 'sequelize';
// import { noteModel } from "./note.model.js";

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
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// export let userSchema = userModel.hasMany(noteSchema, {
//   foreignKey: 'user_id',
//   as: 'note'
// });

sequelize.sync();