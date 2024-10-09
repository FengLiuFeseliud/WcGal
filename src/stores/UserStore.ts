import type { User } from "@/request/UserRequest";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("userStore", () => {
    const userId = ref<number>(0)
    const userName = ref<string>()
    const head = ref<string>()
    const admin = ref<boolean>()
    const token = ref<string>()
    const email = ref<string>()

    function setUser(user: User){
        userId.value = user.userId
        userName.value = user.userName
        head.value = user.head
        admin.value = user.admin
        token.value = user.token
        email.value = user.email
    }

    return {
        userId,
        userName,
        head,
        admin,
        token,
        email,
        setUser
    }
})


export { useUserStore }