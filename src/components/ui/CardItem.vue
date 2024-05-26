<template >
  <div>
    <v-infinite-scroll @load="load" :items="items" side="end">
      <template v-for="(item, index) in items" :key="index">
        <v-card :loading="isLoading" class="mb-4" elevation="2">
          <v-card-item>
            <v-card-title> {{ item.id }}# </v-card-title>

            <v-card-subtitle> {{ item.started_at }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{ item.merchant_client.name }}
          </v-card-text>

          <v-card-actions>
            <v-btn :to="item.id">Click me</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-infinite-scroll>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    meta: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    load(event) {
      if (event.side === "end") {
        this.$emit("fetchItems");
        event.done();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>