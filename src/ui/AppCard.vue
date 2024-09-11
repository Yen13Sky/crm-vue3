<template>
  <div class="card">
    <div class="header-row">
      <h1 class="title">{{title}}</h1>
      <slot name="header"/>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup (props) {
    document.title = `${props.title} | CRM`
  }

}
</script>

<style scoped>

</style>
