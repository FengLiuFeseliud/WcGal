<script lang="ts" setup>
    import { watch } from 'vue';

    class columnItem {
        public columnHigh: number = 0
        public item: any

        constructor(){

        }
    }

    const column = defineModel<number>("column", {
        default: 1
    })

    const itemWidth = defineModel<string>("itemWidth")
    const itemAddHigh = defineModel<string>("itemAddHigh")
    const datas = defineModel<any[]>("datas")

    const columnItems: columnItem[] = []
    for(var index = 0; index < column.value; index ++){
        columnItems.push(new columnItem())
    }

    watch(datas, () => {
        
    })
</script>

<template>
    <div class="water-fall-box">
        <div class="water-fall-item" v-for="(data, index) in datas" :key="index">
            <slot :data="data"></slot>
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>