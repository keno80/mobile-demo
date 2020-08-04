import axios from '../utils/http'

export default {
  // 获取音乐实际地址
  getMusicRealUrl(id) {
    return axios({
      url: `/api/song/url`,
      method: 'get',
      params: {
        id
      }
    })
  },

  // 获取音乐歌词
  getMusicLyric(id) {
    return axios({
      url: `/api/lyric`,
      method: 'get',
      params: {
        id
      }
    })
  }
}