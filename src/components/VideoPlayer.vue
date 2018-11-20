<template>
    <div id='video_player' ref='videoPlayer' @click.stop='doNothing'>
        <video-player class="vjs-custom-skin"
         :options="options"
         :playsinline="true"
         @play="onPlayerPlay($event)"
         @pause="onPlayerPause($event)"
         @ended="onPlayerEnded($event)"
         @loadeddata="onPlayerLoadeddata($event)"
         @waiting="onPlayerWaiting($event)"
         @playing="onPlayerPlaying($event)"
         @timeupdate="onPlayerTimeupdate($event)"
         @canplay="onPlayerCanplay($event)"
         @canplaythrough="onPlayerCanplaythrough($event)"
         @ready="playerReadied"
         @statechanged="playerStateChanged($event)">
        </video-player>
    </div>
</template>
<script>
import common from '@/utils/public'
export default {
    name: "index",
    data() {
        return {}
    },
    props: ['item'],
    computed: {
        options() {
            return {
                height: '45',
                width: '80',
                autoplay: false,
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: this.item.type,
                    src: this.item.src
                }]
                // poster: this.item.poster
            }
        }
    },
    mounted() {
        let self = this
        let dom = this.$refs.videoPlayer
        let button = dom.getElementsByClassName('vjs-fullscreen-control')[0] // 全屏按钮
        let arr = ['vjs-volume-panel-horizontal', 'vjs-current-time', 'vjs-duration',
         'vjs-time-divider', 'vjs-playback-rate', 'vjs-progress-control']
        this.displayNone(arr)
        button.addEventListener('click', function() {
            button.getAttribute('title') === 'Fullscreen' ? self.display(arr) : self.displayNone(arr)
        })
        window.onresize = function() {
            !self.checkFull() ? self.displayNone(arr) : self.display(arr)
        }
    },
    methods: {
        displayNone(arr) {
            let dom = this.$refs.videoPlayer
            let buttons = dom.getElementsByClassName('vjs-big-play-button')
            let bar = dom.getElementsByClassName('vjs-control-bar')[0]
            common.removeClass(bar, 'big')
            for (let i = 0; i < buttons.length; i++) {
                common.removeClass(buttons[i], 'big')
            }
            arr.forEach(function(item) {
                let elem = dom.getElementsByClassName(item)[0]
                elem.style.display = 'none'
            })
        },
        display(arr) {
            let dom = this.$refs.videoPlayer
            let buttons = dom.getElementsByClassName('vjs-big-play-button')
            let bar = dom.getElementsByClassName('vjs-control-bar')[0]
            common.addClass(bar, 'big')
            for (let i = 0; i < buttons.length; i++) {
                common.addClass(buttons[i], 'big')
            }
            arr.forEach(function(item) {
                let elem = dom.getElementsByClassName(item)[0]
                elem.style.display = 'flex'
            })
        },
        // 判断是否全屏
        checkFull() {
            var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if (isFull === undefined) { isFull = false; }
            return isFull;
        },
        onPlayerPlay(player) {
            console.log('player play!', player)
        },
        onPlayerPause(player) {
            // console.log('player pause!', player)
        },
        onPlayerEnded(player) {
            // console.log('player ended!', player)
        },
        onPlayerLoadeddata(player) {
            // console.log('player Loadeddata!', player)
        },
        onPlayerWaiting(player) {
            // console.log('player Waiting!', player)
        },
        onPlayerPlaying(player) {
            // console.log('player Playing!', player)
        },
        onPlayerTimeupdate(player) {
            // console.log('player Timeupdate!', player.currentTime())
        },
        onPlayerCanplay(player) {
            // console.log('player Canplay!', player)
        },
        onPlayerCanplaythrough(player) {
            // console.log('player Canplaythrough!', player)
        },
        // or listen state event
        playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
        },
        // player is ready
        playerReadied(player) {
            // seek to 10s
            // console.log('example player 1 readied', player)
            player.currentTime(10)
        },
        doNothing() {}
    }
}
</script>
<style lang="css">
  @import '../assets/css/plugin.reset.css'
</style>
<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  .line
    flex_()
    relative()
    >div
      flex:1
    >span
      width:25%
    >i
      width:25%

  #videos
    .line
      height: 55px
      border-bottom: 2px solid #f7f7f7
      >span, >i
        line-height:53px
      >div
        setMiddle()
        height: 55px
        div
          relative()
          width: 80px
          height: 45px
          mr(10px)
          video
            object-fit: fill
          i
            absolute()
            vertical(20px)
            width: 20px
            top: 50%
            left: 50%
            bgColor(red)
            mt(-10px)
            ml(-10px)
            cursor()
</style>
