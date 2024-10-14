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

    const userName = ref<string>("")
    const password = ref<string>("")
    const email = ref<string>("")
    const code = ref<string>("")

    async function register(){
        const data = await UserRequest.register(userName.value, email.value, password.value, code.value)
        if(data == null){
            return
        }
        
        Log.info("注册成功~ 跳转至登录页~ awa")
        router.push({"path": "/login"})
    }
</script>

<template>
    <CoverBox :show="true">
        <div class="register-box">
            <h2>注册 ~</h2>
            <NameInput v-model:model-value="userName"></NameInput>
            <EmailInput v-model:model-value="email"></EmailInput>
            <EmailCodeInput :email="email" v-model:model-value="code"></EmailCodeInput>
            <PasswordInput v-model:model-value="password"></PasswordInput>
            
            <div class="tools">
                <router-link to="/">返回</router-link>
                <a @click="register">注册</a>
            </div>
        </div>
    </CoverBox>
</template>

<style scoped>
    .register-box {
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: auto;
        width: 25rem;
        height: 15.3rem;

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
</style>