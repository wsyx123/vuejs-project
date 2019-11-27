<template>
<div>
  <div id="content-menu">
    <div id="host-title">
      <span>仪表盘清单</span>
    </div>
    
  </div>
  <div id="cluster">
      
        <div class="favorite">
          <div class="widget-box" style="min-height: 600px;" id="business">
            <div class="widget-body" style="padding: 5px;">
              <div style="background-color: #eee;padding: 8px;">收藏列表</div>
              <div style="padding: 2px 10px;background-color: #e8ecf1;margin-top: 5px;">
                <span>通达信功能号分析</span>
                <i class="fa fa-star" style="float: right;color: #ff7941;"></i>
              </div>
              <div style="padding: 2px 10px;background-color: #e8ecf1;margin-top: 5px;">
                <span>一站通延迟分析</span>
                <i class="fa fa-star" style="float: right;color: #ff7941;"></i>
              </div>
            </div>
          </div>
        </div><!-- /.col -->
        
        <div class="list">
          <div class="">
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
              <div class="panel-body" id="panel-body" style="overflow: auto;">
                <div class="row parent"></div>
              </div>
            </div>

          </div>
        </div><!-- /.col -->
      
  </div>

</div>

</template>

<script>

export default {
  name: 'dashboard',
  data () {
    return {
      name:'yangxu'
    }
  },
  mounted(){
      const oIframe = document.getElementById('panel-body');
      const deviceHeight = document.documentElement.clientHeight;
      console.log(deviceHeight);
      oIframe.style.height = (deviceHeight*0.74) + 'px';
  },
  methods:{
    goNew:function(){
      this.$router.push({path:'/log/analysis/new'});
    },
    goImport:function(){
      this.$router.push({path:'/log/analysis/import'});
    }
  }
}
</script>

<style scoped>
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
  border-top: 0px;
  margin-right: 0px;
}

.favorite{
  position: relative;
  width: 25%;
  float: left;
}

.list{
  position: relative;
  padding-left: 10px;
  padding-right: 2px;
  width: 75%;
  float: left;
}

</style>
