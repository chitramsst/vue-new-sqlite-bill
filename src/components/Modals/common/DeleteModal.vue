
<template>
<div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" v-if="shown">
    <div class="bg-white rounded-lg p-6 max-w-md">
      <div class="flex justify-between items-center min-w-[300px]">
        <h3 class="text-lg text-gray-700 font-semibold">{{title}}</h3>
        <button @click="callback('EXIT')" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="border-b-[0.5px] border-border mt-3 "></div>
        <div class="w-full pt-2 flex-col">
                    <div class="mt-3  text-gray-500 leading-tight">{{message}}</div>
                </div>
      <div class="mt-6 flex justify-end text-sm">
        <button 
          class="px-4 py-2 border-[0.5px] border-border text-gray-700 rounded-lg mr-4" @click="callback('EXIT')">Cancel</button>
        <button class="px-4 py-2 bg-red-800 text-white rounded-lg" @click="callback('CONFIRM')">{{btnText}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface Data {
    title : string,
    message : string,
    btnText: string,
}
//@ts-ignore
export default {
    mounted()
    {
        this.$emitter.on('show-delete-modal',this.showDeleteModal)
    },
    unmounted()
    {
        this.$emitter.off('show-delete-modal',this.showDeleteModal)
    },
    data()
    {
        return{
            shown : false,
            title : '',
            message : '',
            callback : null,
            btnText:''
        }
    },
    methods:{
        handleModalShow()
        {

        },
        showDeleteModal(data : Data)
        {
            this.shown = true;
            this.message = data.message
            this.title = data.title
            this.btnText = data.btnText
            this.callback = (e) => {
                data.callback(e)
                this.shown = false;
            }
        },
        closeModal()
        {
            this.$emit('close')
        }
    },
}
</script>