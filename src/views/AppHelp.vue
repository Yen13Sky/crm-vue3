<template>
  <app-page title="Помощь" name="CRM">
    <question v-for="q in questions" :key="q.title" :question="q">

    </question>
  </app-page>
</template>

<script>
import AppPage from '../components/AppPage'
import QuestionItem from '../components/question/QuestionItem'
export default {
  setup () {
    const questions = [
      { title: 'Как создать новую заявку?', text: 'Необходимо перейти на страницу "Заявки", и нажать на кнопку "Создать"' },
      { title: 'Как изменить статус заявки?', text: 'Необходимо перейти на страницу "Заявки", нажать у необходимой заявки кнопку "Открыть". На странице с описанием заявки, нажать кнопку "Изменить", внести изменения и нажать кнопку "Сохранить"' }
    ]

    return { questions }
  },

  components: {
    AppPage,
    question: QuestionItem

  }

}
</script>

<style scoped>

</style>
