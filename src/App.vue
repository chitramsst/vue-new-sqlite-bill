
<template>
  <div class="flex h-screen">
    <SidebarView />
    <RouterView />
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import SidebarView from '../src/components/SidebarView.vue'

export default {
  components: {
    SidebarView
  }
}
</script>