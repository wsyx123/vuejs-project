<template>
  <div id="overview">
    <div class="container-fluid">
      <div id="overview-title">
        <div style="display:inline-block;"><i v-on:click="on_off_overview" class="glyphicon glyphicon-chevron-down"></i> 概览</div>
        <div style="display:inline-block;float:right;margin-right:10px;"><img v-bind:src="reportPic"> 导出报表</div>
      </div>
      <div id="myoverview" ref="myoverview">
        <div id="overview-content">
          <div class="col-md-3 col">
            <div id="cluster-left">
              <span>1</span><br>
              <span>集群组件:5</span><br>
              <span>健康:5</span><br>
              <span>异常:0</span>
            </div>
            <div id="cluster-right">
              <img style="width:50px;margin-top:5px;" v-bind:src="clusterPic"/>
              <p style="margin-top:20px;">集群数</p>
            </div>
          </div>
          <div class="col-md-3 col">
            <div id="asset-left">
              <span style="font-size:20px;font-weight:600;">8</span><br>
              <span>在线:5</span><br>
              <span>异常:3</span>
            </div>
            <div id="asset-right">
              <img style="width:50px;margin-top:5px;" v-bind:src="hostPic"/>
              <p style="margin-top:20px;">资产数量</p>
            </div>
          </div>
          <div class="col-md-3 col">
            <div id="application-left">
              <span style="font-size:20px;font-weight:600;">5</span><br>
              <span>健康:5</span><br>
              <span>异常:0</span>
            </div>
            <div id="application-right">
              <img style="width:50px;margin-top:5px;" v-bind:src="appPic"/>
              <p style="margin-top:20px;">应用数量</p>
            </div>
          </div>
          <div class="col-md-3 col">
            <div id="container-left">
              <span style="font-size:20px;font-weight:600;">10</span><br>
              <span>健康:10</span><br>
              <span>异常:0</span>
            </div>
            <div id="container-right">
              <img style="width:50px;margin-top:5px;" v-bind:src="dockerPic"/>
              <p style="margin-top:20px;">容器数量</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clusterPic from '@/assets/image/home/cluster.png'
import hostPic from '@/assets/image/home/host1.png'
import appPic from '@/assets/image/home/app2.png'
import dockerPic from '@/assets/image/home/docker1.png'
import reportPic from '@/assets/image/home/report.png'
export default {
  name: 'overview',
  data () {
    return {
      clusterPic:clusterPic,
      hostPic:hostPic,
      appPic:appPic,
      dockerPic:dockerPic,
      reportPic:reportPic,
    }
  },
  methods:{
    on_off_overview: function(event){
      if($(event.currentTarget).hasClass("glyphicon-chevron-down")){
        this.$refs.myoverview.style.display="none";
        $(event.currentTarget).removeClass("glyphicon-chevron-down");
        $(event.currentTarget).addClass("glyphicon-chevron-right")
        console.log('true')
      }else{
        this.$refs.myoverview.style.display="block";
        $(event.currentTarget).removeClass("glyphicon-chevron-right");
        $(event.currentTarget).addClass("glyphicon-chevron-down")
      }
    }
  }
}
</script>
<style scoped>
i{
  cursor:pointer;
}
#overview{
  margin-top: 50px;
}
#overview-title{
  padding-bottom:3px;
  border-bottom:1px solid #C8C8C8;
}

#overview-content div{
  float:left;
  color:#686868;
  color:white;
}
#cluster-left,#asset-left,#application-left,#container-left{
  padding-top:5px;
  padding-left:10px;
  width:170px;
  min-height: 104px;
}

#cluster-right,#asset-right,#application-right,#container-right{
  padding-top:5px;
  width:100px;
  text-align:center;
}

#cluster-left{
  background-color:#0099ff;
}
#cluster-right{
  background-color:#0099CC;
}
#asset-left{
  background-color:#7D79B6;
}
#asset-right{
  background-color:#7170A9;
}
#application-left{
  background-color:#57C387;
}
#application-right{
  background-color:#54B37B;
}
#container-left{
  background-color:#EFB14E;
}
#container-right{
  background-color:#DBA249;
}
.col{
  margin: 10px 0px;
}
@media (min-width: 1400px) {
	#cluster-left,#asset-left,#application-left,#container-left{
    width: 60%;
    height: 160px;
  }
  #cluster-right,#asset-right,#application-right,#container-right{
    width: 35%;
    height: 160px;
  }
  #overview-content span,#overview-content p {
    font-size:20px;
  }
  #overview-title{
    font-size: 20px;
  }
}
</style>
