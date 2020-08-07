/**
 * 播放小部件所需要的信息
 * 当播放音乐时，展示小部件
 * **/

const state = {
  isShow: false,
  info: {},
  ShowPlayer: false
}

const mutations = {
  /**
   * 设置小部件显示状态
   * **/
  SET_PLAYER_INFO: (state, info) => {
    state.info = info.info
    state.isShow = info.songShow !== true;
  },
  /**
   * 点击播放小部件显示播放页
   * **/
  TOGGLE_OPEN_PLAYER: (state, type) => {
    switch (type) {
      case 'list':
        state.ShowPlayer = true
        break;
      case 'close':
        state.ShowPlayer = false
        break
      case 'widget':
        state.ShowPlayer = true
    }
  }
}

const actions = {
  setInfo({commit}, data) {
    let info = {
      songImg: data.info.album.blurPicUrl,
      songName: data.info.name,
      singer: data.info.artist,
    }
    commit('SET_PLAYER_INFO', {info, songShow: data.songShow})
  },
  toggleOpenPlayer({commit}, type) {
    commit('TOGGLE_OPEN_PLAYER', type)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}