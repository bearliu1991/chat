<template>
    <div id="inputFrame">
      <div class="inputFrameIcon">
        <ul class="icons">
          <li class="icon emotion">
            <Poptip placement="top-start" width="670" v-model="emotionShow">
              <span class="icon cursor">&#xe60d;</span>
              <div slot="content">
                <Emotions @close="emotionShow = false"></Emotions>
              </div>
            </Poptip>
          </li>
          <li class="icon cut cursor" @click='cutPic'>&#xe6bc;</li>
          <li class="imgs">
            <Poptip placement="top-start" width="670" v-model="imgsShow">
              <span class="icon cursor" @click='getFiles'>&#xe600;</span>
              <div slot="content" class="content">
                <Files @close="imgsShow = false" title="imgs"></Files>
              </div>
            </Poptip>
          </li>
          <li class="links">
            <Poptip placement="top-start" width="670" v-model="linksShow">
              <span class="icon cursor" @click='getFiles'>&#xe602;</span>
              <div slot="content" class="content">
                <Files @close="linksShow = false" title="links"></Files>
              </div>
            </Poptip>
          </li>
          <li class="audio">
            <Poptip placement="top-start" width="670" v-model="audioShow">
              <span class="icon cursor" @click='getFiles'>&#xe714;</span>
              <div slot="content" class="content">
                <Files @close="audioShow = false" title="audios"></Files>
              </div>
            </Poptip>
          </li>
          <li class="video">
            <Poptip placement="top-start" width="670" v-model="videoShow">
              <span class="icon cursor" @click='getFiles'>&#xe64a;</span>
              <div slot="content" class="content">
                <Files @close="videoShow = false" title="videos"></Files>
              </div>
            </Poptip>
          </li>
          <!-- <li class="imgs">
            <Poptip title="Title" content="content" placement="top">
              <span class="icon">&#xe600;</span>
              <div class="api" slot="content"></div>
            </Poptip>
          </li>
          <li class="video">
            <Poptip title="Title" content="content" placement="top">
              <span class="icon">&#xe610;</span>
              <div class="api" slot="content"></div>
            </Poptip>
          </li>
          <li class="icon computer">&#xe602;</li> -->
          <li class="icon store">
            <Poptip :offset="-12"  placement="top-start" width="670" v-model="hideStore">
              <span class="icon cursor" @click='getStore'>&#xe60e;</span>
              <div class="content" slot="content">
                <collectGroup @hidePoptip="hideStore = false"></collectGroup>
              </div>
            </Poptip>
          </li>
          <li class="icon more">
            <Poptip placement="top-start" :offset="-12" width="670"  v-model="hideBoard">
              <span class="icon cursor" @click="ajaxModels">&#xe62c;</span>
              <div class="content" slot="content">
                <Board @close="hideBoard = false"></Board>
              </div>
            </Poptip>
          </li>
          <li class="add_link">
            <Tooltip content="添加链接" placement="top">
              <span class="link cursor icon" @click="isLink = true">&#xe63f;</span>
            </Tooltip>
            <Tooltip content="取消链接" placement="top">
              <span class="link cursor icon" @click="unlink">&#xe641;</span>
            </Tooltip>
            <Modal
              v-model="isLink"
              title="增加超链接"
              @on-ok="ok" class-name="add_link">
              <div class="link_title link_relative">
                <label>标题</label>
                <input type="text" v-model="linkTitle">
              </div>
              <div class="link_href link_relative">
                <label>地址</label>
                <input type="text" v-model="linkHref">
              </div>
          </Modal>
          </li>
        </ul>
      </div>
      <div>
        <um-editor :linkObj="linkObj"></um-editor>
      </div>
    </div>
</template>

<script>
import Files from "./files/files";
import Board from "./otherFiles/board";
import Emotions from "./otherFiles/emotions";
import umEditor from "../../public/Ueditor";
import collectGroup from "./otherFiles/collectGroup";
import {mapState, mapActions} from 'vuex'
export default {
  name: "inputFrame",
  data() {
    return {
      emotionShow: false,
      imgsShow: false,
      linksShow: false,
      audioShow: false,
      videoShow: false,
      hideStore: false,
      hideBoard: false,
      isLink: false,
      linkTitle: '',
      linkHref: '',
      linkObj: {
        isLink: false,
        linkTitle: '',
        linkHref: ''
      }
    };
  },
  computed: {
    ...mapState({
      chatId: state => state.chat.chatId
    })
  },
  components: { Files, Board, collectGroup, umEditor, Emotions },
  methods: {
    // 截图
    unlink() {
      let obj = this.deepCopy(this.linkObj)
      obj.isLink = false
      this.linkObj = obj
    },
    cutPic() {
      this.$Message.destroy()
      this.$Message.info('请使用QQ截图')
    },
    ok() {
      if (!this.linkTitle || !this.linkHref) {
        this.$Message.destroy()
        this.$Message.warning('输入框不能为空')
      } else {
        let obj = this.deepCopy(this.linkObj)
        obj.isLink = true
        obj.linkTitle = this.linkTitle
        obj.linkHref = this.linkHref
        this.linkObj = obj
      }
    },
    getFiles() {
      this.ajaxFiles(0)
    },
    ...mapActions({
      getStore: "collect/getStore",
      ajaxModels: 'files/ajaxModels',
      ajaxFiles: 'files/ajaxFiles'
    })
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
#inputFrame
  .content
    background:#efefef

.add_link
  setMiddle()
  .link_relative
    setMiddle()
    margin: 10px 0
    input
      width: 50%
      height 40px
      ml(10px)
      border: 1px solid #efefef

#inputFrame
  position:absolute
  height:200px
  bottom:0
  right:0
  left:0
  bgColor()
  border-top:1px solid #ddd
  .inputFrameIcon
    &::after
      display: block
      content: ''
      clear: both
  .icons
    setStart()
    bgColor(#eee)
    >li
      display: inline-block
      float: left
      color(#606060);
      margin: 10px 10px
      font-size: 18px
      &:nth-child(1)
        font-size: 20px
    &::after
      content: ''
      display: block
      overflow: hidden
</style>
