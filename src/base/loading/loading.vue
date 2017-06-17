<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      title: {
        type: String,
        default: '玩命加载中...'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-theme
</style>
