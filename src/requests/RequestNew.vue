<template>
  <form class="request-form" @submit.prevent="onSubmit">
    <div class="form-row">
      <label for="name"  class="form-label" :class="['form-label', {'form-label-error': errorName}]">ФИО заказчика <span :class="[{'form-label-error': errorName}]">*</span></label>
      <input id="name" type="text" placeholder="Иванов Иван Иванович" :class="['form-input', {'form-input-error': errorName}]" v-model="name"  @blur="blurName">
      <p v-if="errorName" class="form-error">{{ errorName }}</p>
    </div>
    <div class="form-row">
      <label  for="phone"  :class="['form-label', {'form-label-error': errorPhone}]">телефон заказчика<span :class="[{'form-label-error': errorPhone}]">*</span></label>
      <input v-mask="['+7 (###) ###-##-##']" placeholder="+7 (000) 000-00-00" id="phone" type="text" :class="['form-input', {'form-input-error': errorPhone}]" v-model="phone" @blur="blurPhone">
      <p v-if="errorPhone" class="form-error">{{ errorPhone }}</p>
    </div>
    <div  class="form-row">
      <label for="req"  :class="['form-label', {'form-label-error': errorReq}]">Наименование заявки<span :class="[{'form-label-error': errorReq}]">*</span></label>
      <input id="req" type="text" placeholder="Разгрузка" :class="['form-input', {'form-input-error': errorReq}]" v-model="req" @blur="blurReq">
      <p v-if="errorReq" class="form-error">{{ errorReq }}</p>
    </div>
    <div  class="form-row">
      <label for="text-req"  class="form-label">Описание заявки</label>
      <textarea id="text-req" type="text" placeholder="Введите подробное описание Вашей заявки" class="form-input" v-model="textReq"></textarea>
    </div>
    <div  class="form-row">
      <label for="req-sum"  :class="['form-label', {'form-label-error': errorReqSum}]">Общая сумма<span :class="[{'form-label-error': errorReqSum}]">*</span></label>
      <input placeholder="1 000" id="req-sum" type="text" :class="['form-input', {'form-input-error': errorReqSum}]" v-model="reqSum" @blur="blurReqSum">
      <p v-if="errorReqSum" class="form-error">{{ errorReqSum }}</p>
    </div>
    <div  class="form-row">
      <label for="req-status"  :class="['form-label', {'form-label-error': errorReqStatus}]">Статус заявки<span :class="[{'form-label-error': errorReqStatus}]">*</span></label>
      <select id="req-status"  :class="['form-input', {'form-input-error': errorReqStatus}]" v-model="reqStatus" @blur="blurReqStatus">
        <option value="done" class="form-input-option"><span>Выполнено</span></option>
        <option value="process" class="form-input-option"><span>В процессе</span></option>
        <option value="cancelled" class="form-input-option"><span>Отменено</span></option>
      </select>
      <p v-if="errorReqStatus" class="form-error">{{ errorReqStatus }}</p>
    </div>

    <button class="btn form-btn" :disabled="isSubmitting">Создать</button>

  </form>
</template>

<script>
import { useRequestForm } from '../use/requestForm'
import { mask } from 'vue-the-mask'
import { useStore } from 'vuex'

export default {
  directives: { mask },
  emits: ['created'],
  setup (_, { emit }) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return {
      ...useRequestForm(submit)
    }
  }

}
</script>

<style scoped>

</style>
