import logger from 'electron-log';

import database from '../database/database';
import User from '../model/user';
import cryptoUtil from '../util/cryptoUtil';

const userService = {
  insertUser: async (user) => {
    if (user !== undefined && user instanceof User) {
      if (user.userPW !== undefined && user.userPW !== '') {
        user.userPW = cryptoUtil.encrypt(user.userPW);
      }
    }
    logger.info(`insertUser:[${JSON.stringify(user)}]`);
    await database.user.update({ _id: '0' }, user, { upsert: true }, (err) => { logger.info(`err:[${err}]`); });
  },
  selectUser: async () => {
    let user = await database.user.findOne({ _id: '0' }, (err, result) => result);
    if (user === null) {
      await userService.insertUser(new User());
      user = await database.user.findOne({ _id: '0' }, (err, result) => result);
    }
    const userClazz = Object.assign(new User(), user);
    if (userClazz.userPW !== undefined && userClazz.userPW !== '') {
      userClazz.userPW = cryptoUtil.decrypt(userClazz.userPW);
    }
    return userClazz;
  },
};

export default userService;
