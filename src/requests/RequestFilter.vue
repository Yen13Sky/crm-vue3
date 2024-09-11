<template>
  <div class ="filter">
    <div class="filter-form">
      <input type="text" placeholder="Введите имя заказчика" class="filter-input" v-model="name">
    </div>
    <div class="filter-form">
      <select  class="filter-select" v-model="status">
        <option disabled selected>Выбрать статус заявки</option>
        <option value="done">Выполнено</option>
        <option value="process">В процессе</option>
        <option value="cancelled">Отменено</option>
      </select>
    </div>
    <div class="filter-form">
      <button class="btn filter-btn" v-if="isActive" @click="reset">Очистить</button>
    </div>

  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup (_, { emit }) {
    const name = ref()
    const status = ref()
    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })
    const isActive = computed(() => name.value || status.value)

    return {
      name,
      status,
      isActive,
      reset: () => {
        name.value = ''
        status.value = null
      }
    }
  }

}
</script>

<style scoped>

</style>
