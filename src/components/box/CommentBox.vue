<script lang="ts" setup>
    import { CommentRequest, type Comment } from '@/request/CommentRequest';
    import { FileRequest } from '@/request/FileRequest';
    import { getSmallTime } from '@/utils/TextUtils';
    import { useUserStore } from '@/stores/UserStore';
    import { ref } from 'vue';
    import MarkDown from '@/components/tool/MarkDown.vue';
    import CommentInput from '../input/CommentInput.vue';
    import { Log } from '@/stores/LogStore';
    import ConfirmButton from '../button/ConfirmButton.vue';
    
    const useStore = useUserStore()
    const { comment } = defineProps<{comment: Comment}>()
    const resourceId = ref<string>(comment.resourceId)
    const content = ref<string>(comment.content)
    const editShow = ref<boolean>(false)
    const replyShow = ref<boolean>(false)
    const delConfirm = ref<boolean>(false)
    const show = ref<boolean>(true)

    async function delComment(){
        const data =await CommentRequest.delComment(resourceId.value, comment.commentId)
        if(data == null){
            return
        }

        if(data.code !== 200){
            Log.error("评论删除失败...")
            return
        }
        Log.info("评论删除成功！！！")
        show.value = false
    }
</script>

<template>
    <div class="comment-box" v-show="show">
        <img :src="FileRequest.img(comment.commentAuthor.head + '?scale=0.3')">
        <div class="comment-info">
            <div>
                <i :class="'iconfont icon-nickname_default ' + (comment.commentAuthor.admin ? 'admin-name': 'name')"
                    >&nbsp;{{ comment.commentAuthor.userName }}</i>
            </div>
            <MarkDown :text="content" :show="true" :line="false" v-if="!editShow"></MarkDown>
            <CommentInput :update="true" :reply="false" v-if="editShow" :comment-id="comment.commentId" 
                v-model:resource-id="resourceId" v-model:content="content"></CommentInput>
            <div class="comment-set">
                <i class="iconfont icon-e-date-upload">&nbsp;{{ getSmallTime(comment.createTime) }}</i>
                <i class="iconfont icon-update" v-if="comment.createTime != comment.updateTime"
                    >&nbsp;{{ getSmallTime(comment.updateTime) }}</i>
                <button class="iconfont icon-gerenyouxiang_cebianlan_huifu" 
                    v-if="useStore.isLogin()" @click="replyShow = !replyShow"></button>
                <div v-if="useStore.isMyOrAdmin(comment.commentAuthor.userId)">
                    <button class="iconfont icon-bianji" @click="editShow = !editShow">&nbsp;</button>
                    <button class="iconfont icon-shanchu" @click="delConfirm = true">&nbsp;</button>
                    <ConfirmButton :text="'真的要删除评论么...'" v-model:model-value="delConfirm" @confirm="delComment" />
                </div>
            </div>
            <CommentInput :update="false" :reply="true" :comment-id="comment.commentId" 
                v-model:resource-id="resourceId" v-if="replyShow"></CommentInput>
        </div>
    </div>
</template>

<style scoped>
    .comment-box {
        display: flex;
        height: fit-content;
        background-color: var(--div-background-color);
        padding: 1rem;

        box-shadow: 0.4rem 0.4rem 1rem var(--shadow-color);
    }

    .comment-box > img {
        width: 3vw;
        max-height: 3vw;
        border-radius: 50%;
    }

    .comment-box > .comment-info {
        width: 90%;
        display: flex;
        flex-direction: column;
        padding-left: 0.5vw;
        flex: 1;
    }

    .name {
        color: var(--font-color-2);
    }

    .admin-name {
        color: var(--admin-name);
    }

    .comment-info > :deep(.markdown) {
        padding: 0;
        padding-top: 0.3rem;
        font-size: 1.2rem;
    }

    .comment-info > :deep(.markdown) img {
        max-width: 100%;
    }

    .comment-info > :deep(.comment-input) {
        margin-top: 0.5vh;
    }

    .comment-set {
        display: flex;
        justify-content: end;
        gap: 0.5rem;
    }

    .comment-set i {
        font-size: 0.9rem;
        color: var(--font-color-2);
    }

    .comment-set button {
        position: relative;
        padding: 0 0.1rem;
        z-index: 2;

        font-size: 1rem;
        color: var(--font-color-2);
        background-color: var(--div-background-color);
        transition: all 0.2s;
    }

    .comment-set > div button:hover {
        color: var(--link-hover-font-color);
    }
</style>