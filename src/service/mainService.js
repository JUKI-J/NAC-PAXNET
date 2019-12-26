import request from 'request-promise';
import puppeteer from 'puppeteer';
import logger from 'electron-log';

import User from '../model/user';
import Config from '../model/config';

import userService from '../service/userService';
import configService from '../service/configService';

const mainService = {
  fnIsConnected: async () => {
    let rsltCd;
    let rsltMsg;
    try {
      await request('https://www.google.com', async (err) => {
        rsltMsg = err;
        if (err) {
          rsltCd = 'FAILED';
        } else {
          rsltCd = 'SUCCESS';
        }
      });
    } catch (e) {
      rsltCd = 'FAILED';
    }
    const data = {
      resultCode: rsltCd,
      resultMessage: rsltMsg,
    };
    logger.info(`fnIsConnected:[${JSON.stringify(data)}]`);
    return data;
  },
  fnRunNAC: async (args) => {
    let message = '';
    const user = new User(args);
    await userService.insertUser(user);
    const data = await mainService.fnIsConnected();
    if (data.resultCode === 'SUCCESS') {
      message = 'NAC is running...<br/>';
    } else if (args.userID === null || args.userPW === null) {
      message = 'Invalid ID or password';
    } else {
      message = await mainService.asyncRunPuppeteer4NAC();
    }
    return message;
  },
  asyncRunPuppeteer4NAC: async () => {
    let message = '';
    const execPath = puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked');
    const browser = await puppeteer.launch({ // eslint-disable-line
      headless: true,
      executablePath: execPath,
    }).then(async (browser) => {
      const user = new User(await userService.selectUser());
      const conf = new Config(await configService.selectConfig());
      const page = (await browser.pages())[0];
      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
      await page.goto(conf.nacURL, { waitUntil: 'domcontentloaded' });
      try {
        let isAuth = await page.$eval(conf.metaIsUserAuthed, el => el.content);
        if (isAuth === 'false') {
          await page.click(conf.btnAuthPage);
          await page.reload({ waitUntil: 'domcontentloaded' });
          await page.waitFor(conf.inputUserID);

          await page.$eval(conf.inputUserID, (el, val) => { el.value = val; }, user.userID);
          await page.$eval(conf.inputUserPW, (el, val) => { el.value = val; }, user.userPW);
          await page.click(conf.btnUserAuth);
          await page.waitFor(conf.metaIsUserAuthed);

          try {
            isAuth = await page.$eval(conf.metaIsUserAuthed, el => el.content);
            if (isAuth === 'true') {
              message = 'NAC is running...<br/>';
            } else {
              message = 'maybe your password has expired<br/><br/>';
            }
          } catch (e) {
            message = 'maybe your password has expired<br/>occured exception...<br/>';
          }
        } else {
          message = 'NAC is running...<br/>';
        }
      } catch (e) {
        message = 'maybe your password has expired<br/>occured exception...<br/>';
      } finally {
        await browser.close();
      }
    }).catch(() => {
      message = 'cannot find installed Chromium';
    });
    return message;
  },
};

export default mainService;

