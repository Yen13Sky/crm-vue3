<template>

  <h2 v-if="requests.length === 0" class="title">Заявок нет</h2>
  <table v-else class="request">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО заказчика</th>
        <th>Телефон заказчика</th>
        <th>Заявка</th>
        <th>Общая сумма</th>
        <th>Статус</th>
        <th >Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, idx) in requests" :key="request.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ request.name }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ request.req }}</td>
        <td>{{ currency(request.reqSum) }}</td>
        <td><status :type="request.reqStatus"></status></td>
        <td>
          <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: request.id}}">
            <button class="btn btn-table" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { currency } from '../utils/currency-format'
import AppStatus from '../ui/AppStatus'

export default {
  props: ['requests'],
  setup () {
    return { currency }
  },
  components: {
    status: AppStatus
  }

}
</script>

<style scoped>

</style>
