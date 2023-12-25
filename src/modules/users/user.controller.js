import { userModel } from "../../../database/models/user.model.js";
import { Op } from 'sequelize';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json({ message: "All users", users });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
}

// Sign up
export const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await userModel.findAll({ where: { email: email } });
    if (!existUser.length) {
      await userModel.create(req.body);
      res.status(201).json({ message: "Account created successfully!" });
    } else {
      res.status(400).json({ message: "Email already existed!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
}

// Sign in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    user ?
      user.dataValues.password == password ?
        res.status(200).json(`welcome ${user.dataValues.name}`) :
        res.status(401).json('password is incorrect!') :
      res.status(404).json({ message: 'Invalid email' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await userModel.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "No such user found." });
    } else {
      const { email } = req.body;
      const existUser = await userModel.findAll({ where: { email: email } });
      if (!existUser.length) {
        await user.update(req.body);
        res.status(200).json(user);
      } else {
        res.status(409).json({ message: "This email is already existed." });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
};


// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.destroy({ where: { id } });
    !user ?
      res.status(500).json({ message: "The user cannot be deleted." }) :
      res.status(200).json({ message: "Successfully deleted the user." });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
};

// search for user where are name and age
export const searchUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const search = await userModel.findAll(
      {
        attributes: {
          exclude: ['email', 'password', 'createdAt', 'updatedAt']
        },
        where: {
          [Op.and]: {
            name: { [Op.startsWith]: `${name}` },
            age: { [Op.lte]: age }
          }
        }
      });
    search.length ?
      res.status(200).json(search) :
      res.status(404).json({ message: "no found user" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
}

// search for user where his age is between 20 and 30
export const searchUserAge = async (req, res) => {
  try {
    let searchAge = await userModel.findAll(
      {
        where: {
          age: { [Op.between]: [20, 30] }
        }
      });
    searchAge ?
      res.status(200).json(searchAge) :
      res.status(404).json("No users with this range of ages.")
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: `Error in server: ${e}` });
  }
}

// search for users by list of ids => using IN?
export const findByListOfIds = async (req, res) => {
  try {
    const user = await userModel.findAll({
      where: {
        id: { [Op.in]: req.body.id }
      }
    })
    if (!user.length) {
      res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: `Error in server: ${e}` });
  }
};

// Get the oldest 3
export const oldestUsers = async (req, res) => {
  const oldestUser = await userModel.findAll({
    limit: 3,
    order: [['age', 'DSC']]
  });
  res.status(200).json({ message: "Oldest users", oldestUser });
};