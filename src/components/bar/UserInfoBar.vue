<script lang="ts" setup>
    import { useUserStore } from '@/stores/UserStore';
    import { AxiosUilt } from '@/utils/AxiosUtils';

    const useStore = useUserStore()
</script>

<template>
    <div class="user-info-bar">
        <div class="user-info" v-if="useStore.isLogin()">
            <router-link :to="'/user/' + useStore.userId"><img class="head" :src="AxiosUilt.api + useStore.head + '?scale=0.5&quality=1'"></router-link>
        </div>

        <div class="user-login" v-if="useStore.notLogin()">
            <router-link to="/register"><i class="iconfont icon-register"> 注册</i></router-link>
            <router-link to="/login"><i class="iconfont icon-login"> 登录</i></router-link>
        </div>
    </div>
</template>

<style scoped>
    .user-info .head {
        border-radius: 50%;
        width: 2.5rem;
    }
</style>