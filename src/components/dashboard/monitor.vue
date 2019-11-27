<template>
  <div id="resource">
    <div class="container-fluid">
      <div id="resource-title">
        <div style="display:inline-block;"><i v-on:click="on_off_monitor" class="glyphicon glyphicon-chevron-down"></i> 系统情况</div>
      </div>
      <div id="myresource" ref="mymonitor">
        <div id="resource-content">
          <div class="col-md-4 col">
            <div id="trend"></div>
          </div>
          <div class="col-md-4 col">
            <div id="app-publish"></div>
          </div>

          <div class="col-md-4 col">
            <div id="alert">
              <table class="table">
                <thead>
                  <tr>
                    <th>最新告警--5条</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>15:36 [告警] 主机192.168.10.3 (CPU)发生利用率过高告警</td>
                  </tr>
                  <tr>
                    <td>15:36 [告警] 主机192.168.10.3 (CPU)发生利用率过高告警</td>
                  </tr>
                  <tr>
                    <td>15:36 [告警] 主机192.168.10.3 (CPU)发生利用率过高告警</td>
                  </tr>
                  <tr>
                    <td>15:36 [告警] 主机192.168.10.3 (CPU)发生利用率过高告警</td>
                  </tr>
                  <tr>
                    <td>15:36 [告警] 主机192.168.10.3 (CPU)发生利用率过高告警</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'monitor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    on_off_monitor: function(event){
      if($(event.currentTarget).hasClass("glyphicon-chevron-down")){
        this.$refs.mymonitor.style.display="none";
        $(event.currentTarget).removeClass("glyphicon-chevron-down");
        $(event.currentTarget).addClass("glyphicon-chevron-right")
        console.log('true')
      }else{
        this.$refs.mymonitor.style.display="block";
        $(event.currentTarget).removeClass("glyphicon-chevron-right");
        $(event.currentTarget).addClass("glyphicon-chevron-down")
      }
    },
    setalert (id) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption({
    title: {
          text: '告警趋势',
          x:'center'
      },
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
    },
    setapp (id) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption({
    title: {
          text: '应用发布统计',
          x:'center'
      },
    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: {
			        type: 'value',
			        boundaryGap: [0, 0.01],
			        axisLabel:{formatter:'{value} 次'}
			    },
			    yAxis: {
			        type: 'category',
			        data: ['成功','失败'],
			    },
			    series: [
			        {
			            type: 'bar',
			            itemStyle: {normal: {
			    			        label : {show:true,position:'right',formatter:'{c}'}
			    		         }},
			            data: [
                    {value:60,
                    itemStyle:{normal:{color:'#00CC33'}}
                    },
                    {value:10,
                    itemStyle:{normal:{color:'#FF8888'}}
                    }]
			        },
			    ]
    })
    }
  },
  mounted() {
      this.$nextTick(function() {
      this.setalert('trend')
      }),
      this.$nextTick(function() {
      this.setapp('app-publish')
      })
    }
}
</script>
<style scoped>
i{
  cursor:pointer;
}
#resource-title{
  padding-bottom:3px;
  border-bottom:1px solid #C8C8C8;
}
#resource-content{
  padding:10px 0px;
}
#trend,#app-publish,#alert{
  display:inline-block;
  border:1px solid #DDD;
  text-align:center;
  color:#686868;
  background-color: white;
  box-shadow:0 0 5px #AAAAAA;
  width:375px;
  padding-top:5px;
  height:210px;
}

#alert th{
  font-size:17px;
  font-family:"微软雅黑";
  padding:5px 130px;
  color:black;
}

#alert td{
  padding:5px;
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
@media (min-width: 1400px) {
  #trend,#app-publish,#alert{
    height:250px;
    width:95%;
  }
  #resource-title{
    font-size: 20px;
  }
}

</style>
