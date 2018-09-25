<template>
    <div id="portraitDetail" :style="{left: position.x + 'px', top: position.y + 'px'}">
      <div class="top">
        <div class="portrait">
          <img :src="info.portrait">
        </div>
        <div class="detail">
          <div class="text">
            <span>{{info.name}}</span>
            <i class="icon">&#xe6b4;</i>
            <i class="icon">&#xe695;</i>
            <i class="icon">&#xe616;</i>
          </div>
          <div>来访{{info.times}}次</div>
        </div>
      </div>
      <ul class="basis">
        <li>
          <span>公众号</span><i>{{info.publicCode}}</i>
        </li>
        <li>
          <span>来源</span><i>{{info.source}}}</i>
        </li>
        <li>
          <span>当前定位</span><i>{{info.location}}</i>
        </li>
        <li>
          <span>上次来访</span><i>{{info.lastTime}}</i>
        </li>
      </ul>
      <ul class="label">
        <li class="ran1" v-for="(item, index) in choosedMarks" :key="index">{{item.name}}</li>
        <!-- <li class="define">
          <div>
            <span>自定义</span>
            <i class="icon">&#xe618;</i>
          </div>
        </li> -->
      </ul>
    </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: "contactDetail",
    data() {
      return {}
    },
    props: {
      position:{
        default: {x: 0, y: 0}
      }, 
      id: {
        default: 0
      }
    },
    computed: {
      ...mapState({allChator: state => state.chat.allChator}),
      ...mapGetters({getAllChoosedMarks: 'mark/getAllChoosedMarks'}),
      info() {
        if (this.id < 0) {
          return {}
        } else {
          return this.allChator[this.id]
        }
      },
      choosedMarks() {
        return this.getAllChoosedMarks[this.id]
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #portraitDetail
    fixed()
    width:260px
    padding:10px
    color(#000)
    bgColor(#fff)
    z-index:5
    radius(5px)
    boxShadow(0 0 5px 2px #ddd)
    .top
      setStart()
      padb(10px)
      border-bottom:1px solid #ddd
      .portrait
        width:40px
        vertical(40px)
        radius(50%)
        overflow:hidden
        mr(15px)
      .detail
        .text
          setStart()
          margin-bottom:6px
          span
            fn(22px)
    .basis
      li
        setStart()
        align-items:flex-start
        margin:10px 0
        span
          width:30%
        i
          width:70%
          alignL()
    .label
        padt(15px)
        border-top:1px solid #dddddd
        li
          inline()
          vertical(21px)
          padding:0 6px
          radius(2px)
          margin:5px
          color()
        .define
          >div
            width:70px
            setMiddle()
            border:1px solid #ff3b30
            color(#ff3b30)
        .ran1
          bgColor(skyblue)
        .ran2
          bgColor(black)
        .ran3
          bgColor(red)
        .ran4
          bgColor(green)

</style>
