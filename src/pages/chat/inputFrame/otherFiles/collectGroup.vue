<template>
  <div id="collect_group" @click.stop="doNoting">
    <div class="left-wrapper">
      <div class="title">
        自定义收藏分组
      </div>
      <div class="main scroll-wrapper">
        <ScrollBar>
          <div class="item" v-for="(item, idx) in getCollectList" :key="idx" :class="{active:idx===index}"
           @click.stop="selectItem(idx)">
              <span class="inblock">{{item.name}}</span>
              <div class="delete" @click.stop="deleteGroup(idx)">+</div>
          </div>
          <div class="add">
            <Button type="primary" size="small" v-show="!showInput" @click="add">添加分组 +</Button>
            <input class="ipt" ref="group" v-show="showInput" type="text" v-model="groupInput" @blur="blur">
          </div>
        </ScrollBar>
      </div>
      <!-- <div class="bottom">
        <Button type="primary" size="small">添加分组</Button>
        <Button type="primary" size="small" class="btn" @click="deleteMore">删除分组</Button>
      </div> -->
    </div>
    <div class="right-wrapper">
      <div class="title">
        请选择
      </div>
      <div class="main">
        <div>
          <collectList :collectIndex="index" :collectData="collectData" @hidePoptip="hidePoptip"></collectList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 模板
import collectList from "./collectList";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      index: 0,
      groupInput: "",
      showInput: false
    };
  },
  computed: {
    ...mapGetters({ getCollectList: "collect/getCollectList" }),
    collectData() {
      return this.getCollectList.length ? this.getCollectList[this.index] : []
    }
  },
  methods: {
    doNoting() {},
    selectItem(idx) {
      this.index = idx
    },
    add() {
      this.showInput = true;
      this.$nextTick(() => {
        this.$refs.group.focus();
      });
    },
    blur() {
      this.showInput = false
      if (this.groupInput.trim() !== "") {
        for (let i = 0; i < this.getCollectList.length; i++) {
          const ele = this.getCollectList[i].name
          if (ele === this.groupInput) {
            this.$Message.destroy()
            this.$Message.warning("分组已经存在")
            return
          }
        }
        this.addStoreGroup(this.groupInput)
        this.groupInput = ""
      } else {
        this.groupInput = ""
      }
    },
    deleteGroup(idx) {
      if (this.getCollectList.length > 1) {
        this.index = 0
      }
      this.delStoreGroup(idx)
    },
    hidePoptip() {
      this.$emit("hidePoptip", false);
    },
    ...mapActions({
      addStoreGroup: "collect/addStoreGroup",
      delStoreGroup: "collect/delStoreGroup",
      getStore:'collect/getStore'
    })
  },
  watch: {
    groupInput(val) {
      this.groupInput = val.substring(0, 10);
    }
  },
  components: { collectList }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'

#collect_group
  display flex
  .left-wrapper
    width 153px
    border-right solid 1px #ddd
    .title
      font-size 14px
      font-weight bold
      border-bottom solid 1px #ddd
      padding 5px 0
      text-align center
    .main
      height 500px
      overflow auto
      .item
        cursor pointer
        text-align center
        position relative
        &.active
          bgColor(#ddd)
        &:hover
          bgColor(#dedede)
          .delete
            display block
        .inblock
          display inline-block
          padding 6px 15px 6px 0
        .content
          .header
            padding 3px 0
            border-bottom solid 1px #999
        .delete
          display none
          width 24px
          position absolute
          right 5px
          top 3px
          border-radius 50%
          font-size 16px
          transform rotateZ(45deg)
      .add
        margin-top 8px
        cursor pointer
        text-align center
        .ivu-btn
          width 90px
        .ipt
          width 90px
          height 22px
          padding-left 5px
          border solid 1px #f1f1f1
    .bottom
      display flex
      justify-content space-between
      .btn
        margin-right 10px
  .right-wrapper
    flex 1
    .title
      font-size 14px
      font-weight bold
      text-align center
      border-bottom solid 1px #ddd
      padding 5px 10px
</style>
