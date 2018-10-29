<template>
  <div id="color-picker">
    <Poptip v-model="visible" width="150" trigger="hover" placement="top-end">
        <div class="select" :style="{backgroundColor:colorSelect}"></div>
        <div class="content" slot="content">
            <!-- <a @click="close">close</a> -->
            <div class="color-wrapper">
              <div class="item" v-for="(color, index) in defaultColors" :style="{backgroundColor:color}" :key="index" @click="selectCor(color)">
              </div>
            </div>
        </div>
    </Poptip>
  </div>
</template>

<script>
const defaultColors = ["#333", "red", "blue", "yellow", "#00c1de", "orange"];
export default {
  props: {
    colorName: {
      type: String,
      default: "name"
    }
  },
  data() {
    return {
      visible: false,
      defaultColors,
      colorSelect: "#333"
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
    selectCor(color) {
      this.colorSelect = color;
      this.$emit("changeColor", this.colorName, color);
    }
  }
};
</script>

<style lang="stylus" scoped>
#color-picker
  position absolute
  opacity 0
  transition opacity 0.3s
  right 10px
  top 20%
  .select
    cursor pointer
    height 20px
    width 20px
  .ivu-poptip-inner
    white-space normal
  .content
    .color-wrapper
      display flex
      flex-wrap wrap
      align-content space-between
      justify-content space-between
      .item
        cursor pointer
        display inline-block
        height 20px
        width 20px
        background-color red
        margin-top 8px
        margin-right 10px
</style>
