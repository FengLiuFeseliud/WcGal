<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import CanInputBox from '../box/CanInputBox.vue';

    const canInput = ref<boolean>()
    const [ email ] = defineModel<string>({
        default: ""
    })
    const emailName = ref<string>("")
    const emailDomain = ref<string>("gmail.com")

    function validateEmail(email: string): boolean{
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
    }

    function resetEmail(emailStr: string, emailDomain: string): void {
        let emailData = emailStr + "@" + emailDomain
        canInput.value = validateEmail(emailData)
        if(canInput.value){
            email.value = emailData
        } else {
            email.value = ""
        }
    }
    
    watch(emailName, emailStr => resetEmail(emailStr, emailDomain.value))
    watch(emailDomain, emailDomainStr => resetEmail(emailName.value, emailDomainStr))
</script>

<template>
    <CanInputBox v-model:model-value="canInput" class="email-input">
        <i class="iconfont icon-email"></i>
        <input class="email-name-input" type="text" v-model="emailName" placeholder="邮箱名称">
        <span>@</span>
        <input type="text" class="email-domain" v-model="emailDomain" placeholder="邮箱域名" >
        <select v-model="emailDomain">
            <option value="gmail.com">gmail.com</option>
            <option value="proton.com">proton.com</option>
            <option value="qq.com">qq.com</option>
            <option value="163.com">163.com</option>
            <option value="126.com">126.com</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="hotmail.com">hotmail.com</option>
        </select>

        <template #error-msg>
            邮箱格式不正确哦...
        </template>
    </CanInputBox>
</template>

<style scoped>
    .email-input {
        display: flex;
    }

    input {
        font-size: 1rem;
        color: var(--input-focus-font-color);
        background-color: var(--input-color);
    }

    span {
        color: var(--font-color-2);
        line-height: 2.5rem;
        padding: 0 0.3rem;
    }

    .email-name-input {
        flex: 1;
    }

    .email-domain {
        width: 7rem;
    }

    select {
        width: 1.2rem;
        cursor: pointer;
        background-color: var(--input-color);
    }

    select::content {
        font-size: 2rem;
    }

    :deep(label) {
        flex: 1;
    }
</style>