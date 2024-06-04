<template>
    <div class="flex flex-col space-y-5 w-full">
        <!-- header section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
            <div class=" text-sm">

            </div>
            <div class="flex flex-row space-x-5">
                <div class="flex flex-row space-x-2">
                    <router-link to="/product">
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
            <h1 class="text-gray-800 text-xl text-center font-bold mt-2"> Create Product</h1>
            <div class="grid grid-cols-4 gap-11  text-gray-300 mt-5">
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Name <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="name" v-model="name" :class="{ 'border-red-500': v$.name.$error || error }" />
                </div>
               
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Cost Price <span class="text-red-700">*</span></h6>
                    <input type="number"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="cost price" v-model="cost_price" :class="{ 'border-red-500': v$.cost_price.$error || error }" />
                </div>

                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Selling Price <span class="text-red-700">*</span></h6>
                    <input type="number"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="selling price" v-model="selling_price" :class="{ 'border-red-500': v$.selling_price.$error || error }" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Expiration Date <span class="text-red-700">*</span></h6>
                    <input type="date"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Expiration Date" v-model="expiry_date" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Category <span class="text-red-700">*</span></h6>
                    <select 
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="price" v-model="category" :class="{ 'border-red-500': v$.category.$error || error }" >
                        <option value=null>Choose Category</option>
                        <option :value="category.dataValues.id" v-for="category in categories" :key="'category.dataValues.id'">{{category.dataValues.name}}</option>
                        </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Brand <span class="text-red-700">*</span></h6>
                    <select 
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        v-model="brand" :class="{ 'border-red-500': v$.brand.$error || error }" >
                        <option value=null>Choose Brand</option>
                        <option :value="brand.dataValues.id" v-for="brand in brands" :key="'category.dataValues.id'">{{brand.dataValues.name}}</option>
                        </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Supplier <span class="text-red-700">*</span></h6>
                    <select 
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                         v-model="supplier" :class="{ 'border-red-500': v$.supplier.$error || error }" >
                        <option value=null>Choose Supplier</option>
                        <option :value="supplier.dataValues.id" v-for="supplier in suppliers" :key="'supplier.dataValues.id'">{{supplier.dataValues.contact_person}} [{{supplier.dataValues.supplier_id}}]</option>
                        </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Tax Rate <span class="text-red-700">*</span></h6>
                    <input type="number"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="tax rate" v-model="tax_rate" :class="{ 'border-red-500': v$.tax_rate.$error || error }" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Quantity <span class="text-red-700">*</span></h6>
                    <input type="number"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="quantity" v-model="quantity" :class="{ 'border-red-500': v$.quantity.$error || error }" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Reorder Level </h6>
                    <input type="number"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Reorder Level" v-model="reOrderLevel" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Unit of Measurement <span class="text-red-700">*</span></h6>
                    <select 
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                         v-model="unit" :class="{ 'border-red-500': v$.unit.$error || error }" >
                        <option value=null>Choose Unit</option>
                        <option :value="unit.dataValues.id" v-for="unit in units" :key="'unit.dataValues.id'">{{unit.dataValues.name}} [{{unit.dataValues.full_name}}]</option>
                        </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Product Code / SKU <span class="text-red-700">*</span></h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0" readonly
                        placeholder="Product Code" v-model="product_code" :class="{ 'border-red-500': v$.product_code.$error || error }" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> HSN code </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Harmonized System code" v-model="hsCode" />
                </div>       
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Warehouse Location </h6>
                    <input type="text"
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                        placeholder="Warehouse Location" v-model="warehouseLocation" />
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Staus <span class="text-red-700">*</span></h6>
                    <select 
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
                         v-model="is_active">
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                        </select>
                </div>
                <div class=" text-sm mb-1 text-gray-600">
                    <h6 class="mb-3"> Description </h6>
                    <textarea
                        class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0 resize-none"
                        placeholder="Description" v-model="description" rows="5"/>
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
            name: null,
            selling_price: null,
            cost_price: null,
            error: false,
            category: null,
            brand: null,
            supplier: null,
            tax_rate: 0,
            quantity: null,
            reOrderLevel:null,
            unit:null,
            product_code: null,
            hsCode: null,
            warehouseLocation: null,
            description:null,
            expiry_date: moment().format('YYYY-MM-DD'),
            is_active: 1,
            categories: [],
            suppliers: [],
            units: [],
            brands: []
        }
    },
    mounted() {
        this.getProductCreateInitialItems();
       // this.expiry_date = moment().format('YYYY-MM-DD').toDate();
  },
    methods: {
        async getProductCreateInitialItems() {
            window.ipcRenderer.invoke('database-function', { target: 'get-product-create-initial-items'}).then((response) => {
                if (response.success == false) {
                    this.error = true;
                }
                else {
                  this.categories = response.categories;
                  this.brands = response.brands;
                  this.units = response.units;
                  this.suppliers = response.suppliers;
                  this.product_code = response.product_code;
                }
            })
        },
        async create() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return
            }
            window.ipcRenderer.invoke('database-function', { target: 'create-product', data: {   
            name: this.name,
            selling_price: this.selling_price,
            cost_price: this.cost_price,
            category: this.category,
            brand: this.brand,
            supplier: this.supplier,
            tax_rate: this.tax_rate,
            quantity: this.quantity,
            reOrderLevel:this.reOrderLevel,
            unit:this.unit,
            product_code: this.product_code,
            hsCode: this.hsCode,
            warehouseLocation: this.warehouseLocation,
            description:this.description,
            expiry_date: this.expiry_date,
            is_active: this.is_active, 
            } }).then((response) => {
                if (response.success == false) {
                    this.error = true;
                }
                else {
                    this.$router.push({
                        name: 'product'
                    })
                }
            })
        }
    },
    validations() {
        return {
            name: { required },
            selling_price: { required },
            cost_price: {required},
            category: {required},
            brand: {required},
            supplier: {required},
            quantity: {required},
            tax_rate: {required},
            unit: {required},
            product_code: {required}
        }
    },
    watch: {
        name() {
            if (this.error) {
                this.error = false;
            }
        },
        cost_price() {
            if (this.error) {
                this.error = false;
            }
        },
        selling_price() {
            if (this.error) {
                this.error = false;
            }
        },
        category() {
            if (this.error) {
                this.error = false;
            }
        },
        brand() {
            if (this.error) {
                this.error = false;
            }
        },
        supplier() {
            if (this.error) {
                this.error = false;
            }
        },
        tax_rate() {
            if (this.error) {
                this.error = false;
            }
        },
        quantity() {
            if (this.error) {
                this.error = false;
            }
        },
       
        product_code() {
            if (this.error) {
                this.error = false;
            }
        },
        unit() {
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
