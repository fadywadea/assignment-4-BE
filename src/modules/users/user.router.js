import express from 'express';
import { deleteUser, findByListOfIds, getAllUsers, signIn, signUp, updateUser } from './user.controller.js';

const userRouter = express.Router();
const baseUrl = "/user";
const baseUrlId = "/user/:id";

//  Get all users && sign up
userRouter.route(baseUrl).get(getAllUsers).post(signUp);

// Sign in && Update user && Delete user
userRouter.route(baseUrlId).get(signIn).put(updateUser).delete(deleteUser);
userRouter.get('/userId', findByListOfIds)

export default userRouter;