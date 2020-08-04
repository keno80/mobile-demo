import axios from '../utils/http'
import {reqUrl} from "../utils/http";

export default {
  // 获取音乐实际地址
  getMusicRealUrl(id) {
    return axios({
      url: `${reqUrl.prod}/song/url`,
      method: 'get',
      params: {
        id
      }
    })
  },

  // 获取音乐歌词
  getMusicLyric(id) {
    return axios({
      url: `${reqUrl.prod}/lyric`,
      method: 'get',
      params: {
        id
      }
    })
  }
}