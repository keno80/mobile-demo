import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import newSongList from "./modules/newSongList";
import playerWidget from "./modules/playerWidget";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    newSongList,
    playerWidget
  },
  getters
})

export default store
