<template>
  <div id="collect_list">
    <div class="main-wrapper">
      <ScrollBar>
        <div class="item" v-for="(data, idx) in collectData.msgs" :key="idx" @click="selectCollect(idx)" :class="{active:idx == index}">
          <div class="flex-left">
            <p>{{data.name}}</p>
            <img class="img cursor" width="70" :src='data.info' v-if="data.msgType === 1">
            <div v-if="data.msgType === 4">
              <VideoContainer :data="data"></VideoContainer>
            </div>
            <div class="audio">
              <AudioPlayer :url='data.info' v-if="data.msgType === 3">{{data.info}}</AudioPlayer>
            </div>
            <a :href='data.info' v-if="data.msgType === 5" target='_blank'>{{data.info}}</a>
            <div v-if="data.msgType === 2" class="img_text cursor">
              <TextPic :data="data"></TextPic>
            </div>
            <div v-if="data.msgType === 6" class="">
              <PicText :data="data"></PicText>
            </div>
            <div class="text_wrap" v-if="data.msgType === 0">
              <span v-html='data.info'></span>
            </div>
          </div>
          <div class="flex-right">
            <p>{{data.chatTime}}</p>
            <div class="delete" @click.stop="deleteCollect(idx, data.id)">+</div>
          </div>
        </div>
      </ScrollBar>
    </div>
    <div class="bottom">
      <Button size="small" class="btn" @click="cancal">取消</Button>
      <Button type="primary" size="small" @click="confirm">确定</Button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
  props:['collectData', 'collectIndex'],
  data() {
    return {
      deleteId: -1,
      index: -1
    };
  },
  computed: {
    ...mapGetters({
      chatId: 'chat/getChatId'
    })
  },
  watch: {
    collectIndex() {
      this.index = -1
    }
  },
  methods: {
    deleteCollect(idx, id) {
      this.delStoreMsg({idx, id, arrId: this.collectIndex})
      this.index = -1;
    },
    selectCollect(idx) {
      this.index = idx
    },
    cancal() {
      this.$emit("hidePoptip", false);
    },
    confirm() {
      if (this.index === -1) {
        this.$Message.destroy()
        this.$Message.warning('请至少选择一项内容')
      } else {
        this.$store.commit('chat/MODEL_MSG', {id: this.chatId, data: this.collectData.msgs[this.index]})
        
        this.$emit("hidePoptip", false);
      }
    },
    ...mapActions({ delStoreMsg: "collect/delStoreMsg" })
  }
};
</script>
<style lang="stylus" scoped>
#collect_list
  .main-wrapper
    height 480px
    overflow auto
    .item
      cursor pointer
      display flex
      &:nth-of-type(2n)
        background-color rgb(248, 248, 249)
      &.active
        background-color rgb(223, 237, 251)
      &:hover
        background-color rgb(223, 237, 251)
        .flex-right .delete
          display block
      .flex-left
        text-align left
        padding 10px
        flex 1
        p
          margin-top 5px
          white-space normal
      .flex-right
        position relative
        padding 10px
        min-width 100px
        text-align right
        .delete
          display none
          width 24px
          position absolute
          right 10px
          bottom 11px
          border-radius 50%
          font-size 16px
          transform rotateZ(45deg)
  .bottom
    display flex
    flex-direction row-reverse
    .btn
      margin-left 20px
</style>
