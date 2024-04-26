<template >
  <div class="d-flex align-center justify-center flex-column ga-4 page-not">
    <img src="/error.png" alt="error" height="300" />
    <router-link to="/">
      <span>
        {{ $t("global.actions.back_to_home") }}
      </span>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.page-not {
  height: 100vh;
  background-color: #fff;
}
</style>