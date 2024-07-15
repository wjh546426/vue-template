import {getAction, postActionJson} from './requestor'

export const FILE_UPLOAD_URL = process.env.VUE_APP_BASE_API + '/file/uploadMinio'

// 登陆
export const login = (params) => postActionJson("/login/web/signIn", params);
export const logout = (params) => postActionJson("/login/loginOut", params);
// 字典
export const dictionary = (code) => getAction("/dict/select?code=" + code);
