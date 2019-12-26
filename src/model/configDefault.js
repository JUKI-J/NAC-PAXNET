/* eslint-disable */
export default class ConfigDefault {

  constructor() 
  {
    this._id = '0';
    this._btnAuthPage = 'td > a[href=\'userAuth.xhtml\']';
    this._metaIsUserAuthed = 'meta[name=\'CWP_ISUSERAUTHED\']';
    this._inputUserID = 'input[name=\'gnUserAuth:userAuthForm:userId\']';
    this._inputUserPW = 'input[name=\'gnUserAuth:userAuthForm:password\']';
    this._btnUserAuth = 'a[id=\'gnUserAuth:userAuthForm:authBtn\']';

    this._gwURL = 'https://gw.paxnet.kr/';
    this._nacURL = 'http://192.168.10.5/cwp2/faces/common/userAuth.xhtml';
  }

  /**
   * prefix : tag name
   * suffix : unique name
   */

  get btnAuthPage() {
    return this._btnAuthPage;
  }

  get metaIsUserAuthed() {
    return this._metaIsUserAuthed;
  }

  get inputUserID(){
    return this._inputUserID;
  }

  get inputUserPW(){
    return this._inputUserPW;
  }

  get btnUserAuth(){
    return this._btnUserAuth;
  }

  /**
   * gwURL : groupware home url
   * nacURL : network access control home url
   */

  get gwURL() {
    return this._gwURL;
  }

  get nacURL() {
    return this._nacURL;
  }
}

