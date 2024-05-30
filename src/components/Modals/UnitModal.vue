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
            placeholder="Name" v-model="name" :class="{ 'border-red-500': v$.name.$error }" />
        </div>
      </div>
      <div class="mt-4">
        <div class=" text-sm">
          <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
            placeholder="Full Name" v-model="full_name" :class="{ 'border-red-500': v$.full_name.$error }" />
        </div>
      </div>
      <div class="mt-4">
        <div class=" text-sm flex items-center justify-start w-full space-x-2">
          <input type="checkbox" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 outline-0"
            placeholder="Name" v-model="is_active" /> <p class="text-sm text-gray-500"> IsActive ? </p>
        </div>
      </div>
      <!-- <div class="border-b-[0.5px] border-border mt-3 "></div> -->
      <div class="mt-6 flex justify-end text-sm">
        <button @click="closeModal"
          class="px-4 py-2 border-[0.5px] border-border text-gray-700 rounded-lg mr-4">Close</button>
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
  data() {
    return {
      name: '',
      is_active: true,
      editingItem: '',
      item_id:'',
      full_name: ''
    }
  },
  methods: {
    closeModal() {
      this.resetData()
      this.$emit('close');
    },
    editItem(item) {
      this.editingItem = item;
      this.fillData(item)
    },
    fillData(item) {
      this.name = item.dataValues.name;
      this.full_name = item.dataValues.full_name;
      this.is_active = item.dataValues.is_active==1 ? true : false;
      this.item_id = item.dataValues.id;
    },
    async save() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      if (this.isEdit == true) {
        window.ipcRenderer.invoke('database-function', {
          target: 'edit-unit',
          data: {
            name: this.name,
            full_name: this.full_name,
            item_id: this.item_id,
            is_active: this.is_active?'1':'0',
          }
        }).then((response) => {
          this.$emit('save', {
            type: 'update',
            item: response.item
          })
          // this.$emitter.emit('notify',{
          //     title : this.$t('Success'),
          //     subtitle : this.$t('Expense Unit has been created'),
          //     type : 'success'
          // })
          this.$emit('close')
        })
      }
      if (this.isEdit == false) {
        window.ipcRenderer.invoke('database-function', {
          target: 'create-unit',
          data: {
            name: this.name,
            full_name: this.full_name,
            is_active: this.is_active?'1':'0',
          }
        }).then((response) => {
          this.resetData()
          this.$emit('save', {
            type: 'create',
            item: response.item
          })
          // this.$emitter.emit('notify',{
          //     title : this.$t('Success'),
          //     subtitle : this.$t('Expense Unit has been created'),
          //     type : 'success'
          // })
          this.$emit('close')
        })
      }
    },
    resetData() {
      this.name = '';
      this.full_name = '';
      this.is_active = true;
      this.v$.$reset()
    },
  },
  validations: {
    name: { required },
    full_name: { required },
  },
};
</script>