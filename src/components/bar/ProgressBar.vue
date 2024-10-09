<script lang="ts" setup>
    import { ref } from 'vue';

    const { second, className, run } = defineProps<{second: number, className: string, run: boolean}>()
    const emits = defineEmits(["end"])
    const secondCount = ref<number>(0)

    setTimeout(() => {
        emits("end", null)
    }, second * 1000)
</script>

<template>
    <div :class="'progress-bar ' + className " :value="secondCount" :max="second" v-if="run">
        
    </div>
</template>

<style scoped>
    .progress-bar {
        animation: progress 5s linear 1 forwards;
        border-bottom: 0.3rem solid;
    }

    @keyframes progress {
        0% {
            width: 100%;
        }

        100% {
            width: none;
        }
    }
</style>