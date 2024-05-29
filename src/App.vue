
<template>
  <div class="flex h-screen">
    <SidebarView v-if="authStore.isLoggedIn==true"/>
    <RouterView />
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import SidebarView from '../src/components/SidebarView.vue'
import { useAuthStore } from '@/stores/authStore';

export default {
  data() {
    return {
      authStore: useAuthStore()
    };
  },
  components: {
    SidebarView
  }
}
</script>