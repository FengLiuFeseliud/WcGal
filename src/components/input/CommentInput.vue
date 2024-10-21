<script lang="ts" setup>
    import { CommentRequest } from '@/request/CommentRequest';
    import { Log } from '@/stores/LogStore';
    import MarkDownEditor from '../tool/MarkDownEditor.vue';

    const content = defineModel<string>("content", {
        default: ""
    })
    const resourceId = defineModel<string>("resourceId")
    const { update, reply, commentId } = defineProps<{update: boolean, reply: boolean, commentId: number}>()
    
    async function sendComment(){
        if(content.value == ""){
            Log.error("评论内容为空，你发空气呢？")
            return
        }

        if(resourceId.value == undefined){
            Log.error("资源未加载完成...")
            return
        }

        let data 
        if(update){
            data = await CommentRequest.updateComment(commentId, content.value)
        } else if(reply){
            data = await CommentRequest.sendComment(resourceId.value, content.value, commentId)
        } else {
            data = await CommentRequest.sendComment(resourceId.value, content.value)
        }

        if(data == null){
            return
        }

        if(data.code !== 200){
            Log.error("评论" + (reply ? "回复": (update ? "编辑": "发送")) +"失败...")
            return
        }

        Log.info("评论" + (reply ? "回复": (update ? "编辑": "发送")) +"成功！！！")
        if(!update){
            content.value = ""
        }
    }
</script>

<template>
    <div class="comment-input">
        <MarkDownEditor v-model:text="content"></MarkDownEditor>
        <div class="comment-send-box">
            <button @click="content = ''">清空</button>
            <button @click="sendComment">{{ reply ? "回复": (update ? "编辑": "发送") }}评论</button>
            <div class="comment-data-length iconfont icon-zishutongji">&nbsp;{{ content?.length }}</div>
        </div>
    </div>
</template>
    
<style scoped>
    .comment-input {
        display: flex;
        flex-direction: column;
    }

    :deep(.markdown-editor) {
        min-height: 15vh;
        resize: vertical;
        outline: none;
        border: none;
        overflow-x: hidden;
        word-wrap: normal;
        
        font-size: 1rem;
        border-radius: 1rem;
        background-color: var(--input-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color);
        z-index: 2;
    }

    :deep(.markdown) {
        font-size: 1.2rem;
    }

    .comment-input > textarea:hover {
        border: 0.15rem solid var(--font-color);
    }

    .comment-send-box {
        display: flex;
        padding-left: 70%;
        margin: 0.5rem;

        border-radius: 1rem;
    }

    .comment-send-box > button {
        flex: 1;

        font-size: 1.1rem;
        color: var(--font-color);
        background-color: var(--div-background-color);
        transition: all 0.2s;
        box-shadow: 0.2rem 0.2rem 0.4rem var(--shadow-color);
        z-index: 2;
    }

    .comment-send-box > button:hover {
        color: var(--link-hover-font-color);
        background-color: var(--font-color);
    }

    .comment-data-length {
        width: fit-content;
        padding: 0.2rem 0.8rem;

        color: var(--font-color-2);
        background-color: var(--cover-page-background-color-deep);
        box-shadow: 0.2rem 0.2rem 0.4rem var(--shadow-color);
    }
</style>