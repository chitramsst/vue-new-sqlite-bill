
<template>
  <div class="flex h-screen">
    <SidebarView v-if="authStore.isLoggedIn==true"/>
    <RouterView />
    <DeleteModal/>

  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import SidebarView from '../src/components/SidebarView.vue'
import { useAuthStore } from '@/stores/authStore';
import DeleteModal from '../src/components/Modals/common/DeleteModal.vue'

export default {
  data() {
    return {
      authStore: useAuthStore()
    };
  },
  components: {
    SidebarView,
    DeleteModal
  }
}
</script>