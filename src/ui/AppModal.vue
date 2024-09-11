<template>
  <div class="modal-background" >
    <div class="container">
      <div class="modal">
        <div class="modal-row">
          <h2 class="title">{{title}}</h2>
          <div class="close-icon _icon-clear" @click="$emit('close')"></div>
        </div>

        <slot />
      </div>
    </div>
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
  emits: ['close']

}
</script>

<style scoped>

</style>
