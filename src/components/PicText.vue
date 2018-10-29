<template>
    <div id="pic_text">
        <a class="big">
            <img :src="firstData.info">
            <p>{{firstData.title}}</p>
        </a>
        <ul class="small" v-if="otherData.length">
            <li v-for="(item, idx) in otherData" :key="idx">
                <div v-if='idx !== 0' class="split_line"></div>
                <a target="_blank" class="small">
                    <!-- <div class="title">{{item.title}}</div> -->
                    <div class="content">
                        <p>{{item.content}}</p>
                        <img :src="item.info">
                    </div>
                </a>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "pic_text",
    data() {
        return {}
    },
    props: ['data'],
    computed: {
        firstData() {
            return this.data.info[0]
        },
        otherData() {
            return this.data.info.slice(1)
        }
    },
    methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
    .split_line
        relative()
        z-index:1
        margin:2px 5px
        border:1px solid #ddd

    #pic_text
        mt: 15px
        .big
            relative()
            inline()
            ellipsis()
            width: 100%
            height:70px
            img
                width: 100%
                height:100%
            p
                absolute()
                left:5%
                width: 90%
                bottom:10px
                ellipsis()
                color()
        .small
            padding: 0 5px
            color(#333)
            bgColor()
            mt(-10px)
            li
                a
                    display:block
                    .content
                        height:60px
                        setBetween()
                        img
                            width: 40px
                            height: 40px
                        p
                            padding 5px
                            height:50px
                            ellipsis()
                            width:120px
</style>
