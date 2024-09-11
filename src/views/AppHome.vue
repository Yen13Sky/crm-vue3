<template>
  <app-loader v-if="loading"></app-loader>
  <card title="Заявки" v-else>
    <template #header>
      <div class="main-header-row">
        <div class="home-add-row">
          <button class="btn home-btn" @click="modal= true">Создать</button>
          <div class="home-icon-add _icon-add"></div>
        </div>
      </div>
    </template>
    <filter-request v-model="filter"></filter-request>
    <div class="home-row">
      <request-table :requests="requests"></request-table>
    </div>

    <teleport to="body">
      <modal v-if="modal" title="Новая заявка" @close="close">
        <new-request @created="modal = false"></new-request>
      </modal>
    </teleport>

  </card>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppCard from '../ui/AppCard'
import AppRequest from '../requests/AppRequest'
import RequestFilter from '../requests/RequestFilter'
import AppModal from '../ui/AppModal'
import RequestNew from '../requests/RequestNew'
import Apploader from '../ui/Apploader'

export default {
  setup () {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
      return true
    })

    const requests = computed(() => store.getters['request/requests'].filter(request => {
      if (filter.value.name) {
        return request.name.includes(filter.value.name)
      } return request
    }).filter(request => {
      if (filter.value.status) {
        return filter.value.status === request.reqStatus
      } return request
    })

    )

    return {
      modal,
      requests,
      loading,
      filter,
      close: () => {
        modal.value = false
        return true
      }
    }
  },

  components: {
    card: AppCard,
    'request-table': AppRequest,
    modal: AppModal,
    'new-request': RequestNew,
    'app-loader': Apploader,
    'filter-request': RequestFilter

  }

}
</script>

<style scoped>

</style>
