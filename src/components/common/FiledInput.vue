<template>
  <div :class="{ disabled: disabled }">
    <p class="d-flex align-center ga-2 mb-3 filed__label">
      <span>{{ label }}</span>
      <span v-if="required" class="text-red">*</span>
    </p>
    <div class="filed">
      <label
        class="position-relative filed__input d-flex align-center ga-2 pa-2 rounded"
        :class="{ error: error, disabled: disabled }"
      >
        <slot name="icon"></slot>
        <input
          :type="showPassword ? 'text' : type"
          class="w-100"
          :placeholder="placeholder.length ? placeholder : label"
          :class="error && 'error'"
          :value="value"
          @input="($event) => update($event.target.value)"
          @blur="$emit('blur')"
          :disabled="disabled"
          :maxlength="maxlength"
          :readonly="readonly"
        />
        <button v-if="type == 'password'" @click="$emit('show-password')">
          <span
            v-if="!showPassword"
            class="mdi mdi-24px mdi-eye-outline main-color filed__password-icon"
          ></span>
          <span
            v-else
            class="mdi mdi-24px mdi-eye-off-outline main-color filed__password-icon"
          ></span>
        </button>
      </label>

      <p
        class="text-error mt-2 d-flex ga-2 align-center"
        v-if="error && errorText.length"
      >
        <span class="mdi mdi-24px mdi-alert-circle-outline"></span>
        <span>{{ errorText }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    update(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
<style lang="scss" >
.filed {
  &__label {
    color: #1c1c1c;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  &__input {
    height: 48px;
    border: 1px solid $gray;
    &.error {
      border-color: $error;
    }
  }
}
.text-error {
  color: $error;
}

.disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
