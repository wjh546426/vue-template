const pi = 3.14159265358979324 * 3000.0 / 180.0;

/**
 * 百度地图坐标转换为高德地图坐标
 * @param coordinate
 * @returns {number[]}
 */
export function bd_convert_gd(coordinate) {
    const bd_lng = coordinate[0], bd_lat = coordinate[1];
    const x = bd_lng - 0.0065, y = bd_lat - 0.006, z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
    const gd_lng = z * Math.cos(theta);
    const gd_lat = z * Math.sin(theta);
    return [gd_lng, gd_lat];
}

/**
 * 高德地图坐标转换为百度地图坐标
 * @param coordinate
 * @returns {number[]}
 */
export function gd_convert_bd(coordinate) {
    const x = coordinate[0], y = coordinate[1], z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
    const bd_lng = z * Math.cos(theta) + 0.0065;
    const bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
}