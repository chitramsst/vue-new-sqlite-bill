<template>
  <!-- sidebar -->
  <div class="w-[100px] bg-sidebar flex justify-start flex-col items-center space-y-6">
    <p
      class=" text-white text-wrap  bg-primary rounded-lg flex items-center justify-center gap-3 text-3xl m-3 h-10 w-10">
      <i class="fa-brands fa-canadian-maple-leaf"></i>
    </p>
    <ul class="mt-5 flex flex-col space-y-5">
      <li x-data="{ open: false }">
        <div x-show="open" x-transition class="absolute left-20 mt-5  border border-gray-300 rounded-lg p-4 shadow-lg z-10 bg-primary">
          <ul>
            <li class="text-gray-400 text-sm">Category</li>
            <li class="text-gray-400 text-sm">Product</li>
          </ul>
        </div>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10" x-on:click="open = ! open">
          <i class="fa-solid fa-layer-group"></i>
        </p>
     
   
      </li>
      <li x-data="{ open: false }">
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10" x-on:click="open = ! open">
          <i class="fa-regular fa-image"></i>
        </p>
        <div x-show.important="open" x-transition>
          Dropdown Contents...
        </div>
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
      <li>
        <p class=" text-gray-500 text-wrap  rounded-lg flex items-center justify-center gap-3 text-2xl m-3 h-10 w-10">
          <i class="fa-solid fa-truck-monster"></i>
        </p>
      </li>
    </ul>
  </div>
  <!-- End of sidebar -->
</template>