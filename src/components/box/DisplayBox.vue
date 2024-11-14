<template>
  <div>
    <div :class="`${dataSourceDisplay.header.style}`">
      {{ dataSourceDisplay.header.text }}
    </div>
    <div :class="`${dataSourceDisplay.body.style}`">
      {{ dataSourceDisplay.body.text }}
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "DisplayBox",
  props: {
    dataSource: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const dataSourceDisplay = ref(props.dataSource);
    return {
      dataSourceDisplay,
    };
  },
};
</script>
