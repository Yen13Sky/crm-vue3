<template>
  <component v-if="layout" :is="layout + '-layout'"/>

</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'

export default {
  setup () {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    'main-layout': MainLayout,
    'auth-layout': AuthLayout

  }
}
</script>

<style scoped>

</style>
