<template>
    <div id="contact_record">
      <!--<div class="company pad10">-->
        <!--<span>{{userInfo && userInfo.company}}</span>-->
        <!--<i class="icon">&#xe634;</i>-->
      <!--</div>-->
      <div class="search pad8">
        <SearchInput></SearchInput>
        <select-type></select-type>
      </div>
      <div id="scroll_part">
        <ScrollBar ref="scrollBar" :isAuto="false">
          <div class="searchChat" v-show="showSearch">
            <div class="res_title">搜索结果</div>
            <ChatList @update="$refs.scrollBar.updated()" @complete="updateScroll" class="searchList" :list="searchRes" isSearch="true"></ChatList>
          </div>
          <div class="chat_part" v-show="!showSearch || searchActive.name">
            <div class="tips" v-show="searchActive.name">
              <span>{{searchActive.name}}</span>
            </div>
            <!-- <div v-show="!lists.length" class='no_data'>此列表无数据</div> -->
            <ChatList @update="$refs.scrollBar.updated()" @complete="updateScroll" :list="lists" :keyId="'latest'" class="chatList"></ChatList>
          </div>
        </ScrollBar>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import selectType from "./selectType";
import SearchInput from "../../public/searchInput";
import ChatList from "../chatList";

export default {
  name: "contact_record",
  data() {
    return {
      timer: null,
      type: "",
      length: 0
    };
  },

  computed: {
    ...mapState({
      chatList: state => state.chat.allChator,
      userInfo: state => state.public.userInfo,
      showSearch: state => state.chat.showSearchRes,
      searchRes: state => state.chat.searchRes,
      searchActive: state => state.chat.searchActive
    }),
    lists() {
      let obj = {}
      if (this.searchActive.name) {
        for (let key of Object.keys(this.chatList)) {
          this.chatList[key].searchType === this.searchActive.type && obj.push(this.chatList[key])
        }
      } else {
        let tops = []
        let noTops = [] 
        for (let key of Object.keys(this.chatList)) {
          let obj = this.chatList[key]
          obj.isTop ? tops.push(obj) : noTops.push(obj)
        }
        
        tops.sort((a, b) => a.setTopTime > b.setTopTime) 
        obj = [...tops, ...noTops]
      }
      return obj
    }
  },
  created() {
    this.$store.dispatch("chat/getRecords");
    // this.$store.commit("chat/SEARCH_ACTIVE", { type: 0 });
    this.$store.dispatch("public/getUserInfo");
  },
  components: { selectType, SearchInput, ChatList },
  methods: {
    updateScroll() {
      if (Object.keys(this.chatList).length === this.length) {
        return false;
      }
      this.length = Object.keys(this.chatList).length;
      this.$refs.scrollBar.updated();
    },
    hideContextmenu() {
      this.isShow = false;
    }
  },
  watch: {
    showSearch() {
      this.$refs.scrollBar.updated();
    },
    'searchActive.name'() {
      this.$refs.scrollBar.updated();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl';

.pad8
  padding: 8px

#contact_record
  relative()
  height: 100%
  width: 252px
  text-align: left
  color(#616161)
  bgColor(#F5F5F5)
  border-right: 1px solid #eee
  height: 100%
  float: left
  .company 
    setBetween()
    span
      color(#b2b2b2)
    .icon
      color(#ff3b30)
  .search
    setBetween()
    .add
      square(25px)
      bgColor(#dbd9d8)
  #scroll_part
    absolute()
    top:40px
    left:0
    right:0
    bottom:0 
    overflow-y: auto
    resetScrollBar()
    .tips, .res_title
      bgColor(#dbd9d8)
      font-size: 12px
      font-weight: 700
      color: #333
      padding: 7px 15px
    .no_data 
      text-align: center
      font-size: 20px
      padding: 10px
    .chat_part
      height: 100%
    .chatList 
      height: 100%
</style>
