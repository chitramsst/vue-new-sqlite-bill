<template>
  <!-- sidebar -->
  <div class="w-[100px] bg-sidebar flex justify-start flex-col items-center space-y-6">
    <router-link to="/home">
    <p
      class=" text-white text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-3xl m-3 h-10 w-10">
      <i class="fa-brands fa-canadian-maple-leaf"></i>
    </p>
    </router-link>
    <ul class="mt-5 flex flex-col space-y-5">

      <li x-data="{ open: false }">
        <div x-show="open" x-transition class="absolute left-[93px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1">
          <ul>
            <router-link to="/category">
            <li class="text-gray-500 text-md hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">Category</li>
          </router-link>
          <router-link to="/brand">
            <li class="text-gray-500 text-md hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">Brand</li>
            </router-link>
          <router-link to="/product">
            <li class="text-gray-500 text-md hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">Product</li>
            </router-link>
          </ul>
        </div>
        </div>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10 bg-sidebar"  :class="open ? 'bg-primary text-white' : 'bg-sidebar text-gray-500'" x-on:click="open = ! open" x-on:click.outside="open = false">
          <i class="fa-solid fa-layer-group"></i>
        </p>
      </li>

      <li x-data="{ open: false }">
        <div x-show="open" x-transition class="absolute left-[94px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1">
          <ul>
            <li class="text-gray-500 text-md hover:bg-gray-100 cursor-pointer px-2 py-1 rounded"></li>
            <li class="text-gray-500 text-md hover:bg-gray-100 cursor-pointer px-2 py-1 rounded"></li>
          </ul>
        </div>
        </div>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10 bg-sidebar"  :class="open ? 'bg-primary text-white' : 'bg-sidebar text-gray-500'" x-on:click="open = ! open" x-on:click.outside="open = false">
          <i class="fa-regular fa-image"></i>
        </p>
      </li>

      <li>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10">
          <i class="fa-solid fa-arrows-to-dot"></i>
        </p>
      </li>
      <li>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10">
          <i class="fa-solid fa-circle-dollar-to-slot"></i>
        </p>
      </li>
      <li x-data="{ open: false }">
        <div x-show="open" x-transition class="absolute left-[93px]  w-48 border-r border-t border-b border-gray-300 rounded-r-lg p-4 shadow-lg z-10 bg-sidebar">
          <div class="px-1">
          <ul>
          <router-link to="/unit">
            <li class="text-gray-500 text-md hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">Unit Settings</li>
            </router-link>
          </ul>
        </div>
        </div>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10 bg-sidebar"  :class="open ? 'bg-primary text-white' : 'bg-sidebar text-gray-500'" x-on:click="open = ! open" x-on:click.outside="open = false">
          <i class="fa-solid fa-truck-monster"></i>
        </p>
      </li>
    </ul>
  </div>
  <!-- End of sidebar -->
</template>