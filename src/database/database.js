import path from 'path';
import { app } from 'electron';
import fs from 'fs';
import Datastore from 'nedb-promises';
import logger from 'electron-log';

const dbFactory = (fileName) => {
  const userDataPath = app.getPath('userData');
  const filepath = path.join(userDataPath, '/data/', `${fileName}`);
  const dirpath = path.dirname(filepath);
  if (!fs.existsSync(dirpath)) {
    fs.mkdir(path.dirname(filepath), { recursive: true });
  }
  const options = {
    filename: filepath,
    timestampData: true,
    autoload: true,
  };
  const database = new Datastore(options);
  database.ensureIndex({ fieldName: '_id', unique: true }, (err) => { logger.info(`-----dbFactory err : [${err}]`); });
  return database;
};

const database = {
  user: dbFactory('user.db'),
  config: dbFactory('config.db'),
  configDefault: dbFactory('config-default.db'),
};

export default database;
