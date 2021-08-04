import fetch from '../libs/fetch'


export default class Express {

  /**
 *
 * @description 获得所有物流商
 */
  static getCarriers(params) {
    return fetch({
      url: '/v3/trackings/carriers',
      method: 'get',
      params: { lang: 'en', ...params }
    })
  }

  /**
 *
 * @description 通过单号获得具体物流信息
 */
  static getInfo(params) {
    return fetch({
      url: '/v3/trackings/get',
      method: 'get',
      params: { lang: 'cn', ...params }
    })
  }

  /**
*
* @description 创建需要查询的单号
*/
  static createTrack(data) {
    return fetch({
      url: '/v3/trackings/create',
      method: 'post',
      data
    })
  }
}
