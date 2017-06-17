import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getTopList () {
  const url = '/api/toplist'

  const data = Object.assign({}, {
    page: 'index',
    pcachetime: +new Date(),
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList (topID) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    tpl: 3,
    page: 'detail',
    date: '2017_24',
    topid: topID,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 5381,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}
