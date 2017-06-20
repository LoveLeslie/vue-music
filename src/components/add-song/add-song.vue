<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="shortcut">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll class="list-scroll"
                  ref="playList"
                  v-if="currentIndex===0"
                  :data="playHistory"
          >
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong" ></song-list>
            </div>
          </scroll>
          <scroll class="list-scroll"
                  ref="favoriteList"
                  :data="favoriteList"
                  v-if="currentIndex===1"
                  >
            <div class="list-inner">
              <song-list :songs="favoriteList" @select="selectFavoriteSong"></song-list>
            </div>
          </scroll>
        </div>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">已添加到播放列表</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import SongList from 'base/song-list/song-list'
  import TopTip from 'base/top-tip/top-tip'
  import { mapGetters, mapActions } from 'vuex'
  import Song from 'common/js/song'
  import Scroll from 'base/scroll/scroll'

  export default {
    data() {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        switches: [
          {
            name: '最近播放'
          },
          {
            name: '我的收藏'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.playList.refresh()
          } else {
            this.$refs.favoriteList.refresh()
          }
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song, index) {
        if (index !== 0) {
          this.insertSong(new Song(song))
          this.$refs.topTip.show()
        }
      },
      selectFavoriteSong(song) {
        this.insertSong(new Song(song))
        this.$refs.topTip.show()
      },
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
      Switches,
      SongList,
      TopTip,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      margin-bottom: 20px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .shortcut
      .list-wrapper
        position: absolute
        top: 100px
        bottom: 0
        width: 100%
        background: $color-background
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
