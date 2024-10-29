<script lang="ts" setup>
    import CoverBox from '@/components/box/CoverBox.vue';
    import PasswordInput from '@/components/input/PasswordInput.vue';
    import EmailInput from '@/components/input/EmailInput.vue';
    import EmailCodeInput from '@/components/input/EmailCodeInput.vue';
    import { ref } from 'vue';
    import NameInput from '@/components/input/NameInput.vue';
    import { UserRequest } from '@/request/UserRequest';
    import { router } from '@/router';
    import { Log } from '@/stores/LogStore';
    import ImgAndFormBox from '@/components/box/ImgAndFormBox.vue';

    const userName = ref<string>("")
    const password = ref<string>("")
    const email = ref<string>("")
    const code = ref<string>("")

    async function register(){
        if(email.value == ""){
            Log.error("邮箱不填是留给我填么？")
            return
        }

        if(password.value == ""){
            Log.error("密码不填是留给我填么？")
            return
        }

        if(userName.value == ""){
            Log.error("用户名不填是留给我填么？")
            return
        }

        if(code.value == ""){
            Log.error("验证码不填是留给我填么？")
            return
        }


        if(!(await UserRequest.register(userName.value, email.value, password.value, code.value))){
            Log.error("注册失败... qwq")
            return
        }
        
        Log.info("注册成功~ 跳转至登录页~ awa")
        router.push({"path": "/login"})
    }
</script>

<template>
    <CoverBox :show="true">
        <ImgAndFormBox>
            <h2>注册</h2>
            <NameInput v-model:model-value="userName"></NameInput>
            <EmailInput v-model:model-value="email"></EmailInput>
            <EmailCodeInput :email="email" v-model:model-value="code"></EmailCodeInput>
            <PasswordInput v-model:model-value="password"></PasswordInput>
            
            <div class="tools">
                <router-link to="/">返回</router-link>
                <a @click="register">注册</a>
            </div>
        </ImgAndFormBox>
    </CoverBox>
</template>

<style scoped>
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
</style>