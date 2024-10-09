<script lang="ts" setup>
    import { ref, watch } from 'vue';

    const [ email ] = defineModel<string>()
    const emailName = ref<string>("")
    const emailDomain = ref<string>("@gmail.com")
    
    watch(emailName, emailStr => {
        email.value = emailStr + emailDomain.value
    })

    watch(emailDomain, emailDomainStr => {
        email.value = emailName.value + emailDomainStr
    })
</script>

<template>
    <label class="email-input">
        <i class="iconfont icon-email"></i><input type="text" v-model="emailName"/>
        &nbsp;
        <input type="text" class="email-domain" v-model="emailDomain">
        <select v-model="emailDomain">
            <option value="@gmail.com">gmail.com</option>
            <option value="@proton.com">proton.com</option>
            <option value="@qq.com">qq.com</option>
            <option value="@163.com">163.com</option>
            <option value="@126.com">126.com</option>
            <option value="@yahoo.com">yahoo.com</option>
            <option value="@hotmail.com">hotmail.com</option>
        </select>
    </label>
</template>

<style scoped>
    .email-input {
        display: flex;
    }

    input {
        padding: 0.5rem;
        flex: 1;
        
        border: none;
        font-size: 1rem;
    }

    .email-input i {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
    }

    .email-domain {
        width: 6rem;
        flex: 0;
    }

    select {
        width: 5%;
        border: none;
    }
</style>