import axios from '../utils/http'

export default {
  getBanner(type) {
    return axios({
      url: `/api/banner`,
      method: 'get',
      params: {
        type
      }
    })
  }
}