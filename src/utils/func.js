import {decrypt} from "./crypto";

/**
 * 获取token
 * @returns {""|CancelToken}
 */
export function getToken() {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo && JSON.parse(decrypt(userInfo))?.token;
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {(function(...[*]=): void)|*}
 */
export function debounce(fn, delay = 200) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

/**
 * 节流
 * @param fn 需要节流处理的函数
 * @param delay 时间间隔，单位为毫秒
 * @returns {Function} 返回一个节流处理后的函数
 */
export function throttle(fn, delay = 200) {
    let last = 0; // 记录上一次执行fn的时间
    return function (...args) {
        const now = Date.now(); // 获取当前时间
        if (now - last > delay) { // 当前时间与上次执行时间的差大于设定的延迟时间，则执行函数
            last = now; // 更新上次执行时间
            fn.apply(this, args);
        }
    }
}

/**
 * 日期格式化
 * @param date 要格式化的日期对象
 * @param format yyyy-年 MM-月 dd-日 HH-小时 mm-分钟 ss-秒 ms-毫秒
 * @returns {string} yyyy年MM月dd日 HH时mm分ss秒ms毫秒
 */
export function formatDate(date, format) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')
    const millisecond = date.getMilliseconds()

    return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('HH', hour).replace('mm', minute).replace('ss', second).replace('ms', millisecond)
}

/**
 *  脱敏处理
 * @param str
 * @param beginLen
 * @param endLen
 * @returns {string|*}
 */
export function desensitization(str, beginLen, endLen) {
    if (str) {
        const len = str.length;
        const firstStr = str.substr(0, beginLen);
        const lastStr = str.substr(endLen);
        const middleStr = str
            .substring(beginLen, len - Math.abs(endLen))
            .replace(/[\s\S]/gi, '*');

        return `${firstStr}${middleStr}${lastStr}`;
    }
    return str;
}

/**
 * 屏幕缩放自适应
 * @param designWidth 设计图宽度
 * @param designHeight 设计图高度
 * @param id 要自适应改变的document
 */
export function zoomAdaptive(designWidth, designHeight, id) {
    const element = document.getElementById(id)
    element.style.cssText = `
        position: absolute;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        transform-origin: 0 0;
        transition: scale .3s;
        width: ${designWidth}px !important;
        height: ${designHeight}px !important;`

    function updateScale() {
        let scale = Math.min(innerWidth / designWidth, innerHeight / designHeight)
        element.style.transform = `scale(${scale},${scale}) translate(-50%, -50%)`
    }

    window.addEventListener('resize', () => {
        updateScale()
    })
}
