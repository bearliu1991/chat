<template>
  <div id="chatList">
    <ul>
      <li v-for="(item, index) in partList" :key="index" @contextmenu.prevent.stop="showMenu($event, item)"
          @click="showMsg(item.id)" :class="[(chatId === item.id ? 'active' : ''), item.isTop && 'isTop']" class="chat_li" v-show="!item.isPop">
        <div class="portrait" @click.stop="showPop(item.id, index)" :ref="'portrait' + index">
          <span class="icon">&#xe6c6;</span>
          <i class="num" v-if="item.len > 99">99+</i>
          <i class="num" v-else>{{item.len}}</i>
        </div>
        <div class="cont">
          <div class="name">{{item.name}}</div>
          <div class="msg">{{item.info}}</div>
        </div>
        <div class="time">
          <div class="name">18/23/15</div>
          <span class="icon">&#xe695;</span>
        </div>
      </li>
    </ul>
    <transition name="fade1">
      <PortraitDetail class="contactDetail" :position="detailPosition" :id='portraitIdx' v-if="showDetail"></PortraitDetail>
    </transition>
    <div class="show_all" @click="showAll = !showAll" v-if="isSearch || searchActive.name">
      <span v-show="!showAll">显示全部 ( {{resLen}} )</span>
      <span v-show="showAll">收起</span>
    </div>
    <contextmenu v-model="isShow" :position="menuPosition" :menuList="menuList" :msgData="menuItem"></contextmenu>
    <ModalMove v-for="(item, index) in modalList" v-show="modalList.length" :key="index"
               :class="[activeModal == item.id ? 'bigVal' : '']" @setZindex="showFront" :activeIdx="item.id">
      <ChatFrame :dataId="item.id"></ChatFrame>
    </ModalMove>
  </div>
</template>

<script>
  import PortraitDetail from './portraitDetail'
  import ChatDetail from './chatDetail'
  import InputFrame from './inputFrame'
  import ChatFrame from './chatFrame'
  import {mapState} from 'vuex'
  export default {
    name: "chatList",
    data() {
      return {
        showAll:false,
        detailPosition: {}, // 聊天者个人信息内容位置（点击头像展示内容）
        menuPosition: {}, // 右键列表内容位置
        resLen: null,
        showDetail: false, // 是否展示个人信息
        isShow : false, // 是否展示右键内容
        portraitIdx : -1, // 是否展示右键内容
        activeModal: -1, // 以弹框形式展示的对话内容，可存在多个，该属性为被激活为最顶上的那个
        menuList: ['goTop', 'newWin', 'delChat'], // 右键站现出的内容
        menuItem: {} // 传递给右键选项的数据
      }
    },
    props: ['list', 'isSearch'],
    components: {PortraitDetail, ChatDetail, InputFrame, ChatFrame},
    computed: {
      partList () {
        if (this.list.length) {
          if (this.isSearch || this.searchActive.name) {
            let obj = {}
            if (this.showAll) {
              obj = this.list
            } else {
              obj = this.list.slice(0, 3)
            }
            this.$set(this, 'resLen', this.list.length);
            return obj
          } 
          return this.list
        }

        return []
      },
      ...mapState({
        chatId : state => state.chat.chatId,
        searchActive : state => state.chat.searchActive,
        modalList: state => state.chat.newWinRecord
      })
    },
    updated() {
      this.$emit('complete', true);
    },
    created() {
      document.body.addEventListener('click', () => {
        this.showDetail = false
      })
    },
    methods: {
      showFront(idx) {
        this.$store.commit('chat/CHAT_ID', idx)
        this.activeModal = idx
      },
      showPop(id, index) {
        this.portraitIdx = id
        this.showDetail = false
        let parent = this.$refs['portrait' + index][0]
        this.$store.dispatch('chat/ajaxUserPortrait', id)
        this.$store.dispatch('mark/ajaxChoosedMarks', id)
        let parentOffset = parent.getBoundingClientRect()
        let scroll = document.getElementById('scroll_part').scrollTop
        this.detailPosition = {x: parentOffset.left + 46, y: parentOffset.top + 16 - scroll}
        let timer = setTimeout(() => {
          this.showDetail = true
          clearTimeout(timer)
        }, 1)
      },
      hidePop() {
        this.showDetail = false
      },
      showMsg (n) {
        if (this.modalList.length > 0) {
          return false
        }
        this.$store.dispatch('customerService/ajaxServices', n)
        this.$store.dispatch('customerService/ajaxGroups', n)
        this.$store.dispatch('chat/ajaxUserDetail', n)
        if (this.chatId !== n) {
          this.$store.commit('chat/CHAT_ID', n)
        }
      },
      showMenu (e, item) {
        this.menuPosition = {x: e.clientX, y: e.clientY}
        this.isShow = true
        this.menuItem = item
      }
    },
    watch: {
      showAll() {
        this.$emit('update');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #chatList
    overflow-x:visible
    .show_all
      color(rgb(0, 234, 156))
      fn(14px)
      padding:10px
      cursor()
    li
      display: block
      relative()
      height:61px
      box-sizing:border-box
      padding:5px
      cursor()
      &:hover
        bgColor(#ebebeb)
      &.active
        bgColor(#ebebeb)
      &.isTop
        bgColor(#cccccc)
      .portrait
        position: absolute
        top: 15px
        left: 10px
        width:30px
        fn(12px)
        vertical(30px)
        center()
        radius(50%)
        color(#5d8cdb)
        bgColor(#e1edff)
        mr(15px)
        i
          absolute()
          top: -3px
          left: 21px
          min-width: 16px
          padding:0 2px
          vertical(16px)
          radius(8px)
          bgColor(#ff3b30)
          color()
        .contactDetail
          absolute()
          top:18px
          left:48px
      .cont
        width:138px
        position: absolute
        left: 55px
        top: 15px
        .name
          margin-bottom:10px
          color(#000)
        .msg
          ellipsis()
      .time
        position: absolute
        right: 10px
        top: 15px
        width:50px
        text-align:right
        ellipsis()
      .icon
        display: inline-block
        margin-top: 6px
    .bigVal
      z-index: 900
  .fade1-enter-active, .fade1-leave-active
    transition: opacity .5s;
  .fade1-enter, .fade1-leave-to
    opacity: 0
</style>
