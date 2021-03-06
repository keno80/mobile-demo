/**
 * 根据type类型切换新歌速递列表的数据
 * 0: 全部 7: 华语 8: 日本 16: 韩国 96: 欧美
 * **/
import home from "../../api/home";

const state = {
  type: 0,
  AllNew: [],
  NewCN: [],
  NewJP: [],
  NewKR: [],
  NewEU: [],
  NowPlay: []
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
    state.type = info.type
  },
  //保存正在播放的音乐信息
  SET_NOW_PLAY: (state, info) => {
    state.NowPlay = info
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
  },
  //保存正在播放的音乐信息
  setNowPlay({commit}, info) {
    commit('SET_NOW_PLAY', info)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}