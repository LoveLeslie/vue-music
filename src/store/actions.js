import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

export const selectPlay = function ({commit}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录下当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找playlist中是否已经包含待插入歌曲，并返回其index值
  let fpIndex = findIndex(playlist, song)
  // 在当前歌曲的下一首插入 song
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  // 如果playlist中已经包含待插入歌曲
  if (fpIndex > -1) {
    // 当前插入歌曲的序号大于playlist中已包含的歌曲序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 记录下当前歌曲在sequenceList中的index,并+1，作为插入位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 查找sequenceList中是否已经包含待插入歌曲，并返回其index值
  let fsIndex = findIndex(sequenceList, song)
  // 在当前歌曲的下一首插入 song
  sequenceList.splice(currentSIndex, 0, song)
  // 如果sequenceList中已经包含待插入歌曲
  if (fpIndex > -1) {
    // 当前插入歌曲的序号大于sequenceList中已包含的歌曲序号
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
