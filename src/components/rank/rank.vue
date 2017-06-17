<template>
  <div class="rank" ref="rank">
    <scroll :data="globalTopList" class="rank-content" ref="scroll">
      <div>
        <h1 class="list-title">QQ音乐巅峰榜</h1>
        <div class="toplist">
          <ul>
            <li class="item" v-for="item in QQTopList" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.pic" width="100" height="100">
              </div>
              <ul class="songlist">
                <li class="song" v-for="(song,index) in item.songlist">
                  <span>{{index+1}}</span>
                  <span>{{song.songname}}-{{song.singername}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <h1 class="list-title">全球榜</h1>
        <div class="toplist">
          <ul>
            <li class="item" v-for="item in globalTopList" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.pic" width="100" height="100">
              </div>
              <ul class="songlist">
                <li class="song" v-for="(song,index) in item.songlist">
                  <span>{{index+1}}</span>
                  <span>{{song.songname}}-{{song.singername}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!globalTopList.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { getTopList } from 'api/rank'
  import { playlistMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        QQTopList: [],
        globalTopList: []
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/toplist/${item.topID}`
        })
        this.setTopList(item)
      },
      _getTopList() {
        getTopList().then((res) => {
          this.QQTopList = res[0].List
          this.globalTopList = res[1].List
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .rank-content
      height: 100%
      overflow: hidden
      .list-title
        height: 20px
        line-height: 20px
        padding-left: 6px
        border-left: 3px solid $color-theme
        margin: 0 20px
        font-size: $font-size-medium
        color: $color-theme
      .toplist
        height: 100%
        overflow: hidden
        .item
          display: flex
          margin: 0 20px
          padding-top: 20px
          height: 100px
          &:last-child
            padding-bottom: 20px
          .icon
            flex: 0 0 100px
            width: 100px
            height: 100px
          .songlist
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            padding: 0 20px
            height: 100px
            overflow: hidden
            background: $color-highlight-background
            color: $color-text-l
            font-size: $font-size-small
            .song
              no-wrap()
              line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
