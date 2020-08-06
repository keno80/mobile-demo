/**
 * 播放小部件所需要的信息
 * 当播放音乐时，展示小部件
 * **/

const state = {
  isShow: false,
  info: {}
}

const mutations = {
  /**
   * 设置小部件显示状态
   * 当 status.isPlay 为 true 和 status.songShow 为false时才显示
   * **/
  SET_PLAYER_INFO: (state, info) => {
    state.info = info.info
    state.isShow = info.songShow !== true;
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}