// import { sequelize } from '../dbConnection.js';
// import { DataTypes } from 'sequelize';
// import { userSchema, userModel } from './user.model.js';

// export const noteModel = sequelize.define('note', {
//   title: {
//     type: DataTypes.STRING(255),
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.STRING(255),
//     allowNull: false
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: userModel.user,
//       key: "id"
//     },
//   },
// });

// export const noteSchema = noteModel.belongsTo(userSchema, {
//   foreignKey: 'user_id',
//   as: 'owner'
// })
// sequelize.sync();
