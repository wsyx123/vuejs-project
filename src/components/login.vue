<template>
  <div id="main-content"> 
    <div class="login-body  animated fadeInLeft">
        <div class="login-main pr">
          <form  class="login-form">
            <h3> 日志平台 </h3>
            <h5 style="padding-bottom: 10px"> Log Platform </h5>
                    <!-- 账号登陆 -->
            <div id="MobileBox" class="item-box">
              <div class="input-group user-name"> <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input v-model="username"  class="form-control" placeholder="用户名/手机号">
              </div>
              <div class="input-group password"> <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input v-model="password" type="password" class="form-control" placeholder="密码">
              </div>
              <div>
                <span :class="{'errorCls':isError,'successCls':isSuccess}">{{noticeMsg}}</span>
                <span :class="{'errorCls':isError,'successCls':isSuccess}" style="float: right;">
                  <i class="fa" :class="{'fa-check':isOk,'fa-close':isFail}"></i>
                </span>
              </div>
              
              <div class="use-qrcode-a">
                <a class="use-ding"><img src="/static/images/ding.png" width="17" height="17" style="margin-top:-2px"> 钉钉账号登陆</a>
              </div>

              <div class="login_btn_panel">
                <button class=" btn btn-primary btn-block btn-lg" @click="login" type="button">登录</button>
                <div class="check-tips"></div>
              </div>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import {loginAPI,loginAPI1} from '@/utils/api'
export default {
  name: 'App',
  data(){
    return{
      isError: false,
      isSuccess: false,
      isOk: false,
      isFail: false,
      noticeMsg: "",
      username: "",
      password: "",
      data: "",
      screenHeight: document.documentElement.clientHeight//屏幕高度
    }
  },
  mounted(){
      const oIframe = document.getElementById('main-content');
　　　 const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.height = (deviceHeight) + 'px';
  },
  methods:{
    login:function(){
      const username = this.username.trim();
      const password = this.password.trim();
      if(username.length == 0){
        this.isError = true;
        this.isFail = true;
        this.noticeMsg = '请输入用户名';
      }else if(password.length == 0 ){
        this.isError = true;
        this.isFail = true;
        this.noticeMsg = '请输入密码';
      }else{
        const promise = loginAPI1(API.loginAPI,username,password);
        promise.then((data) =>{
          if (data.hasOwnProperty('token')){
            //在sessionStorage 设置token, user, isLogin
            sessionStorage.setItem('token',data['token']);
            sessionStorage.setItem('role',data['role']);
            sessionStorage.setItem('username',username);
            sessionStorage.setItem('isLogin',true);
            this.isSuccess = true;
            this.isOk = true;
            if(this.$route.query.redirect){
              this.$router.push({path: this.$route.query.redirect,params:{ id:'1'}});
            }else{
              this.$router.push({path: '/'});
            }
          }else{
            this.isError = true;
            this.isFail = true;
            this.noticeMsg = data['detail'];
          }
        })
    
      }
    }
  }
}
</script>

<style scoped>
#main-content{
  background:url('/static/images/4.jpg');
  background-size: 100% 100%;
  height: 1000px;
  width: 100%;
  background-repeat: no-repeat;
}

.login-body{padding:20px;position:fixed;z-index:2;left:50%;top:50%;margin-top:-300px;margin-left:-200px;border-radius:5px;width:400px;position:absolute;top:50%;left:50%;background-color:rgba(38,43,54,.9);padding:20px;z-index:300}
.login-body .pr{position:relative}
.login-form{width:370px;margin:0 auto;padding:20px 30px 13px 23px}
.login-form .input-group{margin-bottom:15px;border-radius:4px}
.login-form .input-group .input-group-addon{width:43px;border:none;background:#fff}
.login-form .input-group .input-group-addon i{color:rgba(38,43,54,.9);font-size:24px}
.login-form .input-group>input{border:none;border-left:none;padding:10px 20px;color:grey;height:auto}
.login-form .input-group .btn{background-color:#fff;border:none;font-size:24px;padding:6px 14px}
.login-form h3{font-size:26px;font-weight:500;padding:0;line-height:30px;text-align:center;color:#259dab}
.login-form h5{font-size:20px;font-weight:400;line-height:30px;text-align:center;color:#259dab; border-bottom:1px solid #555; padding-bottom: 10px}
.login-form h5 ul{ margin-top: 8px}
.login-form h5 a{ font-size: 14px; color: #fff}
.login-form .check-tips{color:red;margin-top:10px}
.login-form .item-box{margin-top:18px}
.login-form .item-box .item{border-radius:5px}
.login-form .item{padding:3px 10px 3px 12px;border:1px solid #ececec;background-color:#fff;margin-bottom:10px}
.login-form .focus{border:1px solid #A6E1F3;box-shadow:0 0 12px #BAF7FF}
.login-form .login_btn_panel{margin:20px 0 10px}
.login-form .login_btn_panel button{border:none}
.login-form .login-btn{border-radius:3px}
.login-form .login-btn[disabled]{opacity:.6;filter:alpha(opacity=60);cursor:default;box-shadow:none}
.login-form .login-btn .in{display:none}
.login-form .log-in .in{display:inline-block}
.login-form .log-in .on{display:none}
.icon-loading{display:inline-block;margin-right:5px;width:16px;height:16px;vertical-align:-3px;}
input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #fff inset}
img.verifyimg{border-radius:3px;cursor:pointer;position:absolute;right:0;z-index:99;border-radius:0 4px 4px 0}
.input-group .form-control:not(:first-child):not(:last-child){border-radius:0 4px 4px 0}
.login-form .input-group{width:319px}
.login-main input{box-shadow:none;border:none;border-radius:0 4px 4px 0}

.use-mobile-a{ margin-top: 20px}
.use-qrcode-a{ margin-top: 20px; text-align: right}



#input{
  margin:auto;
}

.errorCls{
  color: red;
}
.successCls{
  color: green;
}
</style>
