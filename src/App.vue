<template>
  <div id="app" class="main_contain">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.main_contain{
    width: 100%;
    height: 100%;
}
html,body{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
}
.primary-text, button {
    font-family: 'Advent Pro', sans-serif;
}
@media (min-width: 400px) and (max-width: 500px) {
    .el-message-box{
        margin-top: 50%;
    }
}
</style>
