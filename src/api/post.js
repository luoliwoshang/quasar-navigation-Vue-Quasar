import fetch from '../libs/fetch'


export default class 物流 {

  /**
 *
 * @description 获得所有物流商
 */
   static 获取_物流商信息(params) {
    return fetch({
      url: '/v2/carriers/',
      method: 'get',
      params
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
      params
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
