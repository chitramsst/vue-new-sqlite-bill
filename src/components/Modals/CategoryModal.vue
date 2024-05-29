<template>
   <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md">
      <div class="flex justify-between items-center min-w-[300px]">
        <h3 class="text-lg text-gray-700 font-semibold">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="border-b-[0.5px] border-border mt-3 "></div>
      <div class="mt-4">
        <div class=" text-sm">
        <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
          placeholder="Name" v-model="name"  :class="{ 'border-red-500' : v$.name.$error }" />
      </div>
      </div>
      <!-- <div class="border-b-[0.5px] border-border mt-3 "></div> -->
      <div class="mt-6 flex justify-end text-sm">
        <button @click="closeModal" class="px-4 py-2 border-[0.5px] border-border text-gray-700 rounded-lg mr-4">Close</button>
        <button class="px-4 py-2 bg-primary text-white rounded-lg" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
  },
  setup() {
        return { v$: useVuelidate() };
    },
    data()
    {
        return{
            name : '',
            is_active : 1,
        }
    },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async save()
        {
            const isFormCorrect = await this.v$.$validate();
            if (!isFormCorrect) {
                return;
            }
            window.ipcRenderer.invoke('database-function',{
                target : 'create-category',
                data : {
                    name : this.name,
                    is_active : this.is_active,
                }
            }).then((response) => {
                this.$emit('save',{
                    type : 'create',
                    item : response.item
                })
                // this.$emitter.emit('notify',{
                //     title : this.$t('Success'),
                //     subtitle : this.$t('Expense Category has been created'),
                //     type : 'success'
                // })
                this.$emit('close')
            })
        },
    resetData()
        {
            this.name = '';
            this.is_active = 1;
            this.v$.$reset()
        },
  },
  validations: {
        name: { required },
    },
};
</script>