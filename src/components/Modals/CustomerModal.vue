<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" v-if="isVisible">
      <div class="bg-white rounded-lg p-6 max-w-md">
        <div class="flex justify-between items-center min-w-[900px]">
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
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0" readonly
                        placeholder="Customer code" v-model="customer_code"
                        :class="{ 'border-red-500': v$.customer_code.$error || error }" />
                    </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
        <div class="mt-4">
          <div class=" text-sm">
            <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
              placeholder="First Name" v-model="first_name" :class="{ 'border-red-500': v$.first_name.$error }" />
          </div>
        </div>
        <div class="mt-4">
          <div class=" text-sm">
            <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
              placeholder="Last Name" v-model="last_name" />
          </div>
        </div>
        <div class="mt-4">
          <div class=" text-sm">
            <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
              placeholder="phone number" v-model="phone_number" :class="{ 'border-red-500': v$.phone_number.$error }" />
          </div>
        </div>
        <div class="mt-4">
          <div class=" text-sm">
            <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
              placeholder="email address" v-model="email_address"  />
          </div>
        </div>
        <div class="mt-4">
          <div class=" text-sm">
            <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
              placeholder="Tax Vat number" v-model="tax_vat_numer"  />
          </div>
        </div>
        <div class="mt-4">
          <div class=" text-sm">
            <textarea
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0 resize-none"
                        placeholder="Address" v-model="address"
                       ></textarea>
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
        first_name: '',
        customer_code: '',
        is_active: true,
        editingItem: '',
        item_id:'',
        last_name: '',
        phone_number: '',
        email_address: '',
        address:'',
        tax_vat_numer:'',
        error:''
      }
    },
    mounted() {
        this.getCustomerCreateInitialItems();
  },
    methods: {
        async getCustomerCreateInitialItems() {
            window.ipcRenderer.invoke('database-function', { target: 'get-customer-create-initial-items'}).then((response) => {
                if (response.success == false) {
                    this.error = true;
                }
                else {
                  this.customer_code = response.customer_code;
                }
            })
        },
      closeModal() {
        this.resetData()
        this.$emit('close');
      },
      editItem(item) {
        this.editingItem = item;
        this.fillData(item)
      },
      fillData(item) {
        this.customer_code = item.dataValues.customer_prefix+'_'+item.dataValues.customer_code;
        this.first_name = item.dataValues.first_name;
        this.last_name = item.dataValues.last_name;
        this.address = item.dataValues.address;
        this.email_address = item.dataValues.email_address;
        this.phone_number = item.dataValues.phone_number;
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
            target: 'edit-customer',
            data: {
              first_name: this.first_name,
              last_name: this.last_name,
              address: this.address,
              email_address: this.email_address,
              phone_number: this.phone_number,
              item_id: this.item_id,
              tax_vat_numer : this.tax_vat_numer,
              is_active: this.is_active?'1':'0',
            }
          }).then((response) => {
            this.$emit('save', {
              type: 'update',
              item: response.item
            })
            // this.$emitter.emit('notify',{
            //     title : this.$t('Success'),
            //     subtitle : this.$t('Expense Customer has been created'),
            //     type : 'success'
            // })
            this.$emit('close')
          })
        }
        if (this.isEdit == false) {
          window.ipcRenderer.invoke('database-function', {
            target: 'create-customer',
            data: {
              first_name: this.first_name,
              last_name: this.last_name,
              address: this.address,
              email_address: this.email_address,
              phone_number: this.phone_number,
              item_id: this.item_id,
              tax_vat_numer : this.tax_vat_numer,
              is_active: this.is_active?'1':'0',
            }
          }).then((response) => {
            this.resetData()
            this.$emit('save', {
              type: 'create',
              item: response.item
            })
            this.getCustomerCreateInitialItems();
            // this.$emitter.emit('notify',{
            //     title : this.$t('Success'),
            //     subtitle : this.$t('Expense Customer has been created'),
            //     type : 'success'
            // })
            this.$emit('close')
          })
        }
      },
      resetData() {
        this.first_name = '';
        this.last_name = '';
        this.address = '';
        this.email_address = '';
        this.phone_number = '';
        this.tax_vat_numer = '';
        this.is_active = true;
        this.v$.$reset()
      },
    },
    validations: {
      first_name: { required },
      phone_number: {required},
      customer_code: {required},
    },
  };
  </script>