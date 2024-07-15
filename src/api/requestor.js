import Vue from 'vue'
import {axios} from './interceptor'
import Qs from 'qs'

Vue.prototype.axios = axios  //axios实例

/**
 * get请求
 * @param url
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getAction(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter,
    })
}

/**
 * get请求---获取流文件
 * @param url
 * @param parameter
 * @returns {AxiosPromise}
 */
export function getActionStream(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter,
        responseType: 'blob'
    })
}


/**
 * post请求---参数序列化为url
 * @param url
 * @param parameter
 * @returns {AxiosPromise}
 */
export function postAction(url, parameter) {
    return axios({
        url: url,
        method: 'post',
        data: Qs.stringify(parameter),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

/**
 * post请求---json格式传参
 * @param url
 * @param parameter
 * @returns {AxiosPromise}
 */
export function postActionJson(url, parameter) {
    return axios({
        url: url,
        method: 'post',
        data: parameter,
    })
}

/**
 * delete请求
 * @param url
 * @param parameter
 * @returns {AxiosPromise}
 */
export function deleteAction(url, parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter,
    })
}