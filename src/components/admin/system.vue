<template>
<div>
  <div id="right-main-title">
    <div id="host-title">系统设置</div>
  </div>
  <div id="right-main-content">

      <div class="panel">
        <div class="panel-heading">
          <span class="title">elasticsearch集群信息</span>
          <button class="add">刷新</button>
          <button class="add">添加主机</button>
        </div>
        <div class="panel-body" id="cluster" v-for="(cluster,index) in clusters">
          <div class="cluster-left">
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-4">集群名称:</label>
                <div class="col-sm-8">
                  <span>{{cluster.name}}</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4">版本:</label>
                <div class="col-sm-8">
                  <span>{{cluster.version}}</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4">集群健康状态:</label>
                <div class="col-sm-8">
                  <span class="label label-danger" v-if="cluster.health==1">red</span>
                  <span class="label label-warning" v-if="cluster.health==2">yellow</span>
                  <span class="label label-success" v-if="cluster.health==3">green</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4">集群master:</label>
                <div class="col-sm-8">
                  <span>{{cluster.master}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cluster-host">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>主机</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{cluster.master}}</td>
                  <td><span class="label label-danger">删除</span></td>
                </tr>
                <tr v-for="(host,index) in cluster.hosts">
                  <td>{{host}}</td>
                  <td><span class="label label-danger">删除</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="cluster-right">
            <span>启用:</span>
            <input type="radio" name="enable" v-if="cluster.is_enabled" checked>
            <input type="radio" name="enable" v-else>
          </div>     
        </div>
      </div>


      <div class="panel">
        <div class="panel-heading">
          <span class="title">业务与index关系</span>
        </div>
        <div class="panel-body">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-6">一个业务一个index</label>
              <div class="col-sm-4">
                <input type="checkbox" v-if="index.one_to_one" checked>
                <input type="checkbox" v-else>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-6">索引后缀</label>
              <div class="col-sm-4">
                <span>{{index.index_suffix}}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-6">索引生成周期</label>
              <div class="col-sm-4">
                <span v-if="index.index_period==1">daily</span>
                <span v-if="index.index_period==2">monthly</span>
                <span v-if="index.index_period==3">yearly</span>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <span>备注: 当多个业务数据存放在一个index时，在日志搜索时business应该作为查询条件</span>
              </div>
            </div>
            
          </div>          
        </div>
      </div>
  </div>

</div>

</template>

<script>

import {getAPItoken} from '@/utils/api'
export default {
  data () {
    return {
      clusters:null,
      index:null
    }
  },
  methods:{
    getIndex(){
      this.token = sessionStorage.getItem('token');
      const ipromise = getAPItoken(API.indexAPI,this.token);
      ipromise.then((data) =>{
        this.index = data[0]
      })
    },
    getClusters(){
      this.token = sessionStorage.getItem('token');
      const cpromise = getAPItoken(API.clusterAPI,this.token);
      cpromise.then((data) =>{
        this.clusters = data
      })
    }
    
  },
  mounted(){
    this.getIndex();
    this.getClusters();
  }
}
</script>

<style scoped>

#host-title{
  margin:17px 30px;
  font-size:20px;
  font-weight: 600;
}

.panel{
  border-color: #dcdcdc;
  margin:10px;
}

.panel-heading{
  border: 1px solid #e6e6e6;
  background-color: #F8F8F8;
}

.panel-body{
  margin: 5px;
}

#cluster{
  border:1px solid #dcdcdc;
}

.title{
  font-size: 18px;
}

.add{
  float: right;
}
.cluster-left{
  width: 40%;
  float: left;
}
.cluster-host{
  width: 40%;
  float: left;
}
.cluster-right{
  padding-top:5%;
  width: 20%;
  float: left;
  text-align: center;
}
</style>
