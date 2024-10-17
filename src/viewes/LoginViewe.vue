<script lang="ts" setup>
    import CoverBox from '@/components/box/CoverBox.vue';
    import EmailInput from '@/components/input/EmailInput.vue';
    import PasswordInput from '@/components/input/PasswordInput.vue';
    import { UserRequest } from '@/request/UserRequest';
    import { useUserStore } from '@/stores/UserStore';
    import { ref } from 'vue';
    import { router } from '@/router'
    import { Log } from '@/stores/LogStore';

    const useStore = useUserStore()
    const email = ref<string>("")
    const password = ref<string>("")

    async function login(){
        if(email.value == ""){
            Log.error("邮箱不填是留给我填么？")
            return
        }

        if(email.value.startsWith("@") || email.value.indexOf("@") == -1){
            Log.error("啊? 这是邮箱么？")
            return
        }

        if(password.value == ""){
            Log.error("密码不填是留给我填么？")
            return
        }

        await UserRequest.login(email.value, password.value)
        if(useStore.token == null || useStore.token == ""){
            return
        }

        Log.info("登录成功~ 返回上一页~ awa")
        router.back()
    }
</script>

<template>
    <CoverBox :show="true">
        <div class="login-box">
            <h2>登录 ~</h2>
            <EmailInput v-model:model-value="email"></EmailInput>
            <PasswordInput v-model:model-value="password"></PasswordInput>

            <div class="tools">
                <router-link to="/">返回</router-link>
                <a @click="login">登录</a>
            </div>
            <router-link class="new-password" to="/password"><i class="iconfont icon-wangjimima"></i>忘记密码?</router-link>
        </div>
    </CoverBox>
</template>

<style scoped>
    .login-box {
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: auto;
        width: 25rem;
        height: 11rem;

        border-radius: 1rem;
        background-color: var(--cover-page-background-color);
    }

    h2 {
        color: var(--font-color);
    }

    .tools {
        height: 2rem;
        display: flex;
        justify-content: space-evenly;
        
        text-align: center;
    }

    .tools > * {
        width: 40%;

        line-height: 2rem;
        color: var(--deep-button-font-color);
        background-color: var(--cover-page-background-color-deep);
    }


    .new-password > i {
        font-size: 0.8rem;
    }

    .new-password {
        font-size: 0.8rem;
        line-height: 0.8rem;

        color: var(--font-color-2);
        text-align: end;
    }
</style>