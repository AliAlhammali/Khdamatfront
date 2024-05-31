<template >
  <v-infinite-scroll
    @load="$emit('load')"
    :items="items"
    side="end"
    color="primary"
    class="overflow-hidden"
  >
    <slot name="items"></slot>
    <template #empty>
      {{ $t("global.table.no_data_more") }}
    </template>
  </v-infinite-scroll>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
</style>