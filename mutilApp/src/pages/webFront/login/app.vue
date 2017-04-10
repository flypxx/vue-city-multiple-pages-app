<template>
  <div>
    <a href="http://localhost:8080/webFront/index.html?phone=123">login</a>
    <span>{{phone}}</span>
  </div>
</template>

<script>
// import logo from 'assets/img/logo.png'
export default {
  data () {
    return {
      phone: Number
    }
  },
  created () {
    this.setPhone()
  },
  methods: {
    setPhone () {
      var queryMess = window.location.search
      console.log(queryMess)
      this.phone = 232323
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
