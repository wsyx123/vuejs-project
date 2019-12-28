<template>
<div>
  <div id="right-main-title">
    <div id="host-title">
      <span>业务系统:</span>
      <select v-model="businessID" @change="selectVal">
        <option v-for="(business,index) in businesses" v-bind:value="business.id">{{business.name}}</option>
      </select>
    </div>
    
  </div>
  <div id="right-main-content">
    <div id="business-tree">
      <div class="widget-box">
        <div style="margin: 5px; ">
          <input type="text" name="" placeholder="请输入主机或组件名称" @keyup.13="inputKeyUp" v-model="searchText" style="width: 100%;">
        </div>
        <div class="widget-body">
          <div style="padding: 0 10px;">
            <v-jstree :data="tree" draggable ref="tree"   @item-click="itemClick"></v-jstree>
          </div>
        </div>
      </div>
    </div><!-- /.col -->
    
    <div class="component">
      <div class="widget-box">
        <div class="widget-body">
          <div class="widget-main">
            <div style="border-bottom: 1px solid #ddd; margin-bottom: 15px;">
              <span style="padding: 10px; display: inline-block;">{{component}}</span>
              <span class="label label-danger" style="display:inline-block;float:right;margin:10px;">批量删除</span>
              <span class="label label-primary" style="display:inline-block;float:right;margin:10px;">添加字段</span>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <td width="40"><input type="checkbox"></td>
                  <td>字段名称</td>
                  <td>字段类型</td>
                  <td>字段说明</td>
                  <td>启用</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(field,index) in fields">
                  <td><input type="checkbox" ref="mybox"></td>
                  <td>{{field.name}}</td>
                  <td v-if='field.type ==1'>整型</td>
                  <td v-else>字符串</td>
                  <td>{{field.description}}</td>
                  <td>
                    <input type="checkbox" class="switch_1" checked>
                  </td>
                  <td>
                    <span class="label label-primary">编辑</span>
                    <span class="label label-danger">删除</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <paging></paging>
    </div><!-- /.col -->
  </div>
</div>

</template>

<script>
import VJstree from 'vue-jstree'
import echarts from 'echarts'
import paging from '@/components/common/paging'
import {getAPItoken} from '@/utils/api'
export default {
  name: 'dashboard',
  components:{
    paging,VJstree
  },
  data () {
    return {
      searchText: '',
      component: '业务默认字段',
      businesses: null,
      businessID: null,
      tree: [],
      fields: null,
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
      if (node.model.node == 'business'){
        this.component = '业务默认字段';
        this.getBusinessCommon();
      }else{
        this.component = node.model.text+'字段定义';
        this.getComponentFields(node.model.id);
      }
      const selected = document.getElementsByClassName("tree-selected");
      if(selected.length == 1){
        selected[0].className='tree-anchor';
      }
      
    },
    selectVal(){
      const token = sessionStorage.getItem('token');
      const abc = getAPItoken(API.adminbusinessAPI+this.businessID+'/',token);
        abc.then((data) =>{
          this.tree = data;
      })
    },
    getBusinessCommon(){
      const bpromise = getAPItoken(API.structureAPI+'?business='+this.businessID+'&default=1',this.token);
      bpromise.then((data) => {
        this.fields = data;
      })
    },
    getComponentFields(componentID){
      const bpromise = getAPItoken(API.structureAPI+'?business='+this.businessID+'&component='+componentID,this.token);
      bpromise.then((data) => {
        console.log(data);
        this.fields = data;
      })
    }
  },
  mounted() {
  },
  created(){
    this.token = sessionStorage.getItem('token');
    //获取业务列表
    const bpromise = getAPItoken(API.adminbusinessAPI,this.token);
    bpromise.then((data) =>{
      this.businesses = data;
      this.businessID = this.businesses[0].id;
      //获取某一业务的tree
      const abc = getAPItoken(API.adminbusinessAPI+this.businessID+'/',this.token);
      abc.then((data) =>{
        this.tree = data;
      })
      this.getBusinessCommon();
    });
  }
}
</script>

<style>
@import '../common/table.css';
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

.component{
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

input[type="checkbox"].switch_1 {
  /*font-size: 30px;*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3.0em;
  height: 1.5em;
  background: 
  #ddd;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}
input[type="checkbox"].switch_1::after {
  position: absolute;
  content: "";
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: 
  #fff;
  -webkit-box-shadow: 0 0 .25em rgba(0,0,0,.3);
  box-shadow: 0 0 .25em
  rgba(0,0,0,.3);
  -webkit-transform: scale(.7);
  transform: scale(.7);
  left: 0;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}
input[type="checkbox"].switch_1:checked {
    background: #0ebeff;
}
input[type="checkbox"].switch_1:checked::after {
    left: calc(100% - 1.5em);
}
</style>
