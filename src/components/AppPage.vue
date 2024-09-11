<template>
  <div class="card">
    <h1 class="title">{{title}}<slot name="header" /></h1>
    <slot />

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    document.title = `${props.title}`
  }
}
</script>

<style scoped>

</style>
