<template>
  <h1 class="title">CRM</h1>
  <div class="container">
    <div class="card">
      <error-auth ></error-auth>
      <router-view v-if="!errorMessage"   />
    </div>
  </div>
</template>

<script>
import ErrorsAuthLayout from './ErrorsAuthLayout'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const errorMessage = computed(() => store.state.authErrors.message)
    return {
      errorMessage

    }
  },

  components: {
    'error-auth': ErrorsAuthLayout
  }
}
</script>

<style scoped>

</style>
