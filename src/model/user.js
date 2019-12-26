/* eslint-disable */
export default class User {
  constructor(obj) {
    if (obj === undefined) {
      this._id = '0';
      return ;
    }

    this._id = '0';
    this._userID = obj.userID || obj._userID || '';
    this._userPW = obj.userPW || obj._userPW || '';

    this._isSaveID = ((obj.isSaveID || obj._isSaveID) === '1') ? '1' : '0';
    this._isAutoRun = ((obj.isAutoRun || obj._isAutoRun) === '1') ? '1' : '0';
    this._isSystemBoot = ((obj.isSystemBoot || obj._isSystemBoot) === '1') ? '1' : '0';
  }

  get userID() {
    return this._userID;
  }
  set userID(userID) {
    this._userID = userID;
  }

  get userPW() {
    return this._userPW;
  }
  set userPW(userPW) {
    this._userPW = userPW;
  }

  /**
   * application configuration
   */
  get isSaveID() {
    return this._isSaveID;
  }
  set isSaveID(isSaveID) {
    this._isSaveID = isSaveID;
  }
  
  get isAutoRun() {
    return this._isAutoRun;
  }
  set isAutoRun(isAutoRun) {
    this._isAutoRun = isAutoRun;
  }

  get isSystemBoot() {
    return this._isSystemBoot;
  }
  set isSystemBoot(isSystemBoot) {
    this._isSystemBoot = isSystemBoot;
  }
}

