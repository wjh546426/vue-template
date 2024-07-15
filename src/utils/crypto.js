import CryptoJS from 'crypto-js'

const KEY = "W9mTIcCUxEQTAhvc"

//加密
export function encrypt(word) {
    let key = CryptoJS.enc.Utf8.parse(KEY);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

//解密
export function decrypt(word) {
    let key = CryptoJS.enc.Utf8.parse(KEY);
    let decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export default {
    encrypt, decrypt
}
