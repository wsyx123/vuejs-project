<template>
<div>
  <div id="content-menu">
    <div id="host-title">
      <span>业务系统:</span>
      <select>
        <option>统一认证</option>
        <option>通达信</option>
      </select>
      <div id="checktime">
      This week
      <i class="fa fa-refresh" aria-hidden="true"></i>
    </div>
    </div>
    
  </div>
  <div id="cluster">
        <div class="favorite">
          <div class="widget-box" style="min-height: 620px;" id="business">
            <div style="margin: 5px; ">
              <input type="text" name="" placeholder="请输入主机或组件名称" @keyup.13="inputKeyUp" v-model="searchText" style="width: 100%;">
            </div>
            <div class="widget-body">
              <div style="padding: 0 10px;">
                <v-jstree :data="data" draggable ref="tree"   @item-click="itemClick"></v-jstree>
              </div>
            </div>
          </div>
        </div><!-- /.col -->
        
        <div class="list">
          <div class="widget-box" style="min-height: 620px;" id="logDetail">
            <div class="widget-body">
              <div class="widget-main">
                <div style="margin: 5px 12px 0px 12px;" id="search">
                  <ul class="nav navbar-nav">
                    <li class="dropdown">
                      <button  class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" >
                        日志路径
                        <b class="caret"></b>
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <label class="control-label no-padding-right">
                            &nbsp<input type="checkbox" class="ace ace-checkbox"><span class="lbl">&nbsp/var/log/message</span>
                          </label>
                        </li>
                          
                        <li>
                          <label class="control-label no-padding-right">
                            &nbsp<input type="checkbox" class="ace ace-checkbox"><span class="lbl">&nbsp/var/log/message</span>
                          </label>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <input type="text" name="" placeholder="关键字查询" style="width: 40%;margin-left: 40px;">
                  <button class="btn btn-sm btn-primary">查询</button>
                  <button class="btn btn-sm btn-primary">下载</button>
                </div>
                <div id="logStatis" style="width: 99%;height: 200px;"></div>
                <div style="margin: 12px;" >
                  <ul class="nav">
                    <li class="dropdown">
                      <a  class="dropdown-toggle" data-toggle="dropdown" >
                        原始日志
                        <b class="caret"></b>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <label class="control-label no-padding-right">
                            &nbsp<input type="checkbox" class="ace ace-checkbox"><span class="lbl">message</span>
                          </label>
                        </li>
                          
                        <li>
                          <label class="control-label no-padding-right">
                            &nbsp<input type="checkbox" class="ace ace-checkbox"><span class="lbl">source</span>
                          </label>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div style="margin: 12px;" id="displayMsg">
                  <table>
                    <tr>
                      <td><i class="fa fa-caret-right" aria-hidden="true"></i><td>
                      <td>
                        <div>2019-09-01 02:20:21</div>
                        <div>hostname</div>
                        <div>/var/log/message/sldjlsdjflwojoewfljdsjfjalllllllllllllllllll/</div>
                      </td>
                      <td>message,sljdfl,jls2l slfjls2903933939989323930q4lldl238ldflasfjladjfljfow9u03u40103023407 </td>
                    </tr>
                    <tr>
                      <td><i class="fa fa-caret-right" aria-hidden="true"></i><td>
                      <td>
                        <div>2019-09-01 02:20:21</div>
                        <div>hostname</div>
                        <div>/var/log/message</div>
                      </td>
                      <td>message,sljdfl,jls2l slfjls2903<em>93393998932</em>3930q4lldl238ldflasfjladjfljfow9u03u40103023407 </td>
                    </tr>
                    <tr>
                      <td><i class="fa fa-caret-right" aria-hidden="true"></i><td>
                      <td>
                        <div>2019-09-01 02:20:21</div>
                        <div>hostname</div>
                        <div>/var/log/message</div>
                      </td>
                      <td>message,sljdfl,jls2l slfjls2903933939989323930q4lldl238ldflasfjladjfljfow9u03u40103023407 </td>
                    </tr>
                  </table>
                </div>
                <div>
                  <label id="page">每页显示
                    <select>
                      <option>5</option>
                      <option>10</option>
                      <option>20</option>
                    </select>
                    /共190条
                  </label>
                  <ul class="pagination pull-right">
                    <li><a href="#">首页</a></li>
                      <li><a href="#">&laquo;上一页</a></li>
                      <li><a href="#">1</a></li>
                      <li><a href="#">下一页&raquo;</a></li>
                      <li><a href="#">尾页</a></li>
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
let clusters = [
{ID:'web01',name:'DBM前端',createtime:'2018-05-01 14:36:49',nodes:'3',status:'running'},
{ID:'Portal01',name:'Portal门户',createtime:'2018-05-01 14:36:49',nodes:'3',status:'unknown'},
        ]
export default {
  name: 'dashboard',
  components:{
    paging,VJstree
  },
  data () {
    return {
      name:'yangxu',
      clusters:clusters,
      searchText: '',
      data: [
          {
            "text": "统一认证 (2)",
            "icon": "fa fa-skyatlas red",
            "opened": true,
            "children": [
              {
                "text": "tomcat (1)",
                "icon": "fa fa-sitemap yellow",
                "opened": true,
                "children": [
                  {'id':'1','text':'192.168.10.2','icon':'fa fa-television blue'},
                  {'id':'2','text':'192.168.10.3','icon':'fa fa-television blue'}
                ]
              },
              {
                "text": "nginx (1)",
                "icon": "fa fa-sitemap yellow",
                "children": [
                  {'id':'1','text':'192.168.10.2','icon':'fa fa-television red'}
                ]
              }
            ]
          }
        ]
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
        var text = this.searchText
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
    itemClick (node) {
      console.log(node.model.text + ' clicked !')
    },
    setalert (id) {
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
            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
            name:'告警',
            type:'bar',
            barWidth: '60%',
            itemStyle: {normal: {
            label : {show:true,position:'top',formatter:'{c}'}
            }},
            data:[1, 2, 0, 4, 9, 3, 2]
        }
    ]
    })
    }
  },
  mounted() {
      this.$nextTick(function() {
      this.setalert('logStatis')
      })
    }
}
</script>

<style>
@import './common/table.css';
#content-menu{
  position: fixed;
  top: 78px;
  height:60px;
  left: 220px;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
  font-size: 18px;
  z-index: 5;
}

#host-title{
  margin:17px 10px;
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

#logDetail{
  height: 500px;
  overflow: scroll;
}
tr{
  border-top: 1px solid #ddd;
}

.widget-box{
  border: 1px solid #ddd;
  margin-right: 5px;
}

select{
  font-size: 15px;
  width: 180px;
}
#checktime{
  font-size: 15px;
  float: right;
  margin-right: 20px;
}
#checktime i{
  color: #137be0;
}
#page{
  margin: 25px 0px 0px 5px;
}
em{
  color: red;
}
.favorite{
  position: relative;
  width: 25%;
  float: left;
}

.list{
  position: relative;
  padding-left: 10px;
  width: 75%;
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
</style>
