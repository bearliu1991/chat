<template>
    <div id="chatTitle">
      <div class="left_p">
        <div class="line1">
          <span class="name">{{info.name}}在线</span><i class="icon">&#xe6b4;</i>
        </div>
        <span class="title">{{info.publicCode}}/{{info.source}}</span>
      </div>
      <ul class="icons">
        <div class="hide-animation">
          <div class="trans" :class="{show:openIcon,hide:!openIcon}">
            <li class="icon" @click='hideRightBar'>&#xe63a;</li>
            <li class="servers">
              <PopChoose type="service" isTitle='true' :id="info.serviceId"></PopChoose>
            </li >
            <li class="icon">
              <PopChoose type="group" isTitle='true' :id="info.groupId"></PopChoose>
            </li>
            <li class="filter">
              <Poptip content="content" placement="bottom">
                <span class="icon">&#xe60c;</span>
                <div slot="content">
                  <MsgFilter :id='dataId'></MsgFilter>
                </div>
              </Poptip>
            </li>
          </div>
        </div>
        <li class="icon" @click="openIcon = !openIcon">
          <span v-show="openIcon">&#xe6ae;</span>
          <span v-show="!openIcon">···</span>
        </li>
      </ul>
    </div>
</template>

<script>
import MsgFilter from "./msgFilter"
import PopChoose from "./popChoose"
import {mapState} from 'vuex'
export default {
  name: "chatTitle",
  components: { MsgFilter, PopChoose },
  data() {
    return {
      openIcon: true,
      hideServer: false
    };
  },
  props: ['dataId'],
  computed: {
    ...mapState({allChator: state => state.chat.allChator}),
    info() {
      if (this.dataId < 0) {
        return {}
      } else {
        return this.allChator[this.dataId]
      }
    }
  },
  methods: {
    hidePoptip(val) {
      this.hideServer = val
    },
    hideRightBar() {
      this.$emit('hideRightBar')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'

#chatTitle
  setBetween()
  text-align left
  padding 10px
  height:59px
  border-bottom:1px solid #ddd
  .left_p
    .line1
      setStart()
      margin-bottom 10px
      .name
        color(#000)
      .icon
        color(#46b6ef)
    .title
      color(#b2b2b2)
  .icons
    setEnd()
    .hide-animation
      display flex
      overflow-x hidden
      overflow-y hidden
      .trans
        display flex
        transition transform 0.2s ease-in-out
      .hide
        transform translateX(100px)
    li
      cursor()
      square(22px)
      radius(50%)
      color(#b2b2b2)
      ft(12px)
      margin 0 5px
      bgColor(#f2efef)
</style>
