<template>
<div>
  <div id="right-main-title">
    <div id="host-title">用户管理</div>
    <div class='menu-button'>
      <div class='action-button'><button class="action-button-publish">新增</button></div>
      <div class='action-button'><button class="action-button-scale">编辑</button></div>
      <div class='action-button'><button class="action-button-delete">删除</button></div>
      <div id="store-search">
        <div class="input-group">
          <input type="text" class="form-control">
          <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
        </div>
      </div>
    </div>
  </div>
  <div id="right-main-content">
      <div class="cluster-list">
        <table class="table">
          <thead>
            <tr>
              <td width="40"><input @click="chose_cancel_all" type="checkbox"></td>
              <td>用户名</td>
              <td>邮箱</td>
              <td>激活状态</td>
              <td>用户角色</td>
              <td>加入日期</td>
              <td>最近登录</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users">
              <td><input type="checkbox" ref="mybox"></td>
              <td>{{user.username}}</td>
              <td>{{user.email}}</td>
              <td>
                <span v-if="user.is_active" class="label label-success">true</span>
                <span v-else class="label label-default">false</span>
              </td>
              <td>{{user.is_superuser}}</td>
              <td>{{user.date_joined}}</td>
              <td>{{user.last_login}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <paging :total="total"></paging>
  </div>

</div>

</template>

<script>
import paging from '@/components/common/paging'
import {getAPItoken} from '@/utils/api'
export default {
  components:{
      paging
  },
  data () {
    return {
      users: [],
      total : 0
    }
  },
  methods:{
    chose_cancel_all:function(event){
      let els = (this.$refs.mybox)
      for (let i = 0; i < els.length; i++) {
        if(event.currentTarget.checked){
          els[i].checked = true
        }else{
          els[i].checked = false
        }
      }
    }
  },
  mounted(){
    const token = sessionStorage.getItem('token');
    const bpromise = getAPItoken(API.userAPI,token);
    bpromise.then((data) =>{
      this.users = data;
      this.total = data.length;
    })
  }
}
</script>

<style scoped>
@import '../common/table.css';
a{
  color:#333;
  text-decoration: underline;
}

#content-menu{
  top: 78px;
  height:60px;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
  font-size: 18px;
  z-index: 5;
}
.menu-button,.action-button,#host-title,#store-search{
  display: inline-block;
}
#host-title{
  margin:17px 30px;
  font-size:20px;
  font-weight: 600;
}

.menu-button{
  margin-left: 468px;
}
.action-button{
  margin-right:10px;
}
.action-button button{
  border: none;
  font-size: 16px;
  color: white;
}
.action-button-publish,.action-button-restart,.action-button-scale{
  background-color: #3497DA;
}
.action-button-delete{
  background-color: #f26c4b;
}

#cluster{
  position: fixed;
  top: 138px;
  left: 220px;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
  z-index: 5;
}
.cluster-list{
  margin: 20px;
}

#store-search{
  width:250px;
  vertical-align: middle;
  margin-left: 10px;
}
#store-search input{
  height: 30px;
}

input[type=checkbox]{
    cursor: pointer;
    height: 1em;
    line-height: 1.25em;
    width: 1.25em;
}
</style>
