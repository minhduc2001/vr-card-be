const User = require('../models/user.model');
// const cloudinary = require('../config/cloudinary');
const userService = require('../services/userService');
const ip = require('ip');

class UserController {
  async login(req, res) {
    const user = await userService.login(req.body);
    return res.status(200).json(user);
  }
  async register(req, res) {
    const resp = await userService.register({
      ...req.body,
      avatar: req.files['dataImg'][0].path,
      video: req.files['dataVideo'][0].path,
    });
    console.log(resp);
    return res.status(200).json({
      imgAfter: `http://${ip.address()}:3000/public/images/ms.png`,
      imgBefore: resp.img,
      id: resp.id,
    });
  }

  async getAll(req, res) {
    const users = await userService.findAll({});
    return res.status(200).json(users);
  }

  async getUser(req, res) {
    try {
      return res.status(200).json(await userService.findById(req.params.id));
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return json.status(404).json('This user does not exist');
      }
      return res.status(200).json({ msg: 'User deleted' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async get(id) {
    const user = await userService.findById(id);
    return user;
  }
}

module.exports = new UserController();
