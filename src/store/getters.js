const getters = {
  type: state => state.newSongList.type,
  AllNew: state => state.newSongList.AllNew,
  NewCN: state => state.newSongList.NewCN,
  NewJP: state => state.newSongList.NewJP,
  NewKR: state => state.newSongList.NewKR,
  NewEU: state => state.newSongList.NewEU,
  NowPlay: state => state.newSongList.NowPlay,
  playWidgetInfo: state => state.playerWidget.info,
  playWidgetShow: state => state.playerWidget.isShow,
  ShowPlayer: state => state.playerWidget.ShowPlayer,
  widgetIcon: state => status.playerWidget.isPaused
}

export default getters