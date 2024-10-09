<script lang="ts" setup>
    import { UserRequest } from '@/request/UserRequest';
import { Log } from '@/stores/LogStore';
    import { ref } from 'vue';

    const { email } = defineProps<{email: string}>()
    const [ code ] = defineModel<string>()
    const sendCodeCdStr = ref<string>()
    var canSendCode = true;
    var sendCodeCd = 60

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
    <label class="email-code-input">
        <i class="iconfont icon-code"></i>
        <input type="text" v-model="code"/>
        <button class="send-email-code" @click="sendCode">
            <i class="iconfont icon-send-email">
                <span class="send-code-cd">{{ sendCodeCdStr }}</span>
            </i>
        </button>
    </label>
</template>

<style scoped>
    .email-code-input {
        display: flex;
    }

    .email-code-input > span {
        padding: 0 0.5rem;
        line-height: 2rem;
    }

    input {
        padding: 0.5rem;
        flex: 1;

        border: none;
        font-size: 1rem;
    }

    .email-code-input i {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
    }

    .send-email-code {
        padding: 0 0.5rem;
    }

    .email-code-input > .send-email-code {
        width: fit-content;
        min-width: 9%;
    }

    .send-code-cd {
        font-size: 0.8rem;
    }
</style>