import { Sequelize } from "sequelize";

// Initialize sequelize with postgres database
export const sequelize = new Sequelize('session4', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});