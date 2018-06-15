<template>
  <div id="chat"></div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {}
  },
  methods: {
    chat () {
      var socket = io('http://127.0.0.1:3000')
    }
  }
}
</script>

