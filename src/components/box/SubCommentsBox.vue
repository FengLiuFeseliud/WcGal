<script lang="ts" setup>
    import CommentBox from './CommentBox.vue';
    import { CommentRequest, type Comment } from '@/request/CommentRequest';
    import { Page } from '@/utils/PageUtils';
    import { ref } from 'vue';
    import PageToBar from '../bar/PageToBar.vue';

    const { comment } = defineProps<{comment: Comment}>()
    const subCommentShowAll = ref<boolean>(false)
    const page = new Page(10, async (page, limit) => {
        return await CommentRequest.getComments("co_" + comment.commentId, page, limit, false)
    })

    async function subShowAll(){
        await page.to(0);
        subCommentShowAll.value = true
    }
</script>

<template>
   <div class="sub-comment-info-box" v-if="!subCommentShowAll">
        <CommentBox :comment="subComment" v-for="(subComment, index) in comment.subComment" :key="index"></CommentBox>
        <button class="all-sub-comment-button" v-if="comment.subComment.length != comment.subCommentCount" @click="subShowAll">
            查看共 {{ comment.subCommentCount }} 条回复</button>
    </div>
    <div class="sub-comment-info-box" v-if="subCommentShowAll">
        <CommentBox :comment="subComment" v-for="subComment in page.list.value" :key="subComment.commentId"></CommentBox>
        <button class="all-sub-comment-button" @click="subCommentShowAll = false">收起回复</button>
        <PageToBar :page="page"></PageToBar>
    </div>
</template>

<style scoped>
    .sub-comment-info-box {
        display: flex;
        flex-direction: column;
        justify-content: end;

        width: 94%;
        margin-left: 6%;
    }

    .sub-comment-info-box > * {
        margin-top: 1vh;
    }

    .all-sub-comment-button {
        position: relative;
        padding: 0.5rem;
        border-radius: 1rem;
        z-index: 2;

        font-size: 1rem;
        color: var(--font-color);
        background-color: var(--div-background-color);
        box-shadow: 0.4rem 0.4rem 0.8rem var(--shadow-color);
        transition: all 0.2s;
    }

    .all-sub-comment-button:hover {
        color: var(--link-hover-font-color);
        background-color: var(--font-color);
    }
</style>