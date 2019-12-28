<template>
<div>
  <div class="alert alert-danger alert-dismissible" :class="{'hidden':isHidden}" id="alert">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>错误!</strong> {{errmsg}}。
  </div>
  <div id="right-main-title">
    <div id="host-title">
      <span>业务系统:</span>
      <select v-model="business" @change="selectBusiness">
        <option v-for="(business,index) in businesses" v-bind:value="business.id">{{business.name}}</option>
      </select>
      <div id="checktime">
        <label style="cursor: pointer;margin-right: 10px;" @click="quickSelectDisplay">{{time}}</label>
        <i class="fa fa-refresh" aria-hidden="true" @click="updateLogData"></i>
      </div>
    </div>
  </div>
  <div id="quickselect" ref="quickselect">
    <div class="row">
      <div class="col-sm-3" style="padding: 5% 0px;text-align: center;">
        <div><span id="quickselect-button">快速选择</span></div>
        <div style="margin-top: 30%;"><span id="manual-button">自定义</span></div>
      </div>
      <dir class="col-sm-9">
        <div id="quickselect-body">
          <div class="row">
            <div class="col-sm-4">
              <ul class="">
                <li v-for="(quick,index) in quick1">
                  <a @click="quickSelectEvent($event)">{{quick}}</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-4">
              <ul>
                <li v-for="(quick,index) in quick2">
                  <a @click="quickSelectEvent($event)">{{quick}}</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-4">
              <ul>
                <li v-for="(quick,index) in quick3">
                  <a @click="quickSelectEvent($event)">{{quick}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="manual-body">
          
        </div>
      </dir>
    </div>
  </div>
  <div id="right-main-content">
      <div id="business-tree">
        <div class="widget-box">
          <div style="margin: 5px;">
            <input type="text" name="" placeholder="请输入主机或组件名称" @keyup.13="inputKeyUp" v-model="nodeSearchText" style="width: 100%;">
          </div>
          <div class="widget-body">
            <div style="padding: 0 10px;">
              <v-jstree :data="tree" draggable ref="tree"   @item-click="nodeSearchFunc"></v-jstree>
            </div>
          </div>
        </div>
      </div><!-- /.col -->
      
      <div class="list">
        <div class="widget-box">
          <div class="widget-body">
            <div class="widget-main">
              <div style="margin: 5px 12px 0px 12px;">
                <ul class="nav navbar-nav">
                  <li class="dropdown">
                    <button  class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" >
                      日志路径
                      <b class="caret"></b>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <label class="control-label no-padding-right">
                          &nbsp<input type="checkbox" class="ace ace-checkbox"><span class="lbl">&nbsp</span>
                        </label>
                      </li>
                    </ul>
                  </li>
                </ul>
                <input type="text" v-model="logSearchInput" placeholder="关键字查询" style="width: 40%;margin-left: 40px;">
                <button class="btn btn-sm btn-primary" @click="strSearchFunc">查询</button>
                <button class="btn btn-sm btn-primary">下载</button>
                <span style="margin-left: 20px;">interval</span>
                <select v-model="interval">
                  <option value="a">Auto</option>
                  <option value="s">Second</option>
                  <option value="m">Minute</option>
                  <option value="h">Hourly</option>
                  <option value="d">Daily</option>
                  <option value="w">Weekly</option>
                  <option value="M">Monthly</option>
                  <option value="y">Yearly</option>
                </select>
              </div>
              <div id="logStatis" style="width: 99%;height: 200px;"></div>
              <div style="margin: 12px;" >
                <ul class="nav">
                  <li class="dropdown">
                    <a  class="dropdown-toggle" data-toggle="dropdown" >
                      日志显示
                      <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                      <li v-for="(key,index) in logkey" >
                        <label class="control-label no-padding-right">
                          &nbsp<input type="checkbox" class="ace ace-checkbox" @click="selectKey(key,$event)" :checked="displayKey(key)">&nbsp<span class="lbl">{{key}}</span>
                        </label>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div style="margin: 12px;">
                <table class="table">
                  <thead>
                    <tr>
                      <th v-for="(key,index) in displayKeyList">{{key}}</th>
                    </tr>
                  </thead>
                  <tbody style="font-family: 'Roboto Mono', Consolas, Menlo, Courier, monospace;font-size: 12.0px;">
                    <tr v-for="(log,index) in loglist" >
                      <td v-for="(key,index) in displayKeyList" v-html="log[key]"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <label id="page">每页显示
                  <select v-model="size">
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                  /共{{logtotal}}条
                </label>
                <ul class="pagination pull-right">
                    <li><a>首页</a></li>
                    <li><a>&laquo;上一页</a></li>
                    <li><a>1</a></li>
                    <li><a>下一页&raquo;</a></li>
                    <li><a>尾页</a></li>
                </ul>
              </div>
            </div><!-- widget-main-->
          </div>
        </div>

      </div><!-- /.col -->
  </div>

</div>

</template>

<script>
import VJstree from 'vue-jstree'
import echarts from 'echarts'
import paging from './common/paging'
import {getAPItoken,postAPItoken} from '@/utils/api'
export default {
  name: 'dashboard',
  components:{
    paging,VJstree
  },
  data () {
    return {
      isHidden: true,
      errmsg: null,
      token: null,
      chart: null,
      nodeSearchText: null,
      logSearchInput: null,
      tree: [],
      businesses: [],
      business: null,
      display: false,
      time: 'Last 15 minutes',
      quick1 : ['Last 5 minutes','Last 15 minutes','Last 30 minutes','Last 1 hour','Last 4 hours','Last 12 hours','Last 24 hours'],
      quick2 : ['Today','Yesterday','This week','This month','This year'],
      quick3 : ['Last 7 days','Last 15 days','Last 30 days','Last 60 days','Last 1 year'],
      loglist : [],
      logkey : [],
      logtotal: 0,
      xdata: [],
      statisdata: [],
      size: 10,
      interval: 'a',
      page:1,
      nodeKey:'business', // business,component,host
      nodeVal:null,
      nodeParent: null,
      displayKeyList: []
    }
  },
  methods: {
    recurseNode: function(node){
        if (node.$parent.data instanceof Array){
            console.log(); 
        } else{
            this.recurseNode(node.$parent);
        }
        this.setNodeOpened(node);
    },
    inputKeyUp: function () {
        var text = this.nodeSearchText
        let that = this;
        const patt = new RegExp(text);
        this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, function (node) {
        if (text !== '' && node.model !== undefined) {
            const str = node.model.text
            if (patt.test(str)) {
                that.recurseNode(node);
                //recurseNode(node);
                node.$el.querySelector('.tree-anchor').style.color = 'red'
            } else {
                node.$el.querySelector('.tree-anchor').style.color = '#000'
            } // or other operations
        } else {
            node.$el.querySelector('.tree-anchor').style.color = '#000'
        }
      })
    },
    setNodeOpened: function(node){
      if (node.$parent.data.opened){
         console.log("trr");
      } else{
         node.$parent.data.opened = true;
      }
    },
    setalert (id,xdata,statisdata) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption({
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : xdata,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'日志条数',
            type:'bar',
            barWidth: '60%',
            itemStyle: {normal: {
            label : {show:true,position:'top',formatter:'{c}'}
            }},
            data: statisdata
        }
    ]
    })
    },
    selectBusiness(){
      const token = sessionStorage.getItem('token');
      const abc = getAPItoken(API.businessAPI+this.business+'/',token);
        abc.then((data) =>{
          this.tree = data;
      })
    },
    quickSelectDisplay(){
      if(this.display){
        this.$refs.quickselect.style.display = 'none';
        this.display = false;
      }else{
        this.$refs.quickselect.style.display = 'block';
        this.display = true;
      }
      
    },
    quickSelectEvent(event){
      this.time = event.currentTarget.innerHTML;
      this.$refs.quickselect.style.display = 'none';
      this.display = false;
    },
    displayKey(key){
      if(this.displayKeyList.indexOf(key) != -1){
        return true;
      }else{
        return false;
      }
    },
    selectKey(key,event){
      if(event.currentTarget.checked){
        this.displayKeyList.push(key);
      }else{
        const index = this.displayKeyList.indexOf(key);
        if(index != -1){
          this.displayKeyList.splice(index,1);
        }
      }
    },
    resizeHandler() {
      this.chart.resize()
    },
    // 以下是日志相关函数

    generatePostdata(){ // 公共函数 1, 生成post data
      //1 提供搜索的索引(业务系统)
      //2 提供搜索时间
      //3 提供搜索条件(右侧树的 component或主机，输入框的关键字)
      //4 聚合的interval
      //5 返回显示的条数: size
      //6 当前页:
      //7 第几页: from
      return {
        'business':this.business,
        'nodeParent': this.nodeParent,
        'nodeKey': this.nodeKey,
        'nodeVal': this.nodeVal,
        'time': this.time,
        'searchStr': this.logSearchInput,
        'interval': this.interval,
        'size': this.size,
        'page': this.page
      }
    },
    setkeyDisplay(){
      for(let i in this.logkey){
        const key = this.logkey[i];
        if(key.indexOf('message') != -1 || key.indexOf('time') != -1 ){
          if(this.displayKeyList.indexOf(key) == -1){
            this.displayKeyList.push(key);
          }
        }
      }
    },
    cleanData(){
      this.loglist = [];
      this.logkey = [];
      this.logtotal = 0;
      this.xdata = [];
      this.statisdata = [];
      this.setalert('logStatis',this.xdata,this.statisdata);
    },
    logSearchFunc(){ // 公共函数 1, 请求, 数据渲染
        this.cleanData();
        const postdata = this.generatePostdata();
        const spromise = postAPItoken(API.getlogAPI,postdata,this.token);
        spromise.then((data) =>{
          if(data['status']){
            this.loglist = data['logdata'];
            this.logkey = data['logkey'];
            this.setkeyDisplay();
            this.logtotal = data['logtotal']['count'];
            this.xdata = data['echart']['xdata'];
            this.statisdata = data['echart']['statisdata'];
            this.setalert('logStatis',this.xdata,this.statisdata);
          }else{
            this.isHidden = false;
            this.errmsg = data['msg'];
          }
        })
    },
    nodeSearchFunc (node) { // 点击业务树的节点, 使用此节点作为日志查询条件
      const selected = document.getElementsByClassName("tree-selected");
      if(selected.length == 1){
        selected[0].className='tree-anchor';
      }
      this.nodeKey = node.model.node;
      if(this.nodeKey === 'host'){
        this.nodeParent = node.$parent.model.text;
      }
      this.nodeVal = node.model.text;
      this.logSearchFunc();
    },
    strSearchFunc(){
      if(this.logSearchInput){
        this.logSearchFunc();
      }
    },
    updateLogData(){
      this.logSearchFunc();
    }
    
  },
  created(){
    this.token = sessionStorage.getItem('token');
    //获取业务列表
    const bpromise = getAPItoken(API.businessAPI,this.token);
    bpromise.then((data) =>{
      this.businesses = data;
      this.business = this.businesses[0].id;
      //获取某一业务的tree
      const abc = getAPItoken(API.businessAPI+this.business+'/',this.token);
      abc.then((data) =>{
        this.tree = data;
        this.logSearchFunc();
      })
    });
  },
  mounted() {
      window.addEventListener('resize', this.resizeHandler);
  },
  watch:{
    time(val){
      this.logSearchFunc();
    },
    interval(val){
      this.logSearchFunc();
    },
    size(val){
      this.logSearchFunc();
    }
  }
}
</script>

<style>
@import './common/table.css';
#alert{
  position: fixed;
  width: 45%;
  right: 1px;
  top: 72px;
  z-index: 999;
}
#host-title{
  margin:17px 10px;
}

#checktime{
  font-size: 15px;
  float: right;
  margin-right: 20px;
}
#checktime i{
  color: #137be0;
  cursor: pointer;
}

#quickselect{
  position: fixed;
  top: 130px;
  background-color: #fff;
  display: none;
  z-index: 999;
  left: 49%;
  width: 50%;
  border: 1px solid #dddd;
  margin-right: 5px;
}

#business-tree{
  position: relative;
  width: 23%;
  float: left;
}


.widget-box{
  border: 1px solid #ddd;
  margin: 5px;
}

select{
  font-size: 15px;
  width: 180px;
}

#page{
  display: inline-block;
  margin: 25px 0px 0px 5px;
}


.list{
  position: relative;
  width: 77%;
  float: left;
}
.red{
  color: #f1430f;
}
.yellow{
  color: #F1C40F;
}
.blue{
  color: #3a88ff;
}
li{
  list-style-type:none;
}
#quickselect-body{
  cursor: pointer;
}
</style>
