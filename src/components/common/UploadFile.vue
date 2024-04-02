<template>
  <div @dragover.prevent @drop.prevent>
    <label class="upload-content" @drop="dragFile" :class="error && 'error'">
      <span class="upload-content__icon">
        <slot name="icon"></slot>
      </span>
      <div v-if="!file.name.length">
        <h4 class="upload-content__title">
          {{ title }}
        </h4>
      </div>
      <div v-else class="d-flex align-center justify-space-between w-100">
        <span class="upload-content__file-name">
          {{ file.name }}
        </span>
        <button @click.prevent="removeFile">
          <v-icon icon="mdi mdi-close"></v-icon>
        </button>
      </div>
      <input
        @input="handleFileChange($event)"
        type="file"
        class="upload-content__input d-none"
        :accept="type"
      />
    </label>
    <div
      v-if="showHelper"
      class="d-flex align-center ga-4 mb-8 mt-4 justify-center"
    >
      <span
        class="mdi mdi-alert-circle-outline mdi-24px upload-content__alert"
      ></span>
      <p>
        <span> {{ $t("PRESCRIPTIONS.CASH.IMAGE_SIZE_LIMIT") }}</span>
        <br />
        <span> {{ $t("PRESCRIPTIONS.CASH.ACCEPTED_FORMATS") }} </span>
      </p>
    </div>
    <p class="upload-content__alert" v-if="error">{{ errorText }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
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
    type: {
      type: String,
      default: "",
    },
    showHelper: {
      type: Boolean,
      default: false,
    },
    key: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      uploadReady: true,
      file: {
        name: "",
        size: 0,
      },
    };
  },

  methods: {
    handleFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        this.file = e.target.files[0];
        this.$emit("upload", this.file);
      }
    },
    dragFile(e) {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        this.file = e.dataTransfer.files[0];
        this.$emit("upload", this.file);
      }
    },
    removeFile() {
      this.file = {
        name: "",
        size: 0,
      };
      this.$emit("upload", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-content {
  padding: 16px 32px;
  border-radius: 8px;
  display: flex;
  cursor: pointer;
  margin: auto;
  &__alert {
    color: red;
  }
  &__icon {
    margin-bottom: 8px;
  }
  &.error {
    border-color: red;
  }
  &__title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.1px;
  }
  &__text {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
