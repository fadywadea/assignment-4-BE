import express from 'express';
import { deleteUser, findByListOfIds, getAllUsers, searchUser, searchUserAge, signIn, signUp, updateUser } from './user.controller.js';

const userRouter = express.Router();
const baseUrl = "/user";
const baseUrlId = "/user/:id";

//  Get all users && sign up
userRouter.route(baseUrl).get(getAllUsers).post(signUp);

// Update user && Delete user
userRouter.route(baseUrlId).put(updateUser).delete(deleteUser);

// Sign in
userRouter.post('/user/signin', signIn);

// searchUser
userRouter.get('/searchUser',searchUser)

// search for users by list of ids
userRouter.post('/userId', findByListOfIds)

//search for user where his age is between 20 and 30
userRouter.get('/searchUserAge',searchUserAge)

export default userRouter;