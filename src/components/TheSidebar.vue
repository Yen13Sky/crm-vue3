<template>
  <div class="sidebar" v-if="sidebar">
    <div class="sidebar-row">
      <div class="sidebar-header">
        <h3 class="sidebar-title">Сообщения</h3>
        <div class="sidebar-icon _icon-clear" @click="close"></div>
      </div>
      <div class="sidebar-body">
        <div class="message-title" @click="isOpen = !isOpen">Title</div>
        <div class="message-text" v-if="isOpen"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const sidebar = computed(() => store.state.sidebar)

    return {
      isOpen: ref(false),
      sidebar,
      close: () => store.commit('closeSidebar')
    }
  }

}
</script>

<style scoped>

</style>
