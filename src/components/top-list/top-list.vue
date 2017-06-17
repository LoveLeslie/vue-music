<template>
  <transition name="slide">
    <music-list :rank="rank" :bgImage="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { getMusicList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      bgImage() {
        return this.topList.pic_v12
      },
      title() {
        return this.topList.ListName
      },
      ...mapGetters([
        'topList',
        'topMusicList'
      ])
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.topID) {
          this.$router.push('/toplist')
          return
        }
        getMusicList(this.topList.topID).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {data} = item
          if (data.songid && data.albummid) {
            ret.push(createSong(data))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition: all 0.5s
  .slide-enter, .slider-leave-active
    transform: translate3d(100%, 0, 0)
</style>
