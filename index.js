import express from 'express';
import { sequelize } from './database/dbConnection.js';
import userRouter from './src/modules/users/user.router.js';
import noteRouter from './src/modules/notes/note.router.js';

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

sequelize.sync();

// Mounting routers to the application
app.use('/api/v1', userRouter);
app.use('/api/v1', noteRouter);

// Server connect
app.listen(port, () =>
  console.log(`Listening ${port}`)
);