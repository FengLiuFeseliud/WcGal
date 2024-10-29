<script lang="ts" setup>
    import CoverBox from '@/components/box/CoverBox.vue';
    import PasswordInput from '@/components/input/PasswordInput.vue';
    import EmailInput from '@/components/input/EmailInput.vue';
    import EmailCodeInput from '@/components/input/EmailCodeInput.vue';
    import { ref } from 'vue';
    import { UserRequest } from '@/request/UserRequest';
    import { router } from '@/router';
    import { Log } from '@/stores/LogStore';
    import ImgAndFormBox from '@/components/box/ImgAndFormBox.vue';

    const password = ref<string>("")
    const email = ref<string>("")
    const code = ref<string>("")

    async function resetPassword(){
        if(email.value == ""){
            Log.error("邮箱不填是留给我填么？")
            return
        }

        if(password.value == ""){
            Log.error("密码不填是留给我填么？")
            return
        }

        if(code.value == ""){
            Log.error("验证码不填是留给我填么？")
            return
        }


        const bool = await UserRequest.resetPassword(email.value, password.value, code.value);
        if(!bool){
            return
        }
        
        Log.info("更改密码成功~ 跳转至登录页~ awa")
        router.push({"path": "/login"})
    }
</script>

<template>
    <CoverBox :show="true">
        <ImgAndFormBox>
            <h2>更改密码</h2>
            <EmailInput v-model:model-value="email"></EmailInput>
            <EmailCodeInput :email="email" v-model:model-value="code"></EmailCodeInput>
            <PasswordInput v-model:model-value="password"></PasswordInput>
            
            <div class="tools">
                <router-link to="/">返回</router-link>
                <a @click="resetPassword">更改密码</a>
            </div>
        </ImgAndFormBox>
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
        height: 12.5rem;
        z-index: 1;
        
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
        color: var(--font-color-2);
        background-color: var(--cover-page-background-color-deep);
        transition: all 0.2s;
    }

    .tools > *:hover {
        color: var(--link-hover-font-color);
    }

</style>