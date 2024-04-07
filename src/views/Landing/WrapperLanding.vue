<template>
  <div>
    <div class="container">
      <h1>Coming Soon!</h1>
      <p>We're busy preparing something amazing for you. Stay tuned for updates!</p>
    </div>


    <router-view></router-view>
  </div>
</template>
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  text-align: center;
}
.container {
  margin-top: 100px;
}
h1 {
  color: #333;
}
p {
  color: #666;
}
.social-links {
  margin-top: 20px;
}
.social-links a {
  margin: 0 10px;
  color: #333;
  text-decoration: none;
}
</style>
<script>
export default {};
</script>
<style lang="scss" scoped></style>
