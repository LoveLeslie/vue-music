import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getRecommend () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'

  const data = Object.assign({}, commonParams, {
    tpl: 'v12',
    page: 'other',
    format: 'jsonp',
    callback: 'GetRecomListCallback7290493445220987',
    rnd: Math.random(),
    g_tk: 1886672207,
    inCharset: 'utf8',
    outCharset: 'GB2312',
    platform: 'yqq'

  })
  return jsonp(url, data, options)
}

export function getSongList (disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    format: 'jsonp',
    g_tk: 5381,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

