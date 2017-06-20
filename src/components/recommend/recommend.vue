<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="hotDiss">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider ref="slider">
            <div v-for="item in recommends" >
              <a :href="item.jumpurl">
                <img :src="item.pic" >
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
        <h1 class="list-title">热门歌单</h1>
        <ul>
          <li @click="selectItem(item)" v-for="item in hotDiss" class="item">
            <div class="icon">
              <img width="60" height="60" @load="loadImage" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name"  v-html="item.author"></h2>
              <p class="desc">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div class="loading-container" v-show="!hotDiss.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { getRecommend } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { playlistMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        recommends: [],
        hotDiss: []
      }
    },
    created() {
      this._getRecommend()
      this._getHotDiss()
    },
    activated() {
      setTimeout(() => {
        this.$refs.slider && this.$refs.slider.refresh()
      }, 20)
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.focus
          }
        })
      },
      _getHotDiss() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.hotDiss = res.data.hotdiss.list
          }
        })
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
      .recommend-list
        .list-title
          height: 20px
          line-height: 20px
          padding-left: 6px
          margin: 20px
          border-left: 3px solid $color-theme
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
