import axios from '../utils/http'
import {reqUrl} from "../utils/http";

export default {
  //获取首页banner
  getBanner(type) {
    return axios({
      url: `${reqUrl.prod}/banner`,
      method: 'get',
      params: {
        type
      }
    })
  },

  //新歌速递
  getNewSong(type) {
    return axios({
      url: `${reqUrl.prod}/top/song`,
      method: 'get',
      params: {
        type,
      }
    })
  },
}