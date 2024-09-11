
<template>
  <loader v-if="loading"></loader>
  <app-page  :title = request.req :name = request.name v-else-if="request" >
    <div class="page-request-row">
      <h4 class="page-request-title"><span>Наименование:</span> {{ request.req}}</h4>
      <h4 class="page-request-title"><span>ФИО заказчика:</span> {{ request.name}}</h4>
      <h4 class="page-request-title"><span>Телефон заказчика:</span> {{ request.phone}}</h4>
      <h4 v-if="request.textReq" class="page-request-title"><span>Описание заявки:</span> {{ request.textReq}}</h4>
      <h4 class="page-request-title"><span>Общая стоимость:</span> {{ currency(request.reqSum)}}</h4>
      <h4 class="page-request-title"><span>Статус заявки:</span> <status :type="request.reqStatus"></status></h4>
      <div v-if="!update" class="page-request-active-row">
        <button class="btn request-change-btn" @click="changeReq">изменить</button>
        <button class="btn request-delete-btn" @click="removeReq">удалить</button>
      </div>
      <div v-if="update" class="update">
        <h4 class="update-request-title"><span>Изменить статус заявки:</span></h4>
        <select id="req-status"  :class="['form-input', 'page-request-select']" v-model="status" @blur="blurReqStatus">
          <option value="done" class="form-input-option"><span>Выполнено</span></option>
          <option value="process" class="form-input-option"><span>В процессе</span></option>
          <option value="cancelled" class="form-input-option"><span>Отменено</span></option>
        </select>
        <button class="btn request-change-btn update-btn" @click="changeSave">Сохранить</button>
      </div>
      <router-link to="/" >
        <button class="btn request-btn"> назад</button>
      </router-link>
    </div>

  </app-page>
  <h3 class="title" v-else> Заявки с ID:  {{id}} нет!</h3>

</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useStore } from 'vuex'
import AppPage from '../components/AppPage'
import Apploader from '../ui/Apploader'
import AppStatus from '../ui/AppStatus'
import { currency } from '../utils/currency-format'

export default {

  setup: function () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})
    const update = ref(false)
    const status = ref()

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', route.params.id)
      status.value = request.value?.reqStatus
      loading.value = false
    })
    const removeReq = async () => {
      await store.dispatch('request/deleteRequest', route.params.id)
      router.push('/')
    }
    const changeSave = async () => {
      const data = { ...request.value, status: status.value, id: route.params.id }
      await store.dispatch('request/updateRequest', data)
      request.value.reqStatus = status.value
      update.value = false
    }
    const changeReq = () => {
      update.value = true
    }

    return { loading, request, id: route.params.id, currency, removeReq, changeReq, changeSave, update, status }
  },
  components: {
    AppPage,
    loader: Apploader,
    status: AppStatus
  }

}
</script>

<style scoped>

</style>
