<template>
    <div id="portrait_cont">
      <div class="top">
        <div class="portrait"></div>
        <div class="detail">
          <div class="text">
            <span>{{data.name}}</span>
            <i class="icon">&#xe6b4;</i>
            <i class="icon">&#xe695;</i>
            <i class="icon">&#xe616;</i>
          </div>
          <div>管理员</div>
        </div>
      </div>
      <ul class="basis">
        <li>
          <span>手机</span><i>{{data.mobile}}</i>
        </li>
        <li>
          <span>邮箱</span><i>{{data.email}}</i>
        </li>
        <li>
          <span>部门</span><i>{{data.apartment}}</i>
        </li>
        <li>
          <span>席位</span>
          <div>
            <i>{{data.xiwei && data.xiwei[0]}}</i><br>
            <i>{{data.xiwei && data.xiwei[1]}}</i><br>
            <i>{{data.xiwei && data.xiwei[2]}}</i><br>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "index",
    data() {
      return {}
    },
    computed: {
      ...mapState({data: state => state.public.portraitData})
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #portrait_cont
    .top
      setStart()
      padb(10px)
      border-bottom:1px solid #ddd
      .portrait
        width:40px
        vertical(40px)
        radius(50%)
        bgColor(blue)
        mr(15px)
      .detail
        alignL()
        .text
          setStart()
          margin-bottom:6px
          span
            fn(22px)
          i
            mr(3px)
    .basis
      li
        setStart()
        alignL()
        align-items:flex-start
        margin:10px 0
        span
          width:70px
</style>
