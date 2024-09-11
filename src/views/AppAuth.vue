<template>
  <div class="container">
    <div class="card-white">
      <h2 class="auth-title">Авторизуйтесь в системе</h2>
      <div class="auth-form">
        <form action="" class="auth" @submit.prevent="onSubmit">
          <div class="auth-row">
            <label class="auth-label" for="email">e-mail</label>
            <div class="input-row">
              <input type="text" id="email" :class="['auth-input', {'auth-input-error': emailError}]" v-model="email" @blur="emailBlur">
              <div  :class="['input-icon', '_icon-mail', {'icon-error': emailError}]"></div>
              <p v-if="emailError" class="auth-error">{{ emailError }}</p>
            </div>

          </div>
          <div class="auth-row" >
            <label class="auth-label" for="password">Пароль</label>
            <div class="input-row">
              <input :type="hideFlag ? 'text': 'password'" id="password"  :class="['auth-input', {'auth-input-error': passError}]" v-model="password" @blur="passBlur">
              <div class="input-icon _icon-hide" :class="['_icon-' + hidden, {'icon-error': passError}]" @click="isHidden"></div>
            </div>
            <p v-if="passError" class="auth-error">{{ passError }}</p>
          </div>
          <button v-if="!noSubmit" class="auth-btn" type="submit" :disabled="isSubmitting">Войти</button>

          <p v-if="noSubmit" class="auth-error">Слишком много ошибок входа в систему, попробуйте через 10 минут</p>
        </form>

      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

import { error } from '../utils/errors'
export default {
  setup () {
    const { handleSubmit, isSubmitting, submitCount } = useForm()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const hidden = ref('hide')
    const hideFlag = ref(false)
    const PASSWORD_MIN_LENGTH = 8
    const SUBMIT_FORM_TIMER = 600000

    const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
      'email',
      yup.string().trim().required('Введите свой e-mail!').email('Введите корректный email!')
    )
    const { value: password, errorMessage: passError, handleBlur: passBlur } = useField(
      'password',
      yup.string().trim().required('Введите свой пароль!').min(PASSWORD_MIN_LENGTH, `Пароль не может быть менее ${PASSWORD_MIN_LENGTH} символов`)
    )

    const onSubmit = handleSubmit(async values => {
      try {
        await store.dispatch('auth/login', values)
        router.push('/')
      } catch (e) {
        console.log(e)
      }
    })
    if (route.query.message) {
      store.dispatch('authErrors/setMessage', {
        value: error(route.query.message),
        type: 'error'
      })
    }

    const noSubmit = computed(() => submitCount.value >= 5)
    watch(noSubmit, val => {
      if (val) {
        setTimeout(() => { submitCount.value = 0 }, SUBMIT_FORM_TIMER)
      }
    })

    function isHidden () {
      if (hidden.value === 'hide') {
        hidden.value = 'visibility'
        hideFlag.value = !hideFlag.value
      } else {
        hidden.value = 'hide'
        hideFlag.value = !hideFlag.value
      }
    }
    return {
      hidden,
      hideFlag,
      email,
      password,
      emailError,
      passError,
      emailBlur,
      passBlur,
      onSubmit,
      isSubmitting,
      noSubmit,
      isHidden
    }
  }

}
</script>

<style scoped>

</style>
