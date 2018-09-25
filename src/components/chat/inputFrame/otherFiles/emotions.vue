<template>
    <div id="emotions">
        <ul class="icons">
            <li v-for="(item, idx) in emts" :key="idx">
                <img width="20px" height="20px" :src="item.src" @click="insertEmotion(item)">
                <span>{{item.name}}/{{item.title}}</span>
            </li>
        </ul>
        <ul class="btns">
            <li @click="getData(0)" :class="{active: activeIdx === 0}">组一</li>
            <li @click="getData(1)" :class="{active: activeIdx === 1}">组二</li>
        </ul>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                activeIdx: 0
            }
        },
        computed: {
            ...mapGetters({
                emotions: 'emotions/getEmots'
            }),
            emts() {
                if (this.emotions.length) {
                    return this.emotions[this.activeIdx]
                }
            }
        },
        created() {
            this.ajaxEmotions(0)
        },
        methods: {
            insertEmotion(item) {
                this.$store.commit('emotions/CURR_EMOTION', item.src)
                this.$emit('close')
            },
            getData(idx) {
                this.activeIdx = idx
                !this.emotions[idx] && this.ajaxEmotions(idx)
            },
            ...mapActions({
                ajaxEmotions : 'emotions/ajaxEmotions'
            })
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~@/assets/css/index.styl'
    #emotions
        min-height:100px
        relative()
        padl(20px)
        .icons
            clear()
            quare(30px)
            li
                fl()
                relative()
                &:hover
                    span
                        visibility: visible
                span
                    visibility: hidden
                    absolute()
                    padding:5px
                    top:20px
                    left: -20px
        .btns
            absolute()
            bottom:10px
            li
                fl()
                padding:5px
                bgClor(#aaa)
                &.active
                    bgColor(skyblue)
                &:first-child
                    mr(10px)
</style>
