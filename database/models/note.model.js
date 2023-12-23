import { sequelize } from '../dbConnection.js';
import { userModel } from './user.model.js';
import { DataTypes } from 'sequelize';

export const noteModel = sequelize.define('note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(255),
  }
});

noteModel.belongsTo(userModel, { foreignKey: 'userId' });
