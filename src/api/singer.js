import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    format: 'jsonp',
    g_tk: 5381,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq',
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
