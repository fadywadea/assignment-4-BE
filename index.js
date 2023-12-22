import express from 'express';
// import { sequelize } from './database/dbConnection.js';
import userRouter from './src/modules/users/user.router.js';
// import noteRouter from './src/modules/notes/note.router.js';

const app = express();
const port = 3000;

// sequelize.sync();
app.use(express.json());
app.use('/api/v1', userRouter);
// app.use('/api/v1', noteRouter);


// server connect
app.listen(port, () =>
  console.log(`App Listening On Port ${port}`)
);