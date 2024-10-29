<script lang="ts" setup>
    import { ref } from 'vue';
    import CanInputBox from '../box/CanInputBox.vue';


    const canInput = ref<boolean>()
    const [ password ] = defineModel<string>({
        set(passwordStr) {
            canInput.value = passwordStr.length >= 8 && passwordStr.length <= 30
            return passwordStr
        }
    })
    const passwordView = ref<boolean>(false)
</script>

<template>
    <CanInputBox v-model:model-value="canInput" class="password-input">
        <i class="iconfont icon-password_line"></i>
        <input :type='passwordView ? "text": "password"' v-model="password" placeholder="用户密码" />
        
        <template #end>
            <button class="password-view" @click="() => passwordView = !passwordView">
                <i :class='"iconfont " + (passwordView ? "icon-password-visible" :"icon-password-not-view")'></i>
            </button>
        </template>

        <template #error-msg>
            <span>密码不能小于 8 位或大于 30 位...</span>
        </template>
    </CanInputBox>
</template>

<style scoped>
    .password-input {
        display: flex;
    }

    input {
        padding: 0.5rem;
        padding-left: 0;
        flex: 1;

        border: none;
        font-size: 1rem;
        background-color: var(--input-color);
        color: var(--input-focus-font-color);
    }

    .password-view {
        padding: 0 0.25rem;
        color: var(--font-color-2);
        background-color: var(--input-color);
    }
</style>