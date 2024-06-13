<template>
  <div class="w-full h-full">

    <!-- header section  -->
    <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
      <div class=" text-sm">
        <!-- <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[300%] outline-0"
          placeholder="Choose Customer" /> -->
        <select class="border-[0.5px] border-[#C1E1C1] rounded-lg ring-0 py-3 px-3 w-full outline-0"
          v-model="selected_customer" :class="{ 'border-red-500': v$.selected_customer.$error || error }">
          <option value=''>Choose Customer</option>
          <option :value="customer.dataValues.id" v-for="customer in customers" :key="'customer.dataValues.id'">
            {{ customer.dataValues.first_name }} {{ customer.dataValues.last_name }}      [{{ customer.dataValues.customer_prefix }}_{{ customer.dataValues.customer_code }}]</option>
        </select>
      </div>
      <div class="flex flex-row space-x-5">
        <div class="flex flex-row space-x-2">
          <p
            class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
            <i class="fas fa-plus"></i> Create Customer
          </p>
          <p
            class="text-gray-500 py-2 px-3 text-wrap  border-[0.5px] border-border  rounded-lg flex items-center justify-center gap-3 text-sm font-semibold">
            <i class="fas fa-envelope"></i>
          </p>
          <p
            class="text-gray-500 py-2 px-3 text-wrap  border-[0.5px] border-border  rounded-lg flex items-center justify-center gap-3 text-sm font-semibold">
            <i class="fas fa-bell"></i>
          </p>
        </div>
        <div class="border-l border-border h-7 mt-1 "></div>
        <div>
          <div class="flex items-center space-x-2 flex-row">
            <img src="https://via.placeholder.com/50" alt="Avatar"
              class="w-10 h-10 rounded-full border border-gray-300" />
            <div>
              <p class="font-bold text-xs">{{ authStore.user?authStore.user.name:'' }}</p>
              <p class="text-xs text-gray-400">{{ authStore.user.user_type == 1 ? 'admin' : 'member' }}</p>
            </div>
            <div
              class="relative inline-block text-left text-gray-500 text-wrap  items-center justify-center gap-3 text-sm font-semibold">
              <button @click="toggleMenu" class="flex items-center px-4 py-2 focus:outline-none">
                <i :class="`fas ${menuOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`"></i>
              </button>
              <div v-if="menuOpen"
                class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100" @click="logout">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--End of header section  -->

    <div class="h-[93%] flex flex-row w-full">
      <!-- body item section section  -->
      <div class="w-9/12 border-border  shadow-sm border-r-[0.5px] h-full ">
        <!-- category section  -->
        <div class="h-[7%]  shadow-sm  border-b-[0.5px] flex items-center p-7 space-x-12">
          <p @click="this.selected_category = ''"
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md"
            :class="this.selected_category == '' ? 'shadow-md border py-2 px-3 rounded-lg bg-slate-200' : 'shadow-md border py-2 px-3 rounded-lg bg-white'">
            <i class="fas fa-icicles" aria-hidden="true"></i> All Categories
          </p>
          <div v-for="category in categories" :key="category.dataValues.id"
            :class="this.selected_category == category.dataValues.id ? 'shadow-md border py-2 px-3 rounded-lg bg-slate-200' : 'shadow-md border py-2 px-3 rounded-lg bg-white-200'">
            <p @click="this.selected_category = category.dataValues.id"
              class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md">
              <i class="fas fa-leaf"></i> {{ category.dataValues.name }}
            </p>
          </div>
          <!-- <p
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md">
            <i class="fas fa-leaf"></i> Artificial Plants
          </p>
          <p
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm  hover:text-gray-800 hover:text-md">
            <i class="fas fa-seedling"></i> Artificial Flowers
          </p>
          <p
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md">
            <i class="fas fa-cannabis"></i> Plant Pots
          </p>
          <p
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md">
            <i class="fas fa-mountain"></i> Vases & Bowels
          </p>
          <p
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md">
            <i class="fas fa-clover"></i> Wall Accessories
          </p> -->
        </div>
        <!-- item section -->
        <div class="h-[93%] p-7 w-full grid grid-cols-4 gap-8 ">
          <div v-for="item in itemResults" :key="item.dataValues.id"
            class="flex flex-col space-y-1 border-[0.5px] border-border rounded-lg px-3 py-3 max-h-[350px]"
            @click="chooseProduct(item)">
            <div class="h-6/12">
              <img
                src="https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123"
                class="min-h-[180px] max-h-[280px] w-[300px] rounded-lg resize shadow-xl" />
            </div>
            <div class="pt-2 h-2/12">
              <p class=" text-sm"> {{ item.dataValues.name }}</p>
              <p class="text-xs text-gray-400"> {{ item.dataValues.description ? item.dataValues.description : '-' }}
              </p>
            </div>
            <div class="flex justify-between items-center h-1/12">
              <p class="font-bold text-xs text-primary"> ${{ item.dataValues.selling_price }} </p>
              <p class="text-xs text-gray-400 border border-border/20 bg-border/20 px-3 py-1 rounded-full">
                {{ item.dataValues.quantity }} items</p>
            </div>
            <div class="pt-2 h-2/12">
              <p class="  py-2 px-3 text-wrap border border-border rounded-lg flex items-center justify-center text-xs">
                <i class="fas fa-plus pr-2"></i> Add To Cart
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End of body item section section  -->
      <!-- body calculation section section  -->
      <div class="w-3/12 p-5 h-full">
        <div class="h-[65%] w-full pb-5">
          <p class="font-bold pb-5"> Detail Items </p>
          <div class="h-[90%] overflow-y-auto">
            <div class="pt-3 flex flex-row space-x-2 pb-3" v-for="cart_item in cartItems" :key="cart_item.id">
              <img
                src="https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2022/07/essential-props-fstoppers-helenarosephotography-080-edit1.jpg"
                class="max-h-[100px] w-[100px] rounded-lg resize shadow-xl" />
              <div class="flex flex-col space-y-2 w-2/4">
                <p class=" text-sm"> {{ cart_item.name }}</p>
                <p class="text-xs text-gray-400"> {{ cart_item.description ? cart_item.description : '-' }}</p>
                <p class="font-bold text-xs text-primary"> ${{ cart_item.selling_price }} </p>
              </div>
              <div class="flex flex-row space-x-1 justify-center items-center w-1/4">
                <p class=" text-gray-500 text-wrap border-[0.5px]  border-border  rounded-lg flex items-center justify-center gap-3 text-md  h-7 w-7"
                  @click="decrement(cart_item.id)">
                  <i class="fas fa-minus"></i>
                </p>
                <p class=" text-gray-500 text-wrap  flex items-center justify-center text-sm h-7 w-7">
                  {{ cart_item.quantity }}
                </p>
                <p class=" text-white text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-md m-3 h-7 w-7"
                  @click="increment(cart_item.id)">
                  <i class="fas fa-plus"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[30%] rounded-lg bg-border/30 w-full flex flex-col space-y-2 p-5">
          <p class="font-bold"> Detail Payment </p>
          <div class="flex justify-between items-center text-sm px-3">
            <p class="text-gray-500">SubTotal</p>
            <p class="text-gray-800"> <span class="text-primary">$ </span><input type="text"
                class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3  outline-0 w-[80px]"
                :value="cartData.sub_total" readonly /></p>
          </div>
          <div class="flex justify-between items-center text-sm px-3">
            <p class="text-gray-500">Tax 10%</p>
            <p class="text-gray-800 w-[70px]"> <span class="text-primary">$</span> {{ cartData.tax_total }}</p>
            <p class="text-gray-800"> <span class="text-primary">$ </span><input type="text"
                class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3  outline-0 w-[80px]"
                placeholder="Enter Discount Amount" :value="cartData.tax_total" readonly /></p>
          </div>
          <div class="flex justify-between items-center text-sm px-3 w-full">
            <p class="text-gray-500">Discount</p>
            <p class="text-gray-800"> <span class="text-primary">$ </span><input type="text" v-model="discount"
                class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3  outline-0 w-[80px]" /></p>
          </div>
          <div class="border-border border-dashed  border-b-[1px]"></div>
          <div class="flex justify-between items-center text-sm px-3 pb-3">
            <p class="text-gray-500">Total Payment</p>
            <p class="text-gray-800"> <span class="text-primary">$ </span><input type="text"
                class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3  outline-0 w-[80px]"
                placeholder="Enter Discount Amount" :value="cartData.net_total" readonly /></p>
          </div>
        </div>
        <div class="h-[5%] rounded-lg w-full pt-1">
          <p @click="saveBill()"
            class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
            Place an Order
          </p>
        </div>
      </div>
      <!-- End of body calculation section section  -->
    </div>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/authStore';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import PrintPOSView from './PrintPOSView.vue';
import { mount } from 'mount-vue-component';

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      menuOpen: false,
      count: new Array(10).fill(1),
      authStore: useAuthStore(),
      categories: [],
      customers: [],
      units: [],
      brands: [],
      order_code: "",
      note: "",
      selected_category: "",
      products: "",
      cartItems: [],
      cartData: {
        total_quantity: 0,
        sub_total: 0,
        tax_total: 0,
        net_total: 0,
        discount_total: 0,
        tax_percentage: 0
      },
      discount_type: 1,
      discount: 0,
      selected_customer: '',
      error: false,
    };
  },
  mounted() {
    this.getProductCreateInitialItems();
  },
  methods: {
    chooseProduct(product) {
      const existingItem = this.cartItems.find(item => item.id === product.dataValues.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product.dataValues, quantity: 1 });
      }
      this.storeToLocalStorage();
      this.calculateDetail();
    },
    findItem(item) {
      let index = this.cartItems.findIndex((x) => x.dataValues.id == item.dataValues.id && x.type == 'PRODUCT')
      if (index != -1) {
        return this.cartItems[index]
      }
      return false;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    increment(id) {
      let index = this.cartItems.findIndex((x) => x.id == id)
      if (index != -1) {
        this.cartItems[index].quantity = this.cartItems[index].quantity + 1
      }
      this.storeToLocalStorage();
      this.calculateDetail();
    },
    decrement(id) {
      let index = this.cartItems.findIndex((x) => x.id == id)
      if (index != -1) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity = this.cartItems[index].quantity - 1
        } else {
          this.cartItems.splice(index, 1);
        }
      }
      this.storeToLocalStorage();
      this.calculateDetail();
    },
    storeToLocalStorage() {
      const cartItemsJSON = JSON.stringify(this.cartItems);
      localStorage.setItem('cartItems', cartItemsJSON);
    },
    calculateDetail() {
      let tax_total = 0;
      let sub_total = 0;
      let net_total = 0;
      let quantity = 0;

      this.cartItems.forEach((x) => {
        let itemTax = (x.price * x.quantity) * (this.cartData.tax_percentage / 100)
        let temp_selling_price = parseFloat(x.selling_price) * parseFloat(x.quantity)
        let temp_tax = temp_selling_price * (x.tax_rate / 100)

        x.tax = itemTax
        x.total = temp_selling_price + temp_tax

        tax_total += temp_tax
        sub_total += temp_selling_price
        net_total += net_total
        quantity += parseFloat(x.quantity)
      })
      let discount = 0;
      if (this.discount_type == 1) {
        discount = this.discount
      }
      else {
        discount = net_total * (this.discount / 100)
      }
      this.cartData.discount_total = discount
      this.cartData.sub_total = sub_total
      this.cartData.tax_total = tax_total
      this.cartData.net_total = sub_total + tax_total - discount;
      this.cartData.total_quantity = quantity;
    },
    logout() {
      this.authStore.$reset()
      this.$router.push({ name: 'login' })
    },
    printBill() {
      let settings = {}
      let data = this.$el.outerHTML;
      // if(this.settingStore.print_settings && this.settingStore.print_settings.print_template == 3)
      // {
      //     console.log('thermal print')
      //     settings = {
      //         margins:{
      //             marginType : 'none',
      //         },
      //     }
      //     window.ipcRenderer.invoke("print-window", { data: data,settings : settings,type : 'thermal'}).then((response) => {
      //     });
      //     return
      // }
      // window.ipcRenderer.invoke("print-window", { data: data, settings: settings }).then((response) => {
      // });

      // alert(JSON.stringify(this.cartData))

      let { vNode, destroy, el } = mount(PrintPOSView, { props: { cartItems: this.cartItems, cartData: this.cartData, authStore : this.authStore, moment : this.$moment } })
            window.ipcRenderer.once('print-complete', () => {
                console.log('print complete!');
                destroy()
            })

    },
    async getProductCreateInitialItems() {
      window.ipcRenderer.invoke('database-function', { target: 'get-pos-create-initial-items' }).then((response) => {
        if (response.success == false) {
          this.error = true;
        }
        else {
          this.categories = response.categories;
          this.brands = response.brands;
          this.units = response.units;
          this.customers = response.customers;
          //  alert(JSON.stringify(this.customers))
          this.order_code = response.order_code;
          this.products = response.products;
        }
      })
    },
    async saveBill() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return
            }
            const cleanedCartItems = this.removeNonSerializable(this.cartItems);
            const cleanedCartData = this.removeNonSerializable(this.cartData);
            const customer = this.customers.find(item => item.dataValues.id === this.selected_customer);
            const cleanedCustomer = this.removeNonSerializable(customer.dataValues);
            const cleanedAuthStore = this.removeNonSerializable(this.authStore);
            window.ipcRenderer.invoke('database-function', { target: 'create-pos', data: {   
            cartData : cleanedCartData,
            cartItems : cleanedCartItems,
            customer:cleanedCustomer,
            authStore : cleanedAuthStore
            } }).then((response) => {
                if (response.success == false) {
                    this.error = true;
                }
                else {
                  this.getProductCreateInitialItems()
                  this.printBill()
                    this.$router.push({
                        name: 'order'
                    })
                }
            })
        },
    removeNonSerializable(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function' || value instanceof Node) {
            return undefined;
        }
        return value;
    }));
}
  },
  computed: {
    itemResults() {
      if (typeof this.selected_category === 'number' && !isNaN(this.selected_category)) {
        return this.products.filter((x) => x.dataValues.category === this.selected_category);
      } else {
        return this.products;
      }
    }
  },
  watch: {
    selected_customer() {
      if (this.error) {
        this.error = false;
      }
    }
  },
  validations() {
    return {
      selected_customer: { required },
    }
  },
  components() {
    PrintPOSView
  }
};
</script>