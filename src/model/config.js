/* eslint-disable */
export default class Config {

  constructor(obj) 
  {
    this._id = '0';
    this._btnAuthPage = obj.btnAuthPage || obj._btnAuthPage || '';
    this._metaIsUserAuthed = obj.metaIsUserAuthed || obj._metaIsUserAuthed || '';
    this._inputUserID = obj.inputUserID || obj._inputUserID || '';
    this._inputUserPW = obj.inputUserPW || obj._inputUserPW || '';
    this._btnUserAuth = obj.btnUserAuth || obj._btnUserAuth || '';

    this._gwURL = obj.gwURL || obj._gwURL || '';
    this._nacURL = obj.nacURL || obj._nacURL || '';
  }

  /**
   * prefix : tag name
   * suffix : unique name
   */

  get btnAuthPage() {
    return this._btnAuthPage;
  }
  set btnAuthPage(btnAuthPage) {
    this._btnAuthPage = btnAuthPage;
  }

  get metaIsUserAuthed() {
    return this._metaIsUserAuthed;
  }
  set metaIsUserAuthed(metaIsUserAuthed) {
    this._metaIsUserAuthed = metaIsUserAuthed;
  }

  get inputUserID(){
    return this._inputUserID;
  }
  set inputUserID(inputUserID){
    this._inputUserID = inputUserID;
  }

  get inputUserPW(){
    return this._inputUserPW;
  }
  set inputUserPW(inputUserPW){
    this._inputUserPW = inputUserPW;
  }

  get btnUserAuth(){
    return this._btnUserAuth;
  }
  set btnUserAuth(btnUserAuth){
    this._btnUserAuth = btnUserAuth;
  }

  /**
   * gwURL : groupware home url
   * nacURL : network access control home url
   */

  get gwURL() {
    return this._gwURL;
  }
  set gwURL(gwURL) {
    this._gwURL = gwURL;
  }

  get nacURL() {
    return this._nacURL;
  }
  set nacURL(nacURL) {
    this._nacURL = nacURL;
  }
}

