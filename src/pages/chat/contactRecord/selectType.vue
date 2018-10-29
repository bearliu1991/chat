<template>
  <div id="select_type" @click="getSearchTypes">
    <Poptip placement="bottom" v-model="visible">
      <div class="icon add">&#xe618;</div>
      <div slot="content" class="content">
        <div class="item" @click="select(false)">全部联系人</div>
        <div class="item" v-for="(item, index) in searchTypes" :key="index" @click="select(item)">{{item.name}}
        </div>
      </div>
    </Poptip>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "select_type",
    data() {
      return {
        visible: false
      }
    },
    computed: {
      ...mapState({
        searchTypes: state => state.chat.searchTypes
      })
    },
    methods: {
      select(item) {
        if (item) {
          this.$store.commit('chat/SEARCH_ACTIVE', item)
          this.visible = false
        } else {
          this.$store.commit('chat/SHOW_SEARCH_RES', false)
          this.$store.commit('chat/SEARCH_ACTIVE')
        }
      },
      getSearchTypes() {
        this.$store.dispatch('chat/getSearchTypes')
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'

  #select_type
    .ivu-poptip
      .ivu-poptip-rel
        .add
          square(25px)
          bgColor(#DBD9D8)
          cursor pointer
      .content
        .item
          padding 5px 0
          text-align center
          cursor pointer
          &:hover
            hover_bgclolr()
</style>
