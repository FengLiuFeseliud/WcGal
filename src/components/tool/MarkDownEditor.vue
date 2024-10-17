<script lang="ts" setup>
    import { ref } from 'vue';
    import MarkDown from './MarkDown.vue';
    import RadioBox from '@/components/input/RadioBox.vue';
    import { FileRequest } from '@/request/FileRequest';

    enum UiType{
        EditorAndlMarkDown = "icon-uiwindow_split_x",
        fillMarkDown = "icon-ui_handbook",
        fillEditor = "icon-code1"
    }

    const text = defineModel<string>("text", {
        default: ""
    })
    const showUpload = defineModel<boolean>("showUpload")
    const uiType = ref<UiType>(UiType.EditorAndlMarkDown)

    async function uploadImg(e: Event){
        const input = e.target as HTMLInputElement
        if(input.files == null){
            return
        }

        (await FileRequest.uploadImg(input.files)).forEach(url => {
            text.value += "\n![img](" + FileRequest.img(url) + "?scale=0.5)\n"
        });
    }
</script>

<template>
    <div class="markdown-editor">
        <div class="markdown-editor-tools-bar"> 
            <div class="markdown-editor-tools-bar-left">
                <button class="button iconfont icon-upload" @click="showUpload = !showUpload"></button>
                <button class="button iconfont icon-save-lined" ></button>
                <label class="button iconfont icon-img" for="upload">
                    <input type="file" id="upload" accept="image/*" @change="uploadImg">
                </label>
            </div>
            <div class="markdown-editor-title">
                <h3>Web MarkDown Editor</h3>
            </div>
            <div class="markdown-editor-tools-bar-rigth">
                <!-- <button class="button iconfont icon-hanghao"></button> -->
                <RadioBox name="ui" :checked="0" v-model:modelValue="uiType"
                    :radioTypes="[UiType.EditorAndlMarkDown, UiType.fillMarkDown, UiType.fillEditor]"></RadioBox>
            </div>
        </div>

        <div class="markdown-editor-area">
            <div class="markdown-editor-line" v-show="uiType == UiType.EditorAndlMarkDown || uiType == UiType.fillEditor"> 
                <span class="markdown-line-span" v-for="(index) in text.split('\n')" :key="index"></span>
            </div>
            <textarea class="markdown-editor-input" v-model="text" v-show="uiType == UiType.EditorAndlMarkDown || uiType == UiType.fillEditor" ></textarea>
            <MarkDown :text="text" :line="false" :show="uiType == UiType.EditorAndlMarkDown || uiType == UiType.fillMarkDown"></MarkDown>
        </div>
    </div>
</template>

<style scoped>
    .markdown-editor {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        z-index: 1;
        
        background-color: var(--markdown-editor-color);
    }

    .markdown-editor-area {
        display: flex;
        align-items: stretch;
        flex: 1;
    }

    .markdown-editor-area > * {
        flex: 1;
        width: 0;
    }

    .markdown-editor-tools-bar {
        display: flex;
        height: 2rem;
        flex: 0;

        align-items: stretch;
    }

    .markdown-editor-tools-bar >>> .button {
        width: 2rem;
        padding: 0.4rem 0;

        font-size: 1.2rem;
        text-align: center;
        
        background-color: var(--markdown-editor-tool-button-color);
        transition: all 0.2s;
    }

    .markdown-editor-tools-bar >>> .button:hover {
        color: var(--link-hover-font-color);
        background-color: var(--markdown-editor-tool-button-hover-color);
    }

    .icon-img > input {
        display: none;
    }

    .markdown-editor-title {
        padding: 0.25rem 0;
        text-align: center;
    }

    .markdown-editor-tools-bar-left {
        display: flex;
        flex: 1;

        align-items: stretch;
    }

    .markdown-editor-tools-bar-rigth {
        display: flex;
        flex: 1;

        align-items: stretch;
        flex-direction: row-reverse;
    }

    .markdown-editor-tools-bar {
        background-color: var(--markdown-editor-tools-bar-color);
        transition: all 0.2s;
    }

    .markdown-editor-line {
        display: flex;
        width: fit-content;
        flex: 0;

        flex-direction: column;
        counter-increment: "line";
        background-color: var(--markdown-editor-line-color);
        color: var(--markdown-editor-line-font-color);
        font-style: 1.1rem;
    }

    .markdown-editor-line > .markdown-line-span{
        counter-increment: line;
        padding: 0 0.5rem;
    }

    .markdown-editor-line > .markdown-line-span::before {
        content: counter(line);
    }

    .markdown-editor-input {
        padding: 0;

        resize: none;
        outline: none;
        border: none;
        overflow-x: hidden;
        word-wrap: normal;

        font-size: 1rem;
        line-height: 1.3;
        color: var(--markdown-editor-input-font-color);
        background-color: var(--markdown-editor-color);
    }

    :deep(.markdown) {
        padding: 0 1.5rem;
    }
</style>