import express from 'express';
import { deleteUser, findByListOfIds, getAllUsers, oldestUsers, searchUser, searchUserAge, signIn, signUp, updateUser } from './user.controller.js';

const router = express.Router();
const baseUrl = "/user";

//  Get all users && sign up
router.route(baseUrl).get(getAllUsers).post(signUp);

// Update user && Delete user
router.route('/user/:id').put(updateUser).delete(deleteUser);

// Sign in
router.post('/user/signin', signIn);

// searchUser
router.get('/searchUser', searchUser);

// search for users by list of ids
router.post('/userId', findByListOfIds);

//search for user where his age is between 20 and 30
router.get('/searchUserAge', searchUserAge);

// Get the oldest 3 users
router.get('/oldestUsers', oldestUsers);

export default router;