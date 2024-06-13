<template>
  <!-- sidebar -->
  <div class="w-[100px] bg-sidebar flex justify-start flex-col items-center space-y-6">
    <router-link to="/home">
      <p
        class=" text-white text-wrap  bg-primary/30 rounded-lg flex items-center justify-center gap-3 text-3xl m-3 h-10 w-10 ">
        <i class="fa-brands fa-canadian-maple-leaf"></i>
      </p>
    </router-link>
    <ul class="mt-5 flex flex-col space-y-5">

      <li x-data="{ open: false }" x-on:mouseenter="open = true" x-on:mouseleave="open = false">
        <div x-show="open" x-transition
          class="absolute left-[93px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1">
            <ul>
              <router-link to="/category">
                <li class="text-white text-md hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-2 py-1 rounded">
                  Category</li>
              </router-link>
              <router-link to="/brand">
                <li class="text-white text-md hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-2 py-1 rounded">
                  Brand</li>
              </router-link>
              <router-link to="/product">
                <li class="text-white text-md hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-2 py-1 rounded">
                  Product</li>
              </router-link>
            </ul>
          </div>
        </div>
        <p class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10  bg-primary/30"
          x-on:click="open = ! open" x-on:click.outside="open = false" x-on:mouseenter="open = true">
          <i class="fa-solid fa-layer-group"></i>
        </p>
      </li>
      <li x-data="{ open: false }">
        <p class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10  bg-primary/30"
          x-on:click="open = ! open" x-on:click.outside="open = false">
          <router-link to="/order">
            <i class="fa-regular fa-image"></i>
          </router-link>
        </p>
      </li>

      <li>
        <p
          class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10 bg-primary/30">
          <i class="fa-solid fa-arrows-to-dot"></i>
        </p>
      </li>
      <li x-data="{ open: false }" x-on:mouseenter="open = true" x-on:mouseleave="open = false">
        <div x-show="open" x-transition
          class="absolute left-[93px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1 ">
            <ul>
              <router-link to="/supplier">
                <li class="text-white text-md hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-2 py-1 rounded">
                  Supplier</li>
              </router-link>
            </ul>
          </div>
        </div>
        <p class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10  hover:bg-gray-20 bg-primary/30"
          x-on:click="open = ! open" x-on:click.outside="open = false" x-on:mouseenter="open = true"
          x-on:mouseleave="open = false">
          <i class="fa fa-shopping-cart"></i>
        </p>
      </li>
      <li x-data="{ open: false }" x-on:mouseenter="open = true" x-on:mouseleave="open = false">
        <div x-show="open" x-transition
          class="absolute left-[93px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1">
            <ul>
              <router-link to="/customer">
                <li class="text-white text-md hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-2 py-1 rounded">
                  Customer</li>
              </router-link>
            </ul>
          </div>
        </div>

        <p class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10   bg-primary/30"
          x-on:click="open = ! open" x-on:click.outside="open = false" x-on:mouseenter="open = true"
          x-on:mouseleave="open = false">

          <i class="fa fa-user"></i>

        </p>
      </li>
      <li>
        <p
          class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10 bg-primary/30">
          <i class="fa-solid fa-circle-dollar-to-slot"></i>
        </p>
      </li>
      <li x-data="{ open: false }" x-on:mouseenter="open = true" x-on:mouseleave="open = false">
        <div x-show="open" x-transition
          class="absolute left-[93px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1">
            <ul>
              <router-link to="/unit">
                <li class="text-white text-md hover:bg-gray-100 hover:text-gray-800 cursor-pointer px-2 py-1 rounded">
                  Unit Settings</li>
              </router-link>
            </ul>
          </div>
        </div>
        <p class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10  bg-primary/30"
          x-on:click="open = ! open" x-on:click.outside="open = false" x-on:mouseenter="open = true"
          :class="{ 'bg-green-200': open }">
          <i class="fa-solid fa-truck-monster"></i>
        </p>
      </li>

      <li>
        <p class=" text-white text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10 bg-primary/30"
          @click="logout">
          <Tooltip text="Logout">
            <i class="fa-solid fa-sign-out"></i>
          </Tooltip>
        </p>
      </li>
    </ul>
  </div>
  <!-- End of sidebar -->
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authStore';
import Tooltip from './Common/Tooltip.vue';
export default {
  data() {
    return {
      menuOpen: false,
      count: new Array(10).fill(1),
      authStore: useAuthStore()
    };
  },
  created() {

  },
  methods: {
    logout() {
      this.$emitter.emit('show-delete-modal', {
        message: 'Are you sure to Logout',
        title: 'Confirm Logout',
        btnText: 'Logout',
        callback: (e: 'CONFIRM' | 'CLOSE') => {
          if (e == 'CONFIRM') {
            this.authStore.$reset()
            this.$router.push({ name: 'login' })
          }
        }
      })
    }
  },
  components: {
    Tooltip,
  },
};
</script>