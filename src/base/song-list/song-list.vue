<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song,index) in songs" class="item">
        <div class="rankNum" v-show="rank">
          <p :class="getRankCls(index)">{{index + 1}}</p>
        </div>
        <div class=" content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getDesc(song) {
        return `${song.singer} - ${song.album}`
      },
      selectItem(item, index) {
        return this.$emit('select', item, index)
      },
      getRankCls(index) {
        if (index <= 2) {
          return 'icon'
        } else {
          return 'text'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rankNum
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        font-size: $font-size-large
        .icon
          color: $color-theme
          font-size: $font-size-large-x
          font-style italic
        .text
          color: $color-text-d
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
