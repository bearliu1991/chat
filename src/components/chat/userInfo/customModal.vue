<template>
    <div id="custom_modal">
      <div @click="selfDefine" class="custom-text">
        <span>自定义</span>
        <i class="icon">&#xe618;</i>
      </div>
      <Modal
      v-model="modal"
      title="设置标签"
      @on-ok="ok"
      @on-cancel="cancel" class-name="set_marks">
      <ScrollBar>
        <div class="modal">
          <div class="btn-group">
            <div class="wrappers">
              <div v-for="(item, index) in temporaryArr" :key="index" class="item">
                  <div class="title">
                    {{item.name}}
                  </div>
                  <div class="content">
                    <div class="content-wrapper">
                      <ButtonGroup>
                        <Button type="ghost" v-for="(n, idx) in item.arr" :key='idx' @click="checkButtons(index, idx, item.groupChoose)"
                         v-bind:class="n.isActive && 'actived'">{{n.name}}
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollBar>
      </Modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  namne: 'customModal',
  data() {
    return {
      modal: false,
      markType: "全部标签",
      temporaryArr: []
    };
  },
  computed: {
    ...mapState({
      chatId: state => state.chat.chatId
    }),
    ...mapGetters({
      list: 'mark/getAllMarks',
      allChoosedMarks: 'mark/getAllChoosedMarks'
    }),
    choosedMarks() {
      return this.allChoosedMarks[this.chatId]
    },
    allList() {
      if (this.list.length && this.choosedMarks) {
        let allArr = []
        for (let index = 0; index < this.list.length; index++) {
          allArr[index] = {}
          allArr[index].groupId = this.list[index].groupId
          allArr[index].name = this.list[index].name
          this.list[index].groupChoose && (allArr[index].groupChoose = true)
          let formArr = []
          for (let val of this.list[index].arr) {
            let obj = Object.assign(val)
            this.filter(val.id) && (obj.isActive = true)
            formArr.push(obj)
          }
          allArr[index].arr = formArr
        }
        return allArr
      }
      return []
    }
  },
  watch: {
    allList() {
      this.temporaryArr = this.deepCopy(this.allList)
    }
  },
  methods: {
    filter(id) {
      let chooses = this.choosedMarks
      for (let val of chooses) {
        if (val.id === id) {
          return true
        }
      }
      return false
    },
    selfDefine() {
       this.modal = true
       this.ajaxAllMarks()
    },
    ok() {
      let activeArr = []
      let idArr = []
      for (let val of this.temporaryArr) {
        for (let n of val.arr) {
          if (n.isActive) {
            idArr.push(n.id)
            activeArr.push(n)
          }
        }
      }
      this.setMarks({activeArr, idArr, id: this.chatId})
    },
    cancel() {
      this.$Message.destroy()
      this.$Message.info("点击操作被取消")
    },
    checkButtons(index, idx, groupChoose) {
      let arr = this.deepCopy(this.temporaryArr)
      if (groupChoose) {
        arr[index].arr[idx].isActive = !arr[index].arr[idx].isActive
      } else {
        let isTrue = arr[index].arr && (arr[index].arr[idx].isActive)
        for (let val of arr[index].arr) {
          val.isActive = false
        }
        !isTrue && (arr[index].arr[idx].isActive = true)
      }
      this.temporaryArr = arr
    },
    ...mapActions({
      ajaxAllMarks: 'mark/ajaxAllMarks',
      setMarks: 'mark/setMarks',
      cancelMarks: 'mark/cancelMarks'
    })
  }
};
</script>

<style lang="stylus">
.set_marks
  .ivu-modal-body
    height 400px

#custom_modal
  height 100%
  .custom-text
    position relative
    height 100%
    text-align left
    padding-left 8px
    cursor pointer
    span
      height 100%
      display inline-block
      font-size 12px
    .icon
      position absolute
      right 6px
      top -1px
.modal
  .btn-group
    .ivu-radio-group-button .ivu-radio-wrapper
      border-radius 4px
      background #ECEFF2
      margin-right 10px
    .ivu-radio-group-button .ivu-radio-wrapper:after, .ivu-radio-group-button .ivu-radio-wrapper:before
      content ''
      display block
      position absolute
      width 0px
      height 100%
      left 0px
      top 0
      background none
      transition all 0.2s ease-in-out
    .ivu-radio-group-button .ivu-radio-wrapper-checked
      background #2888fa
      border-color #2888fa
      color #fff
    .ivu-radio-group-button .ivu-radio-wrapper-checked:before
      background none
      opacity 0.1
  .wrappers
    .item
      .title
        font-size 14px
        margin-top 15px
      .content
        .content-wrapper
          .ivu-btn-group .ivu-btn
            position relative
            border-radius 4px
            background #ECEFF2
            margin-top 10px
            margin-right 10px
            &:hover
              .delete
                display block
          .ivu-btn-group .ivu-btn:after, .ivu-btn-group .ivu-btn:before
            content ''
            display block
            position absolute
            width 0px
            height 100%
            left 0px
            top 0
            background none
            transition all 0.2s ease-in-out
          .ivu-btn.actived
            background #2888fa
            color #fff
          .delete
            position absolute
            display none
            font-size 15px
            font-weight 700
            line-height 15px
            text-align center
            height 15px
            width 15px
            transform rotateZ(45deg)
            color #fff
            border-radius 50%
            background-color #f00
            right -6px
            top -10px
</style>
