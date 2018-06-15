<template>
  <div class="introduction">
    <div class="article">
      <p>最新文章</p>
    </div>
    <div class="int-c clear" v-for="dint in dints">
      <div class="int-img">
        <img :src="dint.url">
      </div>
      <div class="int-content">
        <h3>{{dint.title}}</h3>
        <p class="con">{{dint.con}}
          <a href="">[详情]</a>
        </p>
        <p class="lable">
          <span class="hov">
            <i style="color:red" class="fa fa-tag"></i> {{dint.theme}}
          </span>
          <span>
            <i style="color:#6ac9ea" class="fa fa-clock-o"></i> {{dint.createtime}}
          </span>
          <span class="hov">
            <i style="color:red" class="fa fa-comment-o"></i> 评论({{dint.comment}})
          </span>
          <span>
            <i style="color:red" class="fa fa-eye"></i> 浏览({{dint.browse}})
          </span>
          <span class="hov">
            <i style="color:#00daff" class="fa fa-thumbs-o-up"></i> {{dint.praise}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'introduction',
  data () {
    return {
      dints: [
        {
          url: require('./../../assets/2.jpg'),
          title: '我的第一个博客',
          con: '1165464654d654ad5s4s5c4a654wa6e4f8ea4f8d4s65c4da65s46ae4f8ewa4f6dsa4c65eafeaf465dsa4v56d4v65dsv4ds65af4...',
          theme: 'Html',
          createtime: '2017-09-06 15:10:22',
          comment: 22,
          browse: 45,
          praise: 30
        },
        {
          url: require('./../../assets/3.jpg'),
          title: '我的第二个博客',
          con: '1165464654d654ad5s4s5c4a654wa6e4f8ea4f8d4s65c4da65s46ae4f8ewa4f6dsa4c65eafeaf465dsa4v56d4v65dsv4ds65af4...',
          theme: 'nodejs',
          createtime: '2017-09-06 15:10:22',
          comment: 25,
          browse: 55,
          praise: 36
        },
        {
          url: require('./../../assets/3.jpg'),
          title: '我的第三个博客',
          con: '1165464654d654ad5s4s5c4a654wa6e4f8ea4f8d4s65c4da65s46ae4f8ewa4f6dsa4c65eafeaf465dsa4v56d4v65dsv4ds65af4...',
          theme: 'javascript',
          createtime: '2017-09-07 10:15:12',
          comment: 45,
          browse: 25,
          praise: 76
        }
      ]
    }
  },
  created () {
    // console.log($route.path)
  }
}
</script>

<style>
.introduction {
  width: 100%;
}

.introduction .article {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  line-height: 40px;
  font-weight: 600;
  border-bottom: 4px solid #cb3034;
}

.introduction .int-c {
  width: 100%;
  padding: 30px 0;
  border-bottom: 2px solid #fddd98;
}

.introduction .int-c:hover {
  background-color: #fff;
}

.introduction .int-c>div {
  float: left;
}

.introduction .int-c .int-img {
  width: 170px;
  height: 140px;
  margin-right: 10px;
}

.introduction .int-c .int-img img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.introduction .int-c .int-content {
  width: 580px;
}

.introduction .int-c .int-content h3 {
  font-weight: 600;
  margin-bottom: 10px;
  cursor: pointer;
}

.introduction .int-c .int-content h3:hover {
  color: #007acc;
}

.introduction .int-c .int-content .con {
  word-wrap: break-word;
  font-size: 12px;
  line-height: 20px;
  height: 80px;
}

.introduction .int-c .int-content .con a {
  padding-left: 5px;
  color: #759b08;
}

.introduction .int-c .int-content .con a:hover {
  color: #06dbf3;
}

.introduction .int-c .int-content .lable {
  padding: 10px;
}

.introduction .int-c .int-content .lable span {
  font-size: 12px;
  margin-right: 40px;
  cursor: pointer;
  color: #999999;
}

.introduction .int-c .int-content .lable span.hov:hover {
  text-decoration: underline #999;
}
</style>
