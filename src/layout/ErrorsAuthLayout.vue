<template>
  <div v-if="message" class="container">
    <div class="card-white">
      <div class="error-row">
        <div v-if="title" class="auth-title" :class="message.value.type === 'error' ? 'error' : 'warning'">{{ title }}</div>
        <div class="auth-error" :class="message.value.type === 'error' ? 'error-text' : 'warning-text'">
          <p>{{ message.value }}</p>
        </div>
        <button class="auth-btn" @click="closeError">закрыть</button>
      </div>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const TITLE_MAP = {
      error: 'Ошибка',
      warning: 'Внимание'
    }
    const message = computed(() => store.state.authErrors.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)
    return {
      message,
      title,
      closeError: () => store.commit('authErrors/deleteMessage')
    }
  }
}
</script>

<style scoped>

</style>
