<script lang="ts" setup>
    import { ref } from 'vue';

    const [ password ] = defineModel<string>()
    const passwordView = ref<boolean>(false)
</script>

<template>
    <label class="password-input">
        <i class="iconfont icon-password_line"></i>
        <input :type='passwordView ? "text": "password"' v-model="password" placeholder="用户密码" />
        <button class="password-view" @click="() => passwordView = !passwordView">
            <i :class='"iconfont " + (passwordView ? "icon-password-visible" :"icon-password-not-view")'></i>
        </button>
    </label>
</template>

<style scoped>
    .password-input {
        display: flex;
    }

    input {
        padding: 0.5rem;
        flex: 1;

        border: none;
        font-size: 1rem;
        background-color: var(--input-color);
    }

    .password-input i {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
    }

    .password-input > .password-view {
        padding: 0 0.5rem;

        background-color: var(--button-font-color);
    }
</style>