<template>
  <div class="soon">
    <v-container>
      <div class="d-flex align-center justify-center ga-2 mb-8 border-b pb-6">
        <router-link to="/admin" class="button button--outline">
          Admin
        </router-link>
        <router-link to="/service-provider" class="button button--outline">
          Service Provider
        </router-link>
        <router-link to="/merchant" class="button button--outline">
          Merchant
        </router-link>
      </div>
      <div class="d-flex align-center justify-center flex-column">
        <img src="/soon.jpg" alt="soon" height="300" />
        <h1>Coming Soon!</h1>
        <p class="text-grey-darken-1">
          We're busy preparing something amazing for you. Stay tuned for
          updates!
        </p>
      </div>
    </v-container>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.soon {
  font-family: Arial, sans-serif;
  background-color: #f5f6f8;
  text-align: center;
  min-height: 100dvh;
}
</style>
