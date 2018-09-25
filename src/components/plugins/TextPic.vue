<template>
  <div id="text_pic">
    <p class="title">{{data.info.title}}</p>
    <div class="split_line"></div>
    <p v-html="data.info.content" class="cont_wrap"></p>
    <div class="split_line"></div>
    <p>模板消息 2018-8-17 11:03:42</p>
  </div>
</template>

<script>
  export default {
    name: "text_pic",
    data() {
      return {}
    },
    props: ['data'],
    methods: {}
  }
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
    .split_line
        margin:2px 5px
        border-top:1px solid #aaa

    #text_pic
        p
          margin:2px 0
        .cont_wrap
          white-space: pre
        .title
          color:#000
          fn(16px)
          bold()
</style>
