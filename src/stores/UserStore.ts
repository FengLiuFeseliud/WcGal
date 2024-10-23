import type { User } from "@/request/UserRequest";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("userStore", () => {
    const userId = ref<number>(0)
    const userName = ref<string>()
    const head = ref<string>()
    const admin = ref<boolean>()
    const token = ref<string>(localStorage.getItem("token")+"")
    const email = ref<string>()

    function setUser(user: User){
        userId.value = user.userId
        userName.value = user.userName
        head.value = user.head
        admin.value = user.admin
        if(user.token !== null){
            token.value = user.token
            localStorage.setItem("token", user.token)
        }
        email.value = user.email
    }

    function loginOut(){
        userId.value = 0
        userName.value = ""
        head.value = ""
        admin.value = false
        email.value = ""
        token.value = ""
        localStorage.removeItem("token")
    }

    function isLogin(){
        return userId.value
    }

    function notLogin(){
        return !userId.value
    }

    function isMyOrAdmin(uesrId: number){
        return (isLogin() && userId.value === uesrId) || admin.value
    }

    return {
        userId,
        userName,
        head,
        admin,
        token,
        email,
        setUser,
        loginOut,
        isLogin,
        notLogin,
        isMyOrAdmin
    }
})


export { useUserStore }