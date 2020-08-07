/**
 * 播放小部件所需要的信息
 * 当播放音乐时，展示小部件
 * **/

const state = {
  isShow: false,
  info: {},
  ShowPlayer: false,
  isPaused: false,
  audioRefs: null,
  playerRefs: null,
  nowList: []
}

const mutations = {
  //设置小部件显示状态
  SET_PLAYER_INFO: (state, info) => {
    state.info = info.info
    state.isShow = info.songShow !== true;
  },
  //点击播放小部件显示播放页
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
  },
  //小部件播放图标
  WIDGET_ICON: (state, status) => {
    state.isPaused = status
  },
  //保存当前音乐的audio dom
  SAVE_AUDIO_REFS: (state, data) => {
    state.audioRefs = data
  },
  //保存音乐播放页面的dom
  SAVE_PLAYER_REFS: (state, data) => {
    state.playerRefs = data
  },
  //使用保存的音乐播放的dom为界面赋值
  FILL_PLAYER_PAGE_DATA: (state, id) => {
    state.playerRefs.refreshData(id)
  },
  //通过小部件播放暂停音乐
  CHANGE_PLAY_STATUS: (state, type) => {
    if (type === 'pause') {
      state.audioRefs.pause()
      state.isPaused = true
    } else {
      state.audioRefs.play()
      state.isPaused = false
    }
  },
  // 保存当前播放的音乐列表
  SAVE_NOW_MUSIC_LIST: (state, list) => {
    state.nowList = list
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
  //小部件播放图标
  widgetIcon({commit}, status) {
    commit('WIDGET_ICON', status)
  },
  toggleOpenPlayer({commit}, type) {
    commit('TOGGLE_OPEN_PLAYER', type)
  },
  saveAudioRefs({commit}, data) {
    commit('SAVE_AUDIO_REFS', data)
  },
  savePlayerRefs({commit}, data) {
    commit('SAVE_PLAYER_REFS', data)
  },
  fillPlayerPageData({commit}, id) {
    commit('FILL_PLAYER_PAGE_DATA', id)
  },
  changePlayStatus({commit}, type) {
    commit('CHANGE_PLAY_STATUS', type)
  },
  saveNowMusicList({commit}, list) {
    commit('SAVE_NOW_MUSIC_LIST', list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}