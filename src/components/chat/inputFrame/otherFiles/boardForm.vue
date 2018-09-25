<template>
  <div id="board_form">
    <!-- <ScrollBar> -->
      <div class="form">
        <div class="has_data">
            <i>标题:</i>
            <span>{{data.title}}</span>
        </div>
        <div class="has_data">
          <i>行业:</i>
          <span>{{data.primary_industry}}|{{data.deputy_industry}}</span>
        </div>
        <div class="dataContent">
          <span class="wrap_span" v-for="(item, ids) in dataArr" :key="ids" :class="{'block_span': item === '\n', 'isText':  item.isText}">
            <div class="br" v-if="item === '\n'"></div>
            <span class="input_wrap" v-if="item.param">
              <input class="inputP" :style="{color: item.color || 'inherit'}" :id="item.color" :ref="item.param" type="text">
              <div class="color_picker">
                <i class="inblock" :style="{background: item.color || colors[0]}" @click="activeIdx = activeIdx === ids ? -1 : ids"></i>
                <ul v-show="ids === activeIdx">
                  <li v-for="(a, n) in colors" :style="{background: a}" :key="n" @click="changeColor(ids, n)"></li>
                </ul>
              </div>
            </span>
            <span class="textP" v-if="item.isText">{{item.value}}:</span>
          </span>
        </div>
        <div class="btns">
            <Button type="primary" @click="handleSubmit">确定</Button>
            <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
        </div>
      </div>
    <!-- </ScrollBar> -->
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
  data() {
    return {
      dataArr: [],
      color0: '#19be6b',
      activeIdx: -1,
      colors: ['#F9E31C', '#2D8CF0', '#19BE6B', '#ED4014', '#D1C4E9']
    };
  },
  computed: {
    ...mapGetters({
      models: 'files/getModels'
    }),
    ...mapState({
      chatId: state => state.chat.chatId
    })
  },
  watch: {
    data() {
      let validArr = []
      for (let key of Object.keys(this.$refs)) {
        this.$refs[key][0].value = ''
      }
      let splitArr = this.data.content && this.data.content.split(/({ {)|(} })|(\n)/g)
      for (let val of splitArr) {
        if (val) {
          if (/\.DATA/.test(val)) {
            validArr.push({
              param: val.replace('.DATA', ''),
              color: ''
            })
          } else if (val.replace && /[\u4E00-\u9FFF]+/.test(val.trim().replace(':', ''))) {
            validArr.push({
              value: val.trim().replace(':', ''),
              isText: true
            })
          } else {
            val && (val !== '{ {') && (val !== '} }') && validArr.push(val)
          }
        }
      }
      this.dataArr = validArr
    }
  },
  props: {
    'data': {
      type: Object,
      default() { 
        return {} 
      }
    },
    idx:{
      type: Number
    }
  },
  methods: {
    handleSubmit() {
      let obj = {}
      let allEmpty = true
      for (let key of Object.keys(this.$refs)) {
        let refObj = this.$refs[key][0]
        refObj.value.trim() && (allEmpty = false) 
        if (refObj.id && (refObj.id !== "inherit")) {
          obj[key] = {
            value: refObj.value,
            color: refObj.id
          }
        } else {
          obj[key] = {
            value: refObj.value
          }
        }
      }
      if (allEmpty) {
        this.$Message.destroy()
        this.$Message.warning('请输入至少一项数据')
      } else {
        let self = this
        let str = self.data.content
        this.submitModelData({data: obj}).then((res) => {
          if (res.data.code === 1) {
            self.$emit('hideMore')
            this.$Message.destroy()
            this.$Message.success('数据提交成功！')
            for (let key of Object.keys(this.$refs)) {
              let val = this.$refs[key][0].value
              if (new RegExp('({ {' + key + '.DATA} })').test(str)) {
                str = str.replace(RegExp.$1, val)
              }
            }
            this.$store.commit('chat/MODEL_MSG', {id: self.chatId,
              data: {
                name: '我',
                info: {
                  title: self.data.title,
                  content: str
                },
                type: 1,
                infoType: 0,
                msgType: 2,
                id:137,
                chatTime: 1533260730
              }
            })
          }
        })
      }
    },
    handleReset(name) {
      for (let key of Object.keys(this.$refs)) {
        let refObj = this.$refs[key][0]
        refObj.value = ''
      }
    },
    changeColor(ids, n) {
      let tem = this.deepCopy(this.dataArr)
      tem[ids].color = this.colors[n]
      this.dataArr = tem
      this.activeIdx = -1
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
  
#board_form
  .form
    font-size:14px
    padding:10px
    padl(20px)
    .has_data
      margin-bottom:20px
    .btns
      mt(20px)
    .dataContent
      text-align:left
      .wrap_span
        inline()
        vertical(30px)
        &.block_span
          display:block
          vertical(5px)
        &.isText
          transform: translateY(-10px)
        .input_wrap
          position:relative
          display:inline-block
          width:300px
          height:30px
          input
            border:1px solid #ddd
          .color_picker
            position:absolute
            top:0
            width:30px
            right:0
            bottom:0
            .inblock
              bgColor()
              inline()
              top:0
              left:0
              right:0
              bottom:0
              absolute()
            ul
              absolute()
              top:5px
              width:100px
              left: 32px
              flex_()
              li
                flex:1
                radius(3px)
                height:20px
        .br
          width:100%
          display:block
        .inputP
          absolute()
          top:0
          left:0
          width:100%
          height:100%
          padding:5px
        .textP
          margin-right:10px

#board_form
  height 500px
  overflow auto
  
</style>
