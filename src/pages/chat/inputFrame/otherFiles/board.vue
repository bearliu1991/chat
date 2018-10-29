<template>
  <div id="board" @click.stop="doNoting">
    <div class="left-wrapper">
      <div class="title">
        <i>选择模板</i>
        <span class="icon fr cursor fn14" @click="ajaxModels(1)">&#xe787;</span>
      </div>
      <div class="main scroll-wrapper">
        <ScrollBar>
          <div class="item" v-for="(item, idx) in list" :key="idx" :class="{active:idx==index}" @click="selectItem(idx)">
            <Poptip trigger="hover" placement="right-start" :transfer="true">
              <span class="inblock">{{item.title}}</span>
              <div class="content" slot="content">
                <div class="header">{{item.title}}</div>
                <div class="example" v-html="item.example"></div>
              </div>
            </Poptip>
          </div>
        </ScrollBar>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="title">{{list[index] && list[index].template_id}}</div>
      <div class="right_main">
        <div>
          <BoardForm @hideMore="$emit('close')" :data="list[index]" :idx="index"></BoardForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 模板
import BoardForm from "./boardForm"
import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      index: 0
    };
  },
  methods: {
    doNoting() {},
    selectItem(idx) {
      this.index = idx;
    },
    hideMore() {
      this.$emit("close", false);
    },
    ...mapActions({
      ajaxModels: 'files/ajaxModels'
    })
  },
  computed: {
    ...mapGetters({
      models: 'files/getModels'
    }),
    list() {
      return this.models.length ? this.models : []
    }
  },
  components: { BoardForm }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'

.example
  white-space: pre

#board
  display flex
  .left-wrapper
    border-right solid 1px #ddd
    width 117px
    text-align left
    .title
      font-size 14px
      font-weight bold
      border-bottom solid 1px #ddd
      padding 5px 0
      .fr
        mr(5px)
    .main
      height 500px
      overflow auto
      .item
        cursor pointer
        padding-right 10px
        &.active
          bgColor(#ddd)
        &:hover
          bgColor(#ddd)
        .inblock
          display inline-block
          padding 6px 10px 6px 0
        .header
          padding 3px 0
          border-bottom solid 1px #999
  .right-wrapper
    flex 1
    text-align left
    .title
      font-size 14px
      font-weight bold
      border-bottom solid 1px #ddd
      padding 5px 10px
</style>
