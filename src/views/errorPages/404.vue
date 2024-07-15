<template>
  <div class="error-container">
    <div class="code">
      404
    </div>
    <div class="message">
      Not Page
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style lang="scss" scoped>
.error-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #636b6f;
  position: relative;

  .code {
    border-right: 2px solid;
    font-size: 26px;
    padding: 0 15px 0 15px;
    text-align: center;
  }

  .message {
    font-size: 18px;
    text-align: center;
    padding: 10px
  }
}
</style>
