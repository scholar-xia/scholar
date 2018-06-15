<template>
  <div class="account">
    <div class="accounts login" v-if="types==='login'">
      <h1>ScholarX的博客</h1>
      <h3>欢迎登陆</h3>
      <p>账号：<input v-model="lgUser" type="text" placeholder="请输入账号"></p>
      <p>密码：<input v-model="lgPass" type="password" placeholder="请输入密码"></p>
      <p>{{lgmsg}}</p>
      <p>
        <input @click="login()" type="button" value="登录">
        <a @click="change()" href="#">没有账号?去注册</a>
      </p>
      <div class="about">
        <p class="ab">关注博主</p>
        <a class="weibo" href="https://weibo.com/p/1005053499307691/home?from=page_100505&mod=TAB&is_all=1#place" :style="'background-image: url(' + weiboimg + ')'">微博</a>
        <a class="qq" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=983547216&site=qq&menu=yes" :style="'background-image: url(' + qq + ')'">QQ</a>
      </div>
    </div>
    <div class="accounts registr" v-else-if="types==='register'">
      <h1>ScholarX的博客</h1>
      <h3>欢迎注册</h3>
      <p>账号：<input v-model="rguser" type="text" placeholder="请输入账号"></p>
      <p>密码：<input v-model="rgpass" type="password" placeholder="请输入密码"></p>
      <p>确认：<input v-model="rgrpass" type="password" placeholder="请确认密码"></p>
      <p>{{rgmsg}}</p>
      <p>
        <input @click="registr()" type="button" value="注册">
        <a @click="change()" href="#">已有账号?去登陆</a>
      </p>
      <div class="about">
        <p class="ab">关注博主</p>
        <a class="weibo" href="" :style="'background-image: url(' + weiboimg + ')'">微博</a>
        <a class="qq" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=983547216&site=qq&menu=yes" :style="'background-image: url(' + qq + ')'">QQ</a>
      </div>
    </div>
    <div class="accounts info" v-else>
      <h1>ScholarX的博客</h1>
      <h3><img :src="info.infoImg"></h3>
      <p>昵称：{{info.nickname}}</p>
      <p>性别：{{info.sex}}</p>
      <p>生日：{{info.birthday}}</p>
      <a class="infoa" @click="removetoken()" href="#">退出</a>
      <div class="about">
        <p class="ab">关注我</p>
        <a class="weibo" href="" :style="'background-image: url(' + weiboimg + ')'">微博</a>
        <a class="qq" href="" :style="'background-image: url(' + qq + ')'">QQ</a>
      </div>
    </div>
    <div class="accounts friends">
      <ul v-for="(friend, i) in Mfriends" :key="i">
        <li><a>{{friend.uid}}</a><span>{{friend.nickname}}</span><span>{{friend.groupName}}</span></li>
      </ul>
    </div>
    <div id="chat" v-if="types==='info'">
      123
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      weiboimg: require('./../../assets/weibo.png'),
      qq: require('./../../assets/qq.png'),
      info: {
        infoImg: require('./../../assets/4.jpg'),
        nickname: 'scholar',
        sex: '男',
        birthday: '1994-03-10'
      },
      types: 'login',
      lgUser: '',
      lgPass: '',
      rguser: '',
      rgpass: '',
      rgrpass: '',
      rgmsg: '',
      lgmsg: '',
      Mfriends: ''
    }
  },
  methods: {
    change () {
      if (this.types === 'login') {
        this.types = 'register'
      } else {
        this.types = 'login'
      }
    },
    login () {
      var url = 'http://127.0.0.1:3000/api/1.0/account/login'
      let data = {
        user: this.lgUser,
        pass: this.lgPass
      }
      if (data.user === '' || data.pass === '') {
        alert('账号或密码不能为空！')
      } else {
        fetch(url, {
          body: JSON.stringify(data),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          cache: 'default'
        })
        .then(res => res.json())
        .then(data => {
          if (data.count === 1) {
            alert(data.msg)
          } else {
            this.types = 'info'
            this.userinfo(data.token)
            window.localStorage.setItem('token', data.token)
          }
        })
        .catch(err => console.log(err))
      }
    },
    userinfo (token) {
      let urls = 'http://127.0.0.1:3000/api/1.0/account/info'
      fetch(urls, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': token }),
        mode: 'cors',
        cache: 'default'
      })
        .then(res => res.json())
        .then(data => {
          if (data.code !== 1) {
            this.types = 'info'
            this.info.nickname = data.user
            this.friendList(token)
          } else {
            this.types = 'login'
            this.lgmsg = 'token已过期，请重新登陆!'
          }
        })
        .catch(e => console.log(e))
    },
    removetoken () {
      window.localStorage.removeItem('token')
      this.types = 'login'
    },
    registr () {
      var url = 'http://127.0.0.1:3000/api/1.0/account/register'
      let data = {
        user: this.rguser,
        pass: this.rgpass,
        rpass: this.rgrpass
      }
      fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
      })
      .then(res => res.json())
      .then(data => {
        this.rgmsg = data.msg
      })
      .catch(e => console.log(e))
    },
    friendList (token) {
      let urls = 'http://127.0.0.1:3000/api/1.0/account/displayfriend'
      fetch(urls, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': token }),
        mode: 'cors',
        cache: 'default'
      })
        .then(res => res.json())
        .then(data => {
          this.Mfriends = data.friendList
        })
        .catch(e => console.log(e))
    }
  },
  mounted () {
    // socket.on('connect', function () {
    //   console.log(1)
    // })
    var token = window.localStorage.getItem('token')
    if (token) {
      this.userinfo(token)
    }
  }
}
</script>

<style>
.account {
  width: 100%;
  background-color: #fff;
  padding: 10px;
}

.account .accounts {
  text-align: center;
}

.account .accounts h1 {
  padding: 10px 0;
  color: red;
  font-size: 24px;
  font-weight: 600;
}

.account .accounts h3 {
  padding-bottom: 15px;
  padding-top: 5px;
  font-size: 18px;
  color: coral;
  font-weight: 600;
}

.account .accounts p {
  padding: 10px 0;
}

.account .accounts input[type='button'] {
  border: none;
  width: 60px;
  line-height: 30px;
  background-color: #ff9700;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.account .accounts input[type='button']:hover {
  background-color: #ff0000;
}

.account .accounts p a {
  font-size: 12px;
  position: relative;
  top: 5px;
  left: 5px;
}

.account .accounts p a:hover {
  color: red;
  text-decoration: underline;
}

.account .accounts .about {
  width: 100%;
  border-top: 2px solid red;
  margin-top: 20px;
}

.account .accounts .about .ab {
  text-align: left;
  padding-left: 30px;
}

.account .accounts .about .weibo,
.account .accounts .about .qq {
  display: inline-block;
  width: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 56px;
  margin: 0 20px;
}

.account .accounts .about .weibo:hover,
.account .accounts .about .qq:hover {
  color: red;
}

.account .info h3 img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.account .info p {
  text-align: left;
  padding-left: 100px;
}

.account .info .infoa {
  width: 60px;
  line-height: 30px;
  display: inline-block;
  background-color: #ff9700;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.account .info .infoa:hover {
  background-color: #ff0000;
}

.account .friends {
  padding-top: 20px;
}

#chat {
  width: 600px;
  height: 700px;
  position: fixed;
  top: 14%;
  left: 30%;
  background-color: red;
}
</style>
