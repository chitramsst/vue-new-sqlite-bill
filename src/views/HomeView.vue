<template>
  <div class="w-full h-full">

    <!-- header section  -->
    <div class="h-[7%]  shadow-sm  border-b-[0.5px] border-border flex flex-row justify-between p-5 items-center">
      <div class=" text-sm">
        <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[300%] outline-0"
          placeholder="Choose the product to add cart" />
      </div>
      <div class="flex flex-row space-x-5">
        <div class="flex flex-row space-x-2">
          <p
            class=" text-white py-2 px-3 text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-sm">
            <i class="fas fa-plus"></i> Create a Note
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
              <p class="font-bold text-xs">{{ authStore.user.name }}</p>
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
            class=" text-gray-500 text-wrap   rounded-lg flex items-center justify-center gap-2 text-sm hover:text-gray-800 hover:text-md">
            <i class="fas fa-icicles" aria-hidden="true"></i> All Categories
          </p>
          <div v-for="category in categories" :key="category.dataValues.id">
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
            class="flex flex-col space-y-1 border-[0.5px] border-border rounded-lg px-3 py-3 max-h-[350px]">
            <div class="h-6/12">
              <img
                src="https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123"
                class="min-h-[180px] max-h-[280px] w-[300px] rounded-lg resize shadow-xl" />
            </div>
            <div class="pt-2 h-2/12">
              <p class=" text-sm"> {{ item.dataValues.name }}</p>
              <p class="text-xs text-gray-400"> {{ item.dataValues.description ? item.dataValues.description : '-' }}</p>
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
            <div class="pt-3 flex flex-row space-x-2 pb-3" v-for="n in 2" :key="n">
              <img
                src="https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2022/07/essential-props-fstoppers-helenarosephotography-080-edit1.jpg"
                class="max-h-[100px] w-[100px] rounded-lg resize shadow-xl" />
              <div class="flex flex-col space-y-2 w-2/4">
                <p class=" text-sm"> Whity Giant Plants</p>
                <p class="text-xs text-gray-400"> Artificial potted, indoor/outdoor Whitley Giant, 9cm</p>
                <p class="font-bold text-xs text-primary"> $50 </p>
              </div>
              <div class="flex flex-row space-x-1 justify-center items-center w-1/4">
                <p class=" text-gray-500 text-wrap border-[0.5px]  border-border  rounded-lg flex items-center justify-center gap-3 text-md  h-7 w-7"
                  @click="decrement(n)">
                  <i class="fas fa-minus"></i>
                </p>
                <p class=" text-gray-500 text-wrap  flex items-center justify-center text-sm h-7 w-7">
                  {{ this.count[n] }}
                </p>
                <p class=" text-white text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-md m-3 h-7 w-7"
                  @click="increment(n)">
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
            <p class="text-gray-800"> <span class="text-primary">$</span>500 </p>
          </div>
          <div class="flex justify-between items-center text-sm px-3">
            <p class="text-gray-500">Tax 10%</p>
            <p class="text-gray-800"> <span class="text-primary">$</span>50 </p>
          </div>
          <div class="flex justify-between items-center text-sm px-3">
            <p class="text-gray-500">Discount</p>
            <p class="text-gray-800"> <span class="text-primary">$</span>50 </p>
          </div>
          <div class="border-border border-dashed  border-b-[1px] py-3 "></div>
          <div class="flex justify-between items-center text-sm px-3 pt-3">
            <p class="text-gray-500">Total Payment</p>
            <p class="text-gray-800"> <span class="text-primary">$</span>600 </p>
          </div>
        </div>
        <div class="h-[5%] rounded-lg w-full pt-3">
          <p
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
export default {
  data() {
    return {
      menuOpen: false,
      count: new Array(10).fill(1),
      authStore: useAuthStore(),
      categories: [],
      suppliers: [],
      units: [],
      brands: [],
      order_code: "",
      selected_category: "",
      products: ""
    };
  },
  mounted() {
    this.getProductCreateInitialItems();
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    increment(n) {
      this.count[n] = this.count[n] + 1
    },
    decrement(n) {
      if (this.count[n] == 1) {
        this.count[n] = 1;
        return;
      }
      if (this.count[n] > 1) {
        this.count[n] = this.count[n] - 1;
      }

    },
    logout() {
      this.authStore.$reset()
      this.$router.push({ name: 'login' })
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
          this.suppliers = response.suppliers;
          this.order_code = response.order_code;
          this.products = response.products;
        }
      })
    },
    async create() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return
      }
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
  }
};
</script>