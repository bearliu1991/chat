<template>
    <div id="collect" @click.stop="collect">
      <Poptip v-model="visible" trigger="hover" placement="right-start">
        <div>添加到收藏</div>
        <div slot="title"><i>选择收藏分组</i></div>
        <div slot="content">
          <div class="collect-wrapper">
            <div class="item" v-for="(item, idx) in getCollectList" :key="idx" @click="close(idx)">
              {{item.name}}
            </div>
          </div>
        </div>
    </Poptip>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "collect",
  data() {
    return {
      visible: false
    };
  },
  props: ["menuItem"],
  computed: {
    ...mapGetters({getCollectList:'collect/getCollectList'})
  },
  created() {
    this.getStore()
  },
  methods: {
    collect() {},
    close(index) {
      this.selectCollect({index, item: this.menuItem})
      this.visible = false;
      this.$emit("close", false);
    },
    ...mapActions({
      getStore: "collect/getStore",
      selectCollect:'collect/selectCollect'
    })
  }
};
</script>

<style lang="stylus" scoped>
#collect
  padding 0px !important
  .ivu-poptip
    padding-left 10px
    padding-right 5px
  .collect-wrapper
    .item
      padding 3px 0
      &:hover
        background-color #ebebeb
</style>
