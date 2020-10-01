const { userInfo } = require("os");
const { UserDao } = require('../dao/user');

const userDao = new UserDao();

class UserService {
  async createUser(user) {
    return await userDao.createUser(user);
  }

  async getAll() {
    return await userDao.getAll();
  }
}

module.exports = { UserService };