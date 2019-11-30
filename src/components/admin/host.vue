<template>
<div>
  <div id="content-menu">
    <div id="host-title">
      <span>业务系统:</span>
      <select>
        <option>统一认证</option>
        <option>通达信</option>
      </select>
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
          <div style="border-bottom: 1px solid #ddd; margin-bottom: 15px;">
            <span style="padding: 10px; border-bottom: 2px solid #3497DA; display: inline-block;">主机属性</span>
            <span style="padding: 10px 50px;">节点属性</span>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <td width="40"><input type="checkbox"></td>
                <td >内网IP</td>
                <td >主机名称</td>
                <td >运维人员</td>
                <td >添加时间</td>
                <td >生命周期</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" ref="mybox"></td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td><input type="checkbox" ref="mybox"></td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /.col -->
        <paging></paging>
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
            "text": "统一认证",
            "icon": "fa fa-skyatlas red",
            "opened": true,
            "children": [
              {
                "text": "tomcat",
                "icon": "fa fa-sitemap yellow",
                "opened": true
              },
              {
                "text": "nginx",
                "icon": "fa fa-sitemap yellow"
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
    }
  },
  mounted() {
  }
}
</script>

<style>
@import './common/table.css';
tr {
    border-top: 0px;
}
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

.widget-box{
  border: 1px solid #ddd;
  margin-right: 5px;
}

select{
  font-size: 15px;
  width: 180px;
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
  padding: 10px;
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
