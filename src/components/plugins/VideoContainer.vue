<template>
  <div id="VideoContainer">
      <span class="icon">&#xe64a;</span>
      <video class="video" :src="data.info.src"></video>
      <div class="discription">
          <p>视频</p>
          <span>1.3M</span>
      </div>
  </div>
</template>

<script>
  export default {
    name: "VideoContainer",
    data() {
      return {}
    },
    props: ['data'],
    methods: {
      
    }
  }
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
    #VideoContainer
        cursor()
        relative()
        setStart()
        width: 200px
        height 60px
        border:1px solid skyblue
        .icon
            absolute()
            line-height: 16px
            left 40px
            top:25px 
            color(green)
            fn(30px)
        .video
            height:50px
            margin:0 10px
        .discription
            p
                mb(0px)
</style>
