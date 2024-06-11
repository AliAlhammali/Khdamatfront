<template>
  <div id="app">
    <PhoneVerification />
  </div>
</template>

<script>
import PhoneVerification from './services/shared/PhoneAuth.vue';

export default {
  components: {
    PhoneVerification
  }
};
</script>
