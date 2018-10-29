<template>
    <div id="contextmenu" v-show="isShow" :style="{top: position.y + 'px', left: position.x + 'px'}">
      <div class="wrap">
        <GoTop class="go_top" v-if="filter('goTop')" :menuItem="msgData" :id="idx"></GoTop>
        <NewWin class="new_win" v-if="filter('newWin')" :menuItem="msgData">在独立窗口打开</NewWin>
        <Copy class="copy" v-if="filter('copy')" :menuItem="msgData">复制</Copy>
        <!-- <Collect class="collect" @close="closeCollect" v-if="filter('collect')" :menuItem="menuItem">收藏</Collect> -->
        <Paste class="paste" v-if="filter('paste')" :menuItem="msgData">粘贴</Paste>
        <Translate class="translate" v-if="filter('translate')" :menuItem="msgData" :id='idx'>翻译</Translate>
        <DelChat class="del_chat" v-if="filter('delChat')" :menuItem="msgData" :id="idx">删除聊天</DelChat>
        <TransferToText class="transfer_to_text" v-if="filter('toText')" :menuItem="msgData" :id="idx">转换成文字</TransferToText>
        <AddInfo class="remark" type="remake" v-if="filter('remark')" :menuItem="msgData" :id="idx">添加到备注</AddInfo>
        <AddInfo class="add_name" type="name" v-if="filter('addName')" :menuItem="msgData" :id="idx">添加到姓名</AddInfo>
        <Collect class="collect" @close="closeCollect" v-if="filter('collect')" :menuItem="msgData">添加到收藏</Collect>
        <AddInfo class="add_phone" type="phone" v-if="filter('addPhone')" :menuItem="msgData" :id="idx">添加到手机号</AddInfo>
      </div>
    </div>
</template>

<script>
// import {mapGetters} from 'vuex'
export default {
  name: "contextmenu",
  data() {
    return { }
  },
  components: {},
  model: {
    prop: "isShow",
    event: "close"
  },
  // position为鼠标右键传入的点击位置，menuList为传入的需要展示的项目，menuItem为数据
  props: ["isShow", "position", "menuList", "msgData", 'idx'],
  methods: {
    filter(str) {
      return this.menuList.includes(str)
    },
    closeCollect() {
      this.$emit("close", false)
    }
  },
  mounted() {
    let self = this;
    this.$root.Bus.$on("close", val => {
      self.$emit("close", false)
    })
    document.addEventListener("click", function() {
      self.$emit("close", false)
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'

#contextmenu
  z-index 20
  fixed()
  width 120px
  bgColor()
  text-align left
  radius(5px)
  color(#000)
  boxShadow(0 0 5px 2px #ddd)
  .wrap
    padding 10px 0
    >div
      vertical(24px)
      padding 0 10px
      cursor()
      &:hover
        bgColor(#ebebeb)
</style>
