<script lang="ts" setup>
    import { useLogStore, LogType } from '@/stores/LogStore';
    import ProgressBar from '../bar/ProgressBar.vue';

    const useStore = useLogStore()
</script>

<template>
    <div class="log-box">
        <div v-for="(log, index) in useStore.getLogs().value" :key="log.data">
            <div :class="'log ' + log.level">
                <i v-if="log.level == LogType.INFO" class="iconfont icon-i-info"></i>
                <i v-if="log.level == LogType.WARMING" class="iconfont icon-warming"></i>
                <i v-if="log.level == LogType.ERROR" class="iconfont icon-error"></i>
                {{ log.level.toUpperCase() }}：<br/>
                <span>{{ log.data }}</span>
            </div>
            <ProgressBar :run="true" :className="'progress-bar-' + log.level" :second="3" @end="() => useStore.delLog(index)"></ProgressBar>
        </div>
    </div>
</template>

<style scoped>
    .log-box {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        z-index: 10;
        bottom: 0;
        right: 0;


        width: 18rem;
        font-size: 1rem;
    }

    .log {
        margin-top: 0.35rem;
        padding: 1rem;
        height: fit-content;
        background-color: var(--div-background-color);
        

    }

    .log i {
        font-size: 1.3rem;
    }

    .info {
        color: var(--info-color);
        border-left: 0.3rem solid;
    }

    .progress-bar-info {
        color: var(--info-color);
        border-bottom: 0.3rem solid;
    }

    .warming {
        color: var(--warming-color);
        border-left: 0.3rem solid;
    }

    .progress-bar-warming {
        border-bottom: 0.3rem solid var(--warming-color);
    }

    .error {
        color: var(--error-color);
        border-left: 0.3rem solid;
    }

    .progress-bar-error {
        border-bottom: 0.2rem solid var(--error-color);
    }
</style>