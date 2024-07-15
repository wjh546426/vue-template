/**
 * 置顶
 * @param array
 * @param index
 */
export function toFirst(array, index) {
    if (index !== 0) {
        array.unshift(array.splice(index, 1)[0])
    }
}

/**
 * 换位
 * @param array
 * @param index1
 * @param index2
 * @returns {*}
 */
export function swapArr(array, index1, index2) {
    array[index1] = array.splice(index2, 1, array[index1])[0];
    return array;
}

/**
 * 向上移动一位
 * @param array
 * @param index
 */
export function moveUp(array, index) {
    if (index !== 0) {
        array[index] = array.splice(index - 1, 1, array[index])[0];
    } else {
        array.push(array.shift());
    }
}

/**
 * * 向下移动一位
 * @param array
 * @param index
 */
export function moveDown(array, index) {
    if (index !== array.length - 1) {
        array[index] = array.splice(index + 1, 1, array[index])[0];
    } else {
        array.unshift(array.splice(index, 1)[0]);
    }
}
