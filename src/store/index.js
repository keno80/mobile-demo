import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import newSongList from "./modules/newSongList";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    newSongList
  },
  getters
})

export default store
