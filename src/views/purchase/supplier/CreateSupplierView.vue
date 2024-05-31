<template>
    <div class="flex flex-col space-y-5 w-full">
        <!-- header section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
            <div class=" text-sm">

            </div>
            <div class="flex flex-row space-x-5">
                <div class="flex flex-row space-x-2">
                    <router-link to="/supplier">
                        <p
                            class="text-gray-800 py-2 px-3 text-wrap  border-[0.5px] border-border  rounded-lg flex items-center justify-center gap-3 text-sm font-semibold">
                            <i class="fas fa-backward"></i>
                        </p>
                    </router-link>
                </div>
            </div>
        </div>
        <!--End of header section  -->
        <div class="h-[90%] w-full px-10">
            <h1 class="text-gray-800 text-xl font-bold mt-2"> Create Supplier</h1>
            <div class="grid grid-cols-4 gap-10  text-gray-300 mt-5">
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Supplier Id <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Supplier code" v-model="supplier_code"
                        :class="{ 'border-red-500': v$.supplier_code.$error || error }" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Company Name <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Company name" v-model="company_name"
                        :class="{ 'border-red-500': v$.company_name.$error || error }" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Supplier Type <span class="text-red-700">*</span></h6>
                    <select class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        v-model="supplier_type">
                        <option value=null>Choose Supplier Type</option>
                        <option value="1">Manufacturer</option>
                        <option value="2">Distributer</option>
                        <option value="3">Service Provider</option>
                    </select>
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Supplier Category <span class="text-red-700">*</span></h6>
                    <select class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        v-model="supplier_category">
                        <option value=null>Choose Supplier Category</option>
                        <option value="1">Raw Materials</option>
                        <option value="2">Finished Goods</option>
                        <option value="3">Services</option>
                    </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Tax VAT number <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Tax VAT number" v-model="tax_vat_number"
                        :class="{ 'border-red-500': v$.tax_vat_number.$error || error }" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Staus </h6>
                    <select class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        v-model="is_active">
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                    </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Opening Balance <span class="text-red-700">*</span></h6>
                    <input type="number"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="opening balance" v-model="opening_balance"
                        :class="{ 'border-red-500': v$.opening_balance.$error || error }" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Notes </h6>
                    <textarea
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0 resize-none"
                        placeholder="Notes" v-model="notes"></textarea>
                </div>

            </div>
            <h1 class="text-gray-800 text-xl font-bold mt-2"> Contact Information</h1>
            <div class="grid grid-cols-3 gap-10  text-gray-300 mt-5">
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Contact Person <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Contact Person" v-model="contact_person"
                        :class="{ 'border-red-500': v$.contact_person.$error || error }" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Phone Number <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Phone Number" v-model="phone_number"
                        :class="{ 'border-red-500': v$.phone_number.$error || error }" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Email Address </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Email Address" v-model="email_address" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Website </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Website" v-model="website" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Address <span class="text-red-700">*</span></h6>
                    <textarea
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0 resize-none"
                        placeholder="Address" v-model="address"
                        :class="{ 'border-red-500': v$.address.$error || error }"></textarea>
                </div>
            </div>
            <h1 class="text-gray-800 text-xl font-bold mt-2"> Financial Information</h1>
            <div class="grid grid-cols-4 gap-10  text-gray-300 mt-5">

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Bank Name </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Bank Name" v-model="bank_name" />
                </div>


                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Bank Branch </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Bank Branch" v-model="bank_branch" />
                </div>


                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Account Number </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Account Number" v-model="bank_account_number" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Bank Code </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Bank Code" v-model="bank_code" />
                </div>
            </div>
            <div class=" text-md my-4 flex justify-end">
                <p @click="create"
                    class=" text-white py-3 text-wrap font-bold bg-primary rounded-lg flex items-center justify-center gap-3 text-sm px-5">
                    Save
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import moment from 'moment';

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            authStore: useAuthStore(),
            supplier_code: null,
            company_name: null,
            supplier_type: null,
            error: false,
            supplier_category: null,
            contact_person: null,
            phone_number: null,
            email_address: null,
            website: null,
            address: null,
            tax_vat_number: null,
            notes: null,
            bank_name: null,
            bank_branch: null,
            is_active: 1,
            bank_account_number: null,
            bank_code: null,
            opening_balance: 0
        }
    },
    mounted() {

    },
    methods: {
        async create() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return
            }
            window.ipcRenderer.invoke('database-function', { target: 'create-supplier', data: { supplier_code: this.supplier_code,
            company_name: this.company_name,
            supplier_type: this.supplier_type,
            supplier_category: this.supplier_category,
            contact_person: this.contact_person,
            phone_number: this.phone_number,
            email_address: this.email_address,
            website: this.website,
            address: this.address,
            tax_vat_number: this.tax_vat_number,
            notes: this.notes,
            bank_name: this.bank_name,
            bank_branch: this.bank_branch,
            is_active: this.is_active,
            bank_account_number: this.bank_account_number,
            bank_code: this.bank_code,
            opening_balance: this.opening_balance } }).then((response) => {
                if (response.success == false) {
                    this.error = true;
                }
                else {
                    this.$router.push({
                        name: 'supplier'
                    })
                }
            })
        }
    },
    validations() {
        return {
            supplier_code: { required },
            company_name: { required },
            supplier_type: { required },
            supplier_category: { required },
            opening_balance: { required },
            phone_number: { required },
            address: { required },
            tax_vat_number: { required },
            contact_person: { required }
        }
    },
    watch: {
        supplier_code() {
            if (this.error) {
                this.error = false;
            }
        },
        company_name() {
            if (this.error) {
                this.error = false;
            }
        },
        supplier_type() {
            if (this.error) {
                this.error = false;
            }
        },
        supplier_category() {
            if (this.error) {
                this.error = false;
            }
        },
        opening_balance() {
            if (this.error) {
                this.error = false;
            }
        },
        phone_number() {
            if (this.error) {
                this.error = false;
            }
        },
        address() {
            if (this.error) {
                this.error = false;
            }
        },
        tax_vat_number() {
            if (this.error) {
                this.error = false;
            }
        },
        contact_person() {
            if (this.error) {
                this.error = false;
            }
        }
    }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
