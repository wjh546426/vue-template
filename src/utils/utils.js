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
        setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}


/**
 * 用于深度复制对象的函数
 * @param {any} target - 目标对象
 * @param {WeakMap} clonedMap - 存储已经拷贝过的对象的映射表
 * @returns {any} - 返回目标对象的深度复制
 */
export function deepClone(target, clonedMap = new WeakMap()) {
    // 如果目标对象不是对象类型或者为null，则直接返回目标对象
    if (typeof target !== 'object' || target === null) return target;

    // 如果目标对象已经被拷贝过，则直接返回拷贝后的对象
    if (clonedMap.has(target)) return clonedMap.get(target);

    // 如果目标对象是日期类型，则创建一个新的日期对象进行拷贝
    if (target instanceof Date) return new Date(target);
    // 如果目标对象是正则表达式类型，则创建一个新的正则表达式对象进行拷贝
    if (target instanceof RegExp) return new RegExp(target);
    // 如果目标对象是函数类型，则直接返回
    if (target instanceof Function) return target;
    // 如果目标对象是符号类型，则创建一个新的符号对象进行拷贝
    if (typeof target === 'symbol') return Symbol(target.description);

    // 如果目标对象是数组类型，则遍历数组进行深度复制
    if (Array.isArray(target)) {
        const arr = [];
        clonedMap.set(target, arr); // 将目标对象和拷贝对象存入映射表中
        target.forEach((item, index) => {
            arr[index] = deepClone(item, clonedMap); // 递归调用deepClone进行深度复制
        });
        return arr;
    }

    // 如果目标对象是普通对象类型
    if (target instanceof Object) {
        // 如果目标对象是Map类型
        if (target instanceof Map) {
            const clonedMap = new Map();
            clonedMap.set(target, clonedMap);
            target.forEach((value, key) => {
                clonedMap.set(deepClone(key, clonedMap), deepClone(value, clonedMap));
            });
            return clonedMap;
        }
        // 如果目标对象是Set类型
        if (target instanceof Set) {
            const clonedSet = new Set();
            clonedMap.set(target, clonedSet);
            target.forEach((value) => {
                clonedSet.add(deepClone(value, clonedMap));
            });
            return clonedSet;
        }

        // 其他情况，创建一个新的对象，并对其属性进行深度复制
        const obj = Object.create(Object.getPrototypeOf(target));
        clonedMap.set(target, obj);
        Reflect.ownKeys(target).forEach(key => {
            obj[key] = deepClone(target[key], clonedMap);
        });
        return obj;
    }
}


/**
 * 日期格式化
 * @param date 要格式化的日期对象
 * @param format yyyy-年 MM-月 dd-日 HH-小时 mm-分钟 ss-秒 ms-毫秒
 * @returns {string} yyyy年MM月dd日 HH时mm分ss秒ms毫秒
 */
export function formatDate(date, format) {
    const replacements = {
        'yyyy': date.getFullYear().toString().padStart(4, '0'),
        'MM': (date.getMonth() + 1).toString().padStart(2, '0'),
        'dd': date.getDate().toString().padStart(2, '0'),
        'HH': date.getHours().toString().padStart(2, '0'),
        'mm': date.getMinutes().toString().padStart(2, '0'),
        'ss': date.getSeconds().toString().padStart(2, '0'),
        'ms': date.getMilliseconds().toString()
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss|ms/g, (match) => replacements[match]);
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


// el-table合并某个字段相同的表格
// objectSpanMethod({ row, column, rowIndex, columnIndex }) {
//     console.log(row.signs);
//     if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
//         if (rowIndex === 0 || row.signs !== this.dataList[rowIndex - 1].signs) {
//             let rowspan = 0;
//             this.dataList.forEach((element) => {
//                 if (element.signs === row.signs) {
//                     rowspan++;
//                 }
//             });
//             return [rowspan, 1];
//         } else {
//             return [0, 0];
//         }
//     }
// },

// async function streamDownloadFile(url, filename) {
//     const downloadLink = document.createElement('a');
//     downloadLink.style.display = 'none';
//     document.body.appendChild(downloadLink);
//
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('文件下载失败');
//         }
//
//         const blob = await response.blob();
//
//         // 创建一个 Blob 对象 URL
//         const blobUrl = URL.createObjectURL(blob);
//
//         // 设置下载链接的属性
//         downloadLink.href = blobUrl;
//         downloadLink.download = filename;
//
//         // 触发点击事件进行下载
//         downloadLink.click();
//     } catch (error) {
//         console.error(error);
//         // 处理错误，例如显示错误消息给用户
//     } finally {
//         // 释放 Blob 对象 URL 和删除下载链接元素
//         if (blobUrl) {
//             URL.revokeObjectURL(blobUrl);
//         }
//         document.body.removeChild(downloadLink);
//     }
// }