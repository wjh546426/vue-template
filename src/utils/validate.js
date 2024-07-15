// 正整数
export const number = /^[0-9]*$/

// 手机号
export const mobilePhone = /^1([3456789])\d{9}$/

// 手机号（包括座机）
export const telephone = /^(0\d{2,3}-\d{7,8})|1([3456789])\d{9}$/;

//身份证号
export const idCard = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

//不能带特殊字符
export const specialCharacters = /^[A-Za-z0-9\u4e00-\u9fa5]+$/

//邮箱
export const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
