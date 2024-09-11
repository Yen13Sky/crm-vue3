<template>
  <div class="header">
    <div class="logo">CRM</div>
    <div class="header-items">
      <div class="header-item">
        <router-link to="/">Заявки</router-link>
      </div>
      <div class="header-item">
        <router-link to="/help">Помощь</router-link>
      </div>
      <div class="header-item">
        <a @click.prevent="openSidebar">Сообщения</a>
      </div>
      <div class="header-item">
        <a @click.prevent="logout">Выход</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {

  setup () {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logOut')
        router.push('/auth')
      },
      openSidebar: () => store.commit('openSidebar')
    }
  }
}
</script>

<style scoped>

</style>
