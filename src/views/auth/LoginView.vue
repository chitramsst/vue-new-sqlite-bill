<template>
    <div class="flex flex-row w-full h-screen" @keydown.enter="login">
        <div class="w-3/12 h-full">
            <video class="w-full h-full object-cover shadow-lg" autoplay muted loop>
                <source src="../../assets/video/login.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="flex flex-col h-screen bg-gray-100 w-9/12 p-36 pt-64">
            <h2 class="text-2xl text-primary  font-bold mb-6">Sign In</h2>
            <div class=" text-sm mb-4">
                <input type="text"
                    class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-5 px-3 w-[564px] outline-0"
                    placeholder="Email" v-model="email" :class="{ 'border-red-500' : v$.email.$error || error }"/>

            </div>
            <div class=" text-sm mb-4">
                <input type="password"
                    class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-5 px-3 w-[564px] outline-0"
                    placeholder="Password" v-model="password" :class="{ 'border-red-500' : v$.password.$error || error }"/>

            </div>
            <div class=" text-md mb-4">
            <p @click="login"
              class=" text-white py-5 px-3 text-wrap font-bold bg-primary rounded-lg flex items-center justify-center gap-3 text-sm w-[564px] ">
              Login
            </p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import {useAuthStore} from '@/stores/authStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default{
    setup () {
        return { v$: useVuelidate() }
    },
    data()
    {
        return{
            authStore : useAuthStore(),
            email : '',
            password : '',
            error : false,
        }
    },
    created() {
        alert(JSON.stringify(this.authStore));
        if(this.authStore.isLoggedIn)
        {
            if(this.authStore.user?.user_type == 1)
            {
            this.$router.push({name : 'home'})
            }
        }
    },
    methods:{
        async login()
        {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return
            }
            window.ipcRenderer.invoke('database-function',{target:'login-user',data:{email : this.email,password:this.password}}).then((response) => {
                if(response.success == false)
                {
                    this.error = true;
                }
                else{
                    alert(JSON.stringify(response.user))
                    this.authStore.user = response.user;
                    this.$router.push({
                        name : 'home'
                    })
                }
            })
        }
    },
    validations () {
        return {
            email: { required},
            password: { required }, 
        }
    },
    watch : {
        email()
        {
            if(this.error)
            {
                this.error = false;
            }
        },
        password()
        {
            if(this.error)
            {
                this.error = false;
            }
        }
    }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>