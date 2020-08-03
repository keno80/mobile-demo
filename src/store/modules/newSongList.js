/**
 * 根据type类型切换新歌速递列表的数据
 * 0: 全部 7: 华语 8: 日本 16: 韩国 96: 欧美
 * **/
import home from "../../api/home";

const state = {
  AllNew: [],
  NewCN: [],
  NewJP: [],
  NewKR: [],
  NewEU: []
}

const mutations = {
  SET_LIST_DATA: (state, info) => {
    switch (info.type) {
      case 0:
        state.AllNew = info.data
        break
      case 7:
        state.NewCN = info.data
        break
      case 8:
        state.NewJP = info.data
        break
      case 16:
        state.NewKR = info.data
        break
      case 96:
        state.NewEU = info.data
        break
    }
  }
}

const actions = {
  getListData({commit}, type) {
    return new Promise((resolve, reject) => {
      home.getNewSong(type).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          commit('SET_LIST_DATA', {data, type})
          resolve(data)
        }
      }).catch(err => {
        console.log(err);
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}