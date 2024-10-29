<script lang="ts" setup>
    import { UserRequest } from '@/request/UserRequest';
    import { Log } from '@/stores/LogStore';
    import { ref } from 'vue';
    import CanInputBox from '../box/CanInputBox.vue';

    const canInput = ref<boolean>()
    const { email } = defineProps<{email: string}>()
    const [ code ] = defineModel<string>({
        default: "",
        set(code) {
            canInput.value = code.length >= 6
            return canInput.value ? code.slice(0, 6) : code
        }
    })

    const sendCodeCdStr = ref<string>()
    var canSendCode = true;
    var sendCodeCd = 60

    function getDispalyCode(code: string){
        let str = code
        for(let index = 0; index <  6 - code.length; index++){
            str += "_"
        }
        return str
    }

    function sendCd(){
        setTimeout(() =>  {
            if(sendCodeCd > 0){
                sendCodeCd -= 1
                sendCd()
            } else if(sendCodeCd == 0){
                sendCodeCd = 60
                canSendCode = !canSendCode
            }
            sendCodeCdStr.value = sendCodeCd == 60 ? "": sendCodeCd+""
        }, 1000)
    }

    async function sendCode() {
        if(!canSendCode){
            Log.error("过会再发送吧... 太快了...")
            return
        }

        if(email == null || email.startsWith("@") || email == ""){
            Log.error("邮箱格式不正确啦！！！")
            return
        }
        sendCd()
        canSendCode = !canSendCode
        const bool = await UserRequest.sendEmailCode(email)
        if(!bool){
            return
        } 

        Log.info("验证码发送了！去邮箱看看吧！")
    }
</script>

<template>
    <CanInputBox v-model:model-value="canInput" class="email-code-input">
        <i class="iconfont icon-code"></i>
        <input v-model="code" type="text">
        <div class="code">
            <span v-for="str in getDispalyCode(code)" :key="str">{{ str }}</span>
        </div>

        <template #end>
            <button class="send-email-code" @click="sendCode">
                <i class="iconfont icon-send-email">
                    <span class="send-code-cd">{{ sendCodeCdStr }}</span>
                </i>
            </button>
        </template>

        <template #error-msg>
            <span>邮箱验证码是 6 位啦...</span>
        </template>
    </CanInputBox>
</template>

<style scoped>
    input {
        padding: 0.5rem;
        position: absolute;
        opacity: 0;
        z-index: 2;
    }

    .code {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        flex: 1;
    }

    .code > span {
        padding: 0.5rem  0.9rem;
        color: var(--input-focus-font-color);
        background-color: var(--input-color);
    }

    .send-email-code {
        padding: 0 0.25rem;
        color: var(--font-color-2);
        background-color: var(--input-color);
    }

    .send-code-cd {
        font-size: 0.8rem;
        color: var(--font-color);
    }
</style>