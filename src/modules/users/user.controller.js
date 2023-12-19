import { userModel } from "../../../database/models/user.model.js";
import { Op } from 'sequelize';

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await userModel.findAll();
  res.json({ message: "All users", users });
}

// Sign up
export const signUp = async (req, res) => {
  await userModel.create(req.body);
  res.json({ message: "User added successfully" });
}

// signIn
export const signIn = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userModel.findAll({
    attributes: {
      exclude: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
      include: ['name']
    },
    where: {
      [Op.and]: [
        { id: req.params.id },
        {
          email: email,
          password: password 
        },
      ]
    },
  });
  console.log(user.dataValues.name);
  res.json({ message: `welcome ${user.dataValues.name} at API` });
}

// Update user
export const updateUser = async (req, res) => {
  await userModel.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: "success" });
}

// Delete user
export const deleteUser = async (req, res) => {
  await userModel.destroy({
    where: { id: req.params.id }
  })
  res.json({ message: "success" });
}

// search for users by list of ids => using IN?
export const findByListOfIds = async (req, res) => {
  try {
    const user = await userModel.findAll({
      where: {
        id: { [Op.in]: req.body.id }
      }
    })
    console.log(req.body.id, "id");
    console.log(user, "op");
    if (!user) {
      return res.status(404).send('No User Found')
    }
    res.status(200).json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  };
}