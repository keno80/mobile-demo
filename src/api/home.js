import axios from '../utils/http'

export default {
  //获取首页banner
  getBanner(type) {
    return axios({
      url: `/api/banner`,
      method: 'get',
      params: {
        type
      }
    })
  },

  //新歌速递
  getNewSong(type) {
    return axios({
      url: `/api/top/song`,
      method: 'get',
      params: {
        type,
      }
    })
  },

  // 获取音乐实际地址
  getMusicRealUrl(id) {
    return axios({
      url: `/api/song/url`,
      method: 'get',
      params: {
        id
      }
    })
  }
}