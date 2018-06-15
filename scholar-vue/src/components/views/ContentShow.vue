<template>
  <div class="homepage">
    <xCarousel :imgurls="imgurls"></xCarousel>
    <xIntroduction></xIntroduction>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      imgurls: [
        require('./../../assets/1.jpg'),
        require('./../../assets/2.jpg'),
        require('./../../assets/3.jpg'),
        require('./../../assets/4.jpg')
        // {url: 'http://img3.imgtn.bdimg.com/it/u=1351200827,3135126754&fm=214&gp=0.jpg'}
      ]
    }
  }
}
</script>
