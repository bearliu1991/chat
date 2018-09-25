<template>
    <div id="pop_content">
        <Poptip content="content" placement="bottom" v-model="visible">
            <span class="icon" v-if="type === 'service' && isTitle">&#xe62f;</span>
            <span class="icon" v-if="type === 'group' && isTitle">&#xe67c;</span>
            <span class="icon cursor" v-if='!isTitle'>{{service}}</span>
            <div class="api" slot="content">
                <div class="title">
                    <span v-if="type === 'service'">选择客服</span>
                    <span v-if="type === 'group'">选择分组</span>
                </div>
                <ul class="list">
                    <li v-for="(item, key, index) in list" :key="index" :class="{active:showId - key === 0}" @click="change(key)">{{item, key}}</li>
                </ul>
            </div>
        </Poptip>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            visible: false
        }
    },
    props: ['type', 'id', 'isTitle'],
    computed: {
        ...mapState({
            chatId: state => state.chat.chatId,
            allChator: state => state.chat.allChator
        }),
        showId() {
            return this.id || 1
        },
        list() {
            if (this.type === 'service') { return this.$store.getters['customerService/getServices'] }
            if (this.type === 'group') { return this.$store.getters['customerService/getGroups'] }
            return {}
        },
        service() {
            if (Object.keys(this.list).length) {
                return this.list[this.showId]
            }
            return ''
        }
    },
    methods: {
        change(key) {
            // this.activeId = key
            if (this.type === 'service') {
                this.$store.dispatch('chat/ajaxCustomerService', {id:this.chatId, key})
            }
            if (this.type === 'group') {
                this.$store.dispatch('chat/ajaxGroup', {id:this.chatId, key})
            }
            this.visible = false
        },
        popperShow() {
            this.$refs.serviceSelect.lalala()
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
#pop_content
  .list
    li
        cursor()
        &.active
            bgColor(#efefef)
</style>
