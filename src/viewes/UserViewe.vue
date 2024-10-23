<script lang="ts" setup>
    import { UserRequest, type User } from '@/request/UserRequest';
    import { router } from '@/router';
    import { Log } from '@/stores/LogStore';
    import { onActivated, ref } from 'vue';

    const { userId } = defineProps<{userId: string}>()
    var user = ref<User>()
    var preUserId: number

    async function getUser(userId: string) {
        console.log(userId)
        if(Number.isNaN(userId)){
            Log.error("用户 id 错啦！！！")
            return
        }

        let id = Number(userId)
        if(preUserId == id){
            return
        }

        Log.info("获取用户中...")
        const response = await UserRequest.get(id)
        if(response == null || response.data == null){
            Log.info("获取用户失败... qwq")
            setTimeout(() => {
                router.back()
            }, 1000)
        }

        user.value = response.data
        preUserId = user.value.userId
    }

    onActivated(async () => {
        await getUser(userId)
    })
</script>

<template>
    <div class="user-box">
        
    </div>
</template>

<style scoped>
    .user-box {
        width: 100vw;
        height: 100vh;
        max-width: fit-content;
    }
</style>