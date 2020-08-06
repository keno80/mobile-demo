const getters = {
  type: state => state.newSongList.type,
  AllNew: state => state.newSongList.AllNew,
  NewCN: state => state.newSongList.NewCN,
  NewJP: state => state.newSongList.NewJP,
  NewKR: state => state.newSongList.NewKR,
  NewEU: state => state.newSongList.NewEU
}

export default getters