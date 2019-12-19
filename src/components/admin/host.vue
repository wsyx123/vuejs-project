<template>
<div>
  <div id="right-main-title">
    <div id="host-title">
      <span>业务系统:</span>
      <select>
        <option>统一认证</option>
        <option>通达信</option>
      </select>
    </div>
    
  </div>
  <div id="right-main-content">
        <div id="business-tree">
          <div class="widget-box" style="min-height: 570px;" id="business">
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
                <td >操作系统</td>
                <td >添加时间</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" ref="mybox"></td>
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

export default {
  name: 'dashboard',
  components:{
    paging,VJstree
  },
  data () {
    return {
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

#host-title{
  margin:17px 10px;
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
  margin: 25px 0px 0px 5px;
}

.favorite{
  position: relative;
  width: 25%;
  float: left;
}

#business-tree{
  position: relative;
  width: 23%;
  float: left;
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
</style>
