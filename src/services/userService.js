const User = require('../models/user.model');
const cloudinary = require('../config/cloudinary.config');

const handleHtml = require('../services/handleHtml');
const fs = require('fs');
const QRCode = require('qrcode');

class UserService {
  async login(username, password) {
    try {
      const user = User.findOne({ username: username, password: password });
      if (user) return user;
      throw new Error('User is not exist');
    } catch (error) {
      console.log(error);
    }
  }

  async mapData(user) {
    const url = 'http://192.168.1.6:3000/';
    user.avatar = url + user?.avatar;
    user.video = url + user?.video;
    user.url = url + user?.url?.slice(1);
  }

  async handleFile(buffer, type, id) {
    const date = new Date().getTime();
    fs.writeFile(
      type == 'video'
        ? `uploads/${date}_${id}.mp4`
        : `uploads/${date}_${id}.png`,
      buffer,
      { encoding: 'base64' },
      (err) => {
        if (err) throw err;
        console.log('Image saved successfully');
      },
    );

    return type == 'video' ? `${date}_${id}.mp4` : `${date}_${id}.png`;
  }

  async register(data) {
    try {
      const check = await User.findOne({ idCard: data.idCard });
      if (check) {
        await User.deleteOne({ id: check.id });
      }
      const user = await User.create(data);

      const resp = await handleHtml.exportToImg(user);

      user.url = resp.url;
      await user.save();
      return { img: resp.urlHost, id: user.id };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await User.find({});
  }

  async findById(id) {
    const user = await User.findById(id);
    await this.mapData(user);
    return user;
  }
}
module.exports = new UserService();
