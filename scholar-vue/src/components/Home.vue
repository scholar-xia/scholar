<template>
  <div class="home">
    <div class="top-home">
      <ul class="clear">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">关于我</router-link>
        </li>
      </ul>
    </div>
    <div class="top-line"></div>
    <div class="top-bg" :style="'background-image: url(' + topbg + ')'"></div>
    <div class="theme">
      <ul class="clear">
        <li v-for="(item, index) in items"
        :key="index"
        :class="{'act':index===mark}"
        @click="click(index)">
          <router-link class="a" :to="item.url">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="content-center clear">
        <div class="content-show">
          <router-view></router-view>
        </div>
        <div class="userinfo">
          <xAccount></xAccount>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      topbg: require('./../assets/topbg.jpg'),
      items: [
        {url: '/', name: '首页'},
        {url: '/html', name: 'html'},
        {url: '/javascript', name: 'javascript'},
        {url: '/nodejs', name: 'nodejs'},
        {url: '/react-native', name: 'react-native'},
        {url: '/about', name: '关于我'}
      ],
      mark: 0
    }
  },
  methods: {
    click (i) {
      this.mark = i
    }
  }
}
</script>

<style>
.top-home {
  width: 100%;
  background-color: antiquewhite;
}
.act {
  background-color: #ff9700;
}
.top-home ul {
  width: 1200px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  text-align: right;
}

.top-home ul li {
  display: inline-block;
  margin-left: 20px;
}

.top-home ul li a:hover {
  color: #f44336;
}

.top-line {
  width: 100%;
  height: 1px;
  margin-top: 1px;
  background-color: #5cea15;
}

.top-bg {
  width: 100%;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
}

.theme {
  width: 100%;
  height: 50px;
  background-color: #bfab86;
}

.theme ul {
  width: 1200px;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
}

.theme ul li {
  float: left;
}

.theme ul li .a {
  color: #fff;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
}

.theme ul li .a:hover {
  background-color: #fff;
  color: #f77825;
}
.content{
  width: 100%;
  padding-top: 10px;
  background-color: antiquewhite;
}
.content .content-center {
  width: 1200px;
  margin: 0 auto;
}
.content .content-center>div{
  float: left;
}
.content .content-center .content-show {
  width: 65%;
  padding: 0 10px;
}
.content .content-center .userinfo {
  width: 35%;
}
</style>
