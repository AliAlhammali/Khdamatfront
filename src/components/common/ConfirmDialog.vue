<template>
  <div>
    <button @click="showAlert">Hello world</button>
  </div>
</template>
<script>
export default {
  methods: {
    showAlert() {
      this.$swal({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: this.$t("global.actions.save"),
        cancelButtonText: this.$t("global.actions.cancel"),
      }).then((result) => {
        if (result.value) {
          this.$swal({
            title: "Saved!",
            icon: "success",
            confirmButtonText: this.$t("global.actions.save"),
          });
        } else if (result.dismiss === "cancel") {
          this.$swal({
            title: "Cancelled",
            icon: "info",
            confirmButtonText: this.$t("global.actions.save"),
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>