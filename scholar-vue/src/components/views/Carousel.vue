<template>
  <div class="carousel">
    <div class="carouselImg">
      <transition-group tag="ul" name="image">
        <li v-for="(imgurl, index) in imgurls"
        :key="index"
        v-show="index===mark">
          <a href="">
            <img :src="imgurl">
          </a>
        </li>
      </transition-group>
    </div>
    <div class="dot">
      <span v-for="(item, index) in imgurls.length"
      :key="index"
      :class="{'active':index===mark}"
      @click="change(index)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      mark: 0 // mark的初始值为0(第一张图片)
      // imgurls: [
      //   require('./../../assets/1.jpg'),
      //   require('./../../assets/2.jpg'),
      //   require('./../../assets/3.jpg'),
      //   require('./../../assets/4.jpg')
      //   // {url: 'http://img3.imgtn.bdimg.com/it/u=1351200827,3135126754&fm=214&gp=0.jpg'}
      // ]
    }
  },
  props: ['imgurls'],
  methods: {
    change (i) {
      this.mark = i
    },
    autoPlay () {
      this.mark++
      if (this.mark === 4) {
        this.mark = 0
      }
    },
    play () {
      setInterval(this.autoPlay, 4000)
    }
  },
  created () {
    this.play()
  }
}
</script>

<style>
.carousel {
  width: 100%;
  height: 440px;
  position: relative;
  overflow: hidden;
}

.carousel .carouselImg ul li {
  position: absolute;
  top: 0;
  left: 0;
  /* display: none; */
}

.carousel .carouselImg ul li.active {
  display: block;
}

.carousel .carouselImg ul li a img {
  width: 100%;
  height: 100%;
}

.carousel .dot {
  position: absolute;
  top: 84%;
  left: 65%;
}

.carousel .dot span {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: aqua;
  margin: 0 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
}

.carousel .dot span.active {
  background-color: #fff;
}
/* 
.image-enter-active {
  transform: translateX(0);
  transition: all 1s ease;
}

.image-leave-active {
  transform: translateX(-100%);
  transition: all 1s ease-in;
}

.image-enter {
  transform: translateX(100%);
}

.image-enter {
  transform: translateX(0);
} */
</style>
