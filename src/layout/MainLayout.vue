<template>
  <the-header></the-header>
  <sidebar></sidebar>
  <div class="container">
    <error-message></error-message>
      <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheSidebar from '../components/TheSidebar'
import ErrorsAuthLayout from './ErrorsAuthLayout'
export default {
  setup () {

  },
  components: {
    'the-header': TheHeader,
    'error-message': ErrorsAuthLayout,
    sidebar: TheSidebar
  }
}
</script>

<style scoped>

</style>
