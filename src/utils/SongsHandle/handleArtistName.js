// 处理歌曲名
function handleArtistName(songList) {
  for (let i = 0; i < songList.length; i++) {
    if (songList[i].artists.length > 1) {
      let a = []
      for (let j = 0; j < songList[i].artists.length; j++) {
        a.push(songList[i].artists[j].name)
        songList[i].artist = a.join('/')
      }
    } else {
      songList[i].artist = songList[i].artists[0].name
    }
  }
  return songList
}

export default handleArtistName