/* eslint-disable */
import crypto from 'crypto-js';

const KEY = 'vkrtmspt0226381744';

const cryptoUtil = {
  /**
   * encryption
   * @param plainText
   * @returns {string}
   */
  encrypt: (plainText) => {
    let enc = crypto.AES.encrypt(plainText, KEY);
    return enc.toString();
  },

  /**
   * decryption
   * @param encryptedText
   * @returns {string}
   */
  decrypt: (encryptedText) => {
    let bytes = crypto.AES.decrypt(encryptedText, KEY);
    return bytes.toString(crypto.enc.Utf8);
  },  
}

export default cryptoUtil;