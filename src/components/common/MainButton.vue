<template>
  <button :class="classes" :disabled="isLoading || disabled">
    <template v-if="isLoading">
      <v-progress-circular :size="size" :color="color" indeterminate />
    </template>
    <template v-else>
      <slot name="text"></slot>
    </template>
  </button>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: "main-btn"
    },
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: "white"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang=""></style>
