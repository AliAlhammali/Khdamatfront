<template>
  <div>
    <!-- <div>navbar</div> -->
    <!-- <div>sidebar</div> -->
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer class="border-0 shadow-lg">
        <v-list>
          <v-list-item title="Navigation drawer"> item 1 </v-list-item>
          <v-list-item title="Navigation drawer"> item 2 </v-list-item>
          <v-list-item title="Navigation drawer"> item 3 </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="border-0 shadow">
        <div class="d-flex align-center ga-2">
          <div class="d-flex align-center ga-2 border-e pe-2">
            <span class="mdi mdi-24px mdi-account-outline"></span>
            <p>{{ $cookies.get("khadamat_user")?.name }}</p>
          </div>
          <div class="d-flex align-center ga-2">
            <span class="mdi mdi-24px mdi-email-outline"></span>
            <p>{{ $cookies.get("khadamat_user")?.email }}</p>
          </div>
        </div>
        <!-- <p>{{ $cookies.get("khadamat_user")?.email_verified_at }}</p> -->
      </v-app-bar>

      <v-main style="min-height: 300px">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped></style>
