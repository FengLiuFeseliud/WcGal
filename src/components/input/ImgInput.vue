<script lang="ts" setup>
    import { FileRequest } from '@/request/FileRequest';
    import { ref } from 'vue';

    const imgShow = ref<boolean>()
    const [ imgUrl ] = defineModel<string>()
    
    async function uploadImg(e: Event){
        const input = e.target as HTMLInputElement
        if(input.files == null){
            return
        }

        (await FileRequest.uploadImg(input.files)).forEach(url => {
            imgUrl.value = "" + FileRequest.img(url)
        });
    }
</script>

<template>
    <div class="img-input">
        <img :src="imgUrl + '?scale=0.5'" @error="imgShow = false" @load="imgShow = true" v-show="imgShow">
        <label class="img-url" for="imgUrl">
            <i class="iconfont icon-img"></i>
            <input type="text" v-model="imgUrl" id="imgUrl" placeholder="封面 URL 或上传封面">
            <label class="upload-img iconfont icon-shangchuanfengmian">
                <input type="file" accept="image/*" @change="uploadImg">
            </label>
        </label>
    </div>
</template>

<style scoped>
    .img-input {
        display: flex;
        flex-direction: column;
    }

    .img-input > img {
        margin: 0 auto;
        width: 10vw;
    }

    .img-url {
        display: flex;
        align-items: stretch;
    }

    .img-url > input {
        padding: 0.5rem;
        flex: 1;
        
        border: none;
        font-size: 1rem;
        background-color: var(--input-color);
    }

    .img-url  i {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
    }

    .upload-img {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
        background-color: var(--button-font-color);
    }

    .upload-img > input {
        display: none;
    }
</style>