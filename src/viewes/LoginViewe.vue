<script lang="ts" setup>
    import CoverBox from '@/components/box/CoverBox.vue';
    import EmailInput from '@/components/input/EmailInput.vue';
    import PasswordInput from '@/components/input/PasswordInput.vue';
    import { UserRequest } from '@/request/UserRequest';
    import { ref } from 'vue';
    import { router } from '@/router'
    import { Log } from '@/stores/LogStore';
    import ImgAndFormBox from '@/components/box/ImgAndFormBox.vue';

    const email = ref<string>("")
    const password = ref<string>("")

    async function login(){
        if(email.value == ""){
            Log.error("邮箱不填是留给我填么？")
            return
        }

        if(password.value == ""){
            Log.error("密码不填是留给我填么？")
            return
        }

        if(!(await UserRequest.login(email.value, password.value))){
            Log.error("登录失败... qwq")
            return
        }

        Log.info("登录成功~ 返回上一页~ awa")
        router.back()
    }
</script>

<template>
    <CoverBox :show="true">
        <ImgAndFormBox>
            <h2>登录</h2>
            <EmailInput v-model:model-value="email"></EmailInput>
            <PasswordInput v-model:model-value="password"></PasswordInput>

            <div class="tools">
                <router-link to="/">返回</router-link>
                <a @click="login">登录</a>
            </div>
            <router-link class="new-password" to="/password"><i class="iconfont icon-wangjimima"></i>忘记密码?</router-link>
        </ImgAndFormBox>
    </CoverBox>
</template>

<style scoped>
    :deep(.cover){
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
        color: var(--font-color-2);
        background-color: var(--cover-page-background-color-deep);
        transition: all 0.2s;
    }

    .tools > *:hover {
        color: var(--link-hover-font-color);
    }


    .new-password > i {
        font-size: 1rem;
    }

    .new-password {
        font-size: 1rem;
        line-height: 0.8rem;

        color: var(--font-color-2);
        text-align: end;
        transition: all 0.2s;
    }

    .new-password:hover {
        color: var(--link-hover-font-color);
    }
</style>