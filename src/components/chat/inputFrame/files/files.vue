<template>
    <div id="files">
      <div class="left">
        <div class="group public">
          <div class="title">
            <span>公众号选择</span>
            <i class="icon">&#xe6ae;</i>
          </div>
          <ul class="code_switch">
            <li @click="switchBtn(0)" :class="{active: publicCodeId === 0}">公众号01</li>
            <li @click="switchBtn(1)" :class="{active: publicCodeId === 1}">公众号02</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <ul class="tabs">
          <li v-for="(item, key, idx) in datas" :key="idx" :class="{active: titleActive === key}">
            <span @click.stop="setActive(key)">{{key}}</span>
            <Select v-model="selectVal" style="width:70%" @on-change="filterGroup" v-if="titleActive === key">
              <Option value="-1">全部</Option>
              <Option :value="index" v-for="(n, index) in item" :key="index">{{ n.name }}</Option>
            </Select>
          </li>
        </ul>
        <div class="conts">
          <Imgs v-show="titleActive === 'imgs'" :imgsArr='imgsArr'></Imgs>
          <Links v-show="titleActive === 'links'" :linksArr="linksArr"></Links>
          <Media comp="audio" v-show="titleActive === 'audios'" :audiosArr="audiosArr"></Media>
          <Media comp="video" v-show="titleActive === 'videos'" :videosArr="videosArr"></Media>
        </div>
        <div class="btns">
          <span class="confirm" @click="send">确定</span>
          <span class="cancel" @click="close">取消</span>
        </div>
      </div>
    </div>
</template>

<script>
  import Media from './media'
  import Links from './links'
  import Imgs from './imgs'
  import Videos from './videos'
  import Audios from './audios'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: "files",
    data() {
      return {
        publicCodeId: 0, // 被选中的公众号
        titleActive : this.title, // 被选中的title
        btns : ['图片', '图文', '语音', '视频'],
        file : Media,
        comp : null,
        selectVal: '-1', // 被选中的option
        imgsArr: [],
        linksArr: [],
        audiosArr: [],
        videosArr: []
      }
    },
    computed: {
      ...mapState({
        fileUrls: state => state.chat.fileUrls,
        chatId: state => state.chat.chatId
      }),
      ...mapGetters({
        files: 'files/getFiles'
      }),
      datas() {
        return this.files[this.publicCodeId]
      }
    },
    watch: {
      datas() {
        this.datas && this.initData()
      }
    },
    props: ['title'],
    components: {Media, Links, Imgs, Audios, Videos},
    methods: {
      ...mapActions({
        ajaxFiles: 'files/ajaxFiles'
      }),
      filterGroup(val) {
        switch (this.titleActive) {
          case 'imgs': 
            this.imgsArr = val === '-1' ? this.installData(this.datas.imgs) : this.installData(this.datas.imgs, val)
            break
          case 'links': 
            this.linksArr = val === '-1' ? this.installData(this.datas.links) : this.installData(this.datas.links, val)
            break
          case 'audios': 
            this.audiosArr = val === '-1' ? this.installData(this.datas.audios) : this.installData(this.datas.audios, val)
            break
          case 'videos': 
            this.videosArr = val === '-1' ? this.installData(this.datas.videos) : this.installData(this.datas.videos, val)
            break
          default:
            break
        }
      },
      initData() {
        this.imgsArr = this.installData(this.datas.imgs)
        this.linksArr = this.installData(this.datas.links)
        this.audiosArr = this.installData(this.datas.audios)
        this.videosArr = this.installData(this.datas.videos)
      },
      installData(data, id) {
        let arr = []
        if (id === undefined) {
          for (let val of data) {
            arr = [...arr, ...val.arr]
          }
        } else {
          arr = data[id].arr
        }
        return arr
      },
      filter(n) {
        if (this.datas) {
          switch (n) {
            case 0: 
              return this.datas.imgs
            case 1: 
              return this.datas.links
            case 2: 
              return this.datas.audios
            case 3: 
              return this.datas.videos
            default:
              return this.datas.imgs
          }
        }
      },
      switchBtn(idx) {
        idx === 1 && this.ajaxFiles(1)
        this.$store.commit('chat/FILE_URLS')
        this.selectVal = '-1'
        this.publicCodeId = idx
      },
      send() {
        // 如果选中的资源个数不为空
        if (this.fileUrls.length > 0) {
          this.$store.commit('chat/FIFLE_MSG', this.chatId)
          this.$store.commit('chat/FILE_URLS')
          this.$emit('close')
        }
      },
      close() {
        this.$emit('close', this.id)
      },
      setActive(key) {
        if (this.titleActive !== key) {
          this.selectVal = '-1'
          this.filterGroup('-1')
          this.titleActive = key
          this.$store.commit('chat/FILE_URLS')
          if (key !== 'audios' && (key !== 'videos')) {
            this.comp = null
          }
          key === 'audios' && (this.comp = 'audio')
          key === 'videos' && (this.comp = 'video')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #files
    display:flex
    height:430px
    .left
      width:140px
      height:100%
      border-right:2px solid #ddd
      .group
        .title
          fn(14px)
          bgColor(#f4f5f9)
        ul
          li
            center()
            cursor()
            height:20px
            fn(14px)
            &:hover
              bgColor(#f7f8fb)
            &.active
              bgColor(#aaa)
          
    .right
      relative()
      width:496px
      .tabs
        flex_()
        li
          flex:1
          setBetween()
          center()
          fn(12px)
          cursor()
          bgColor(#f4f5f9)
          border-right:1px solid #ddd
          padl:2%
          &:last-child
            border:none
          &.active
            bgColor(skyblue)
          &.ivu-select-item-selected
            bgColor(rgba(45,140,240,.9))
      .conts
        height:318px
        overflow-y:auto
      .btns
        absolute()
        width:100%
        border-top:2px solid #ddd
        bottom:0
        height:50px
        span
          float:right
          width:105px
          vertical(20px)
          radius(5px)
          margin:0 20px
          cursor()
          mt(15px)
          center()
          bgColor(#d1d0d0)
          color()
        .confirm
          bgColor(#4ea9e9)
</style>
