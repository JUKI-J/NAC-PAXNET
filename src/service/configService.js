import logger from 'electron-log';

import database from '../database/database';
import Config from '../model/config';
import ConfigDefault from '../model/configDefault';

const configService = {
  insertConfig: async (config) => {
    logger.info(`insertConfig:[${JSON.stringify(config)}]`);
    await database.config.update({ _id: '0' }, config, { upsert: true }, () => {});
  },
  selectConfig: async () => {
    let doc = await database.config.findOne({ _id: '0' }, (err, doc) => doc);
    if (doc === null) {
      doc = new ConfigDefault();
      await configService.insertConfig(doc);
      doc = await database.config.findOne({ _id: '0' }, (err, doc) => doc);
    }
    logger.info(`selectConfig:[${JSON.stringify(doc)}]`);
    return new Config(doc);
  },
};

export default configService;
