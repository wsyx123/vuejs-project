<template>
<div>
  <div id="right-main-title">
    <div id="host-title">
      <span>仪表盘清单</span>
    </div>
    
  </div>
  <div id="right-main-content">
        <div class="favorite">
          <div class="widget-box">
            <div class="widget-body" style="padding: 0px;">
              <div style="background-color: #eee;padding: 18px;">收藏列表</div>
              <div style="text-align: center;color:#ddd;padding: 100px 0px;" v-if="!favorites">暂无收藏</div>
              <div style="padding: 2px 10px;background-color: #e8ecf1;margin-top: 5px;" v-for="(favorite,index) in favorites" v-else>
                <span>{{favorite}}</span>
                <i class="fa fa-star" style="float: right;color: #ff7941;"></i>
              </div>
              
            </div>
          </div>
        </div><!-- /.col -->
        
        <div class="list">

            <div class="panel panel-default">
              <div class="panel-heading">
                <div class="row">
                    <div class="col-md-6" style="text-align:left">
                        <input placeholder="请输入关键词，按回车搜索" style="font-size:14px" type="text" class="form-control">
                    </div>
                    <div class="col-md-6" style="text-align:right">
                        <button  @click="goNew" class="btn btn-default btn-sm" style="font-size:14px;margin-left:10px;border-radius:4px!important;">新建仪表盘&nbsp;
                                <i  class="fa fa-plus" style="color:green"></i>
                        </button>
                        <button  @click="goImport" class="btn btn-default btn-sm" style="margin-left:5px;font-size:14px;border-radius:4px!important;">导入仪表盘&nbsp;
                        <i  class="fa fa-download" style="color:green"></i>
                    </button>
                        <button  class="btn btn-default btn-sm fa fa-th-large" style="padding: 8px 10; border-radius: 4px!important"></button>
                        <button  class="btn btn-default btn-sm fa fa-list" style="padding: 8px 10; border-radius: 4px!important"></button>
                    </div>
                </div>
              </div>
              <div class="panel-body" id="panel-body">
                <div class="row dashboards">
                  <div class="col-md-5 dashboard" v-for="(title,index) in dashboards">
                    <div><h4>{{title.title}}</h4></div>
                    <div>
                      <span class="label label-primary" @click="goView(title.url)">查看</span>
                      <span class="label label-warning">收藏</span>
                      <span class="label label-danger">删除</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div><!-- /.col -->
      
  </div>

</div>

</template>

<script>
import {getAPItoken} from '@/utils/api'
export default {
  name: 'dashboard',
  data () {
    return {
      favorites:null,
      dashboards: null,
    }
  },
  mounted(){
      const oIframe = document.getElementById('panel-body');
      const deviceHeight = document.documentElement.clientHeight;
      console.log(deviceHeight);
      oIframe.style.height = (deviceHeight*0.68) + 'px';
      this.getDashboards();
  },
  methods:{
    goNew:function(){
      this.$router.push({path:'/log/analysis/new'});
    },
    goImport:function(){
      this.$router.push({path:'/log/analysis/import'});
    },
    getDashboards:function(){
      const token = sessionStorage.getItem('token');
      const dashboard = getAPItoken(API.dashboardsAPI,token);
        dashboard.then((data) =>{
          this.dashboards = data;
      })
    },
    goView:function(title){
      this.$router.push({path:'/log/analysis/view',query:{url:title}})
    }
  }
}
</script>

<style scoped>

#host-title{
  margin:17px 10px;
}

.widget-box {
    border: 1px solid #ddd;
    margin: 5px;
}

.favorite{
  position: relative;
  width: 23%;
  float: left;
}

.list{
  position: relative;
  width: 77%;
  float: left;
  margin-top: 5px;
  padding-right: 5px;
}

.dashboards{
  text-align: center;
}
.dashboard{
  margin-left: 50px;
  padding: 10px;
  border:1px solid #ddd;
  background-color: #e2f0ff;
}

.label{
  cursor: pointer;
}
</style>
