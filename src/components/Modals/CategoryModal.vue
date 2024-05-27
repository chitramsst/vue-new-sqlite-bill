<template>
   <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" v-if="isVisible">
    <div class="bg-white rounded-lg p-6 max-w-md">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="mt-4">
        <div class=" text-sm">
        <input type="text" class="border-[0.5px] border-border rounded-lg ring-0 py-2 px-3 w-[100%] outline-0"
          placeholder="Choose Category" />
      </div>
      </div>
      <div class="mt-6">
        <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4">Close</button>
        <button class="px-4 py-2 bg-green-500 text-white rounded-lg">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>