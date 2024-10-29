<script lang="ts" setup>
    const canInput = defineModel<boolean | undefined>()
</script>

<template>
    <div class="can-input-box">
        <label :class="'iconfont ' + (canInput !== undefined ? (canInput ? 'canInput': 'notInput'): '')">
            <slot class="input"></slot>
            <i style="padding: 0 0.1rem;" v-if="canInput !== undefined" 
                :class="'iconfont ' + (canInput ? 'icon-Ok': 'icon-X')"></i>

            <slot name="end"></slot>
        </label>
        <span class="error-msg" v-if="canInput == false">
            <slot name="error-msg"></slot>
        </span>
    </div>
</template>

<style scoped>
    .can-input-box {
        display: flex;
        flex-direction: column;
    }

    label {
        display: flex;

        transition: all 0.3s;
        color: var(--font-color-2);
        border-bottom: 0.2rem solid var(--font-color-2);
        background-color: var(--input-color);
    }

    .input {
        flex: 1;
    }

    .canInput {
        border-color: var(--info-color);
    }

    .canInput > i {
        color: var(--info-color);
    }

    .notInput {
        border-color: var(--error-color);
    }

    .notInput > i {
        color: var(--error-color);
    }

    .error-msg {
        width: 100%;
        text-align: end;
        font-size: 0.8rem;
        color: var(--error-color);
    }

</style>