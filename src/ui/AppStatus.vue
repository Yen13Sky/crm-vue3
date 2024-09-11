<template>
  <span :class="['status', className]">{{ text }}</span>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    type: {
      type: String,
      required: true
    },

    validator (value) {
      return ['process', 'done', 'cancelled'].includes(value)
    }

  },
  setup (props) {
    const classMap = {
      process: 'process',
      done: 'done',
      cancelled: 'cancelled'
    }
    const textMap = {
      process: 'В процессе',
      done: 'Выполнено',
      cancelled: 'Отменено'
    }
    watch(props, val => {
      className.value = classMap[val.type]
      text.value = textMap[val.type]
    })
    const className = ref(classMap[props.type])
    const text = ref(textMap[props.type])
    return {
      className, text
    }
  }

}
</script>

<style scoped>
  .process{
    color: #1d3557;
  }
  .done{
    color: #317c54;

  }
  .cancelled{
    color: #e63946;

  }

</style>
