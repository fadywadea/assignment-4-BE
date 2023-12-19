import express from 'express';
import { sequelize } from './database/dbConnection.js';
import userRouter from './src/modules/users/user.router.js';

const app = express();
const port = 3000;

sequelize.sync();
app.use(express.json());
app.use('/api/v1', userRouter);

// server connect
app.listen(port, () =>
  console.log(`      App listening on port... ${port}`)
);

/*
5- search for user where his name start with "a"
and age less than 30 => using like for characters
6- search for user where his age is between 20 and 30
(اكبر ٣ مستخدمين فى العمر)users oldest 3 the get - 7
8- search for users by list of ids => using IN
*/