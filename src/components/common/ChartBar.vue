<template >
  <div>
    <div v-if="isLoading" class="d-flex align-center justify-center pa-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <apexchart
      v-else
      type="bar"
      height="350"
      :options="chart.options"
      :series="chart.series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  props: {
    chart: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
</style>