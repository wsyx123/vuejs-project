<template>
  <div id="resource">
    <div class="container-fluid">
      <div id="resource-title">
        <div style="display:inline-block;"><i v-on:click="on_off_resource" class="glyphicon glyphicon-chevron-down"></i> 资源情况</div>
      </div>
      <div id="resource-content" ref="myresource">
        <div class="col-md-4 col">
          <div id="cpu"></div>
        </div>
        <div class="col-md-4 col">
          <div id="memory"></div>
        </div>
        <div class="col-md-4 col">
          <div id="disk"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'resource',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    on_off_resource: function(event){
      if($(event.currentTarget).hasClass("glyphicon-chevron-down")){
        this.$refs.myresource.style.display="none";
        $(event.currentTarget).removeClass("glyphicon-chevron-down");
        $(event.currentTarget).addClass("glyphicon-chevron-right")
        console.log('true')
      }else{
        this.$refs.myresource.style.display="block";
        $(event.currentTarget).removeClass("glyphicon-chevron-right");
        $(event.currentTarget).addClass("glyphicon-chevron-down")
      }
    },
    setcpu (id) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption({
    title : {
        text: 'CPU资源(核)',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['#0099FF','#DDD'],
    series : [
        {
            name: 'CPU',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:32, name:'总量'},
                {value:10, name:'使用'}
            ],
            itemStyle: {
              normal: {label:{
              show:true,
              formatter:'{b} : {c} ({d}%)'
              },
              labelLine:{show:true}},
                emphasis: {
                    label: {
                        show: true,
                        formatter: "{b}\n{c} ({d}%)",
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    })
    },
    setmemory (id) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption({
    title : {
        text: '内存资源(G)',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['#33CC99','#DDD'],
    series : [
        {
            name: 'memory',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:128, name:'总量'},
                {value:50, name:'使用'}
            ],
            itemStyle: {
              normal: {label:{
              show:true,
              formatter:'{b} : {c} ({d}%)'
              },
              labelLine:{show:true}},
                emphasis: {
                    label: {
                        show: true,
                        formatter: "{b}\n{c} ({d}%)",
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    })
    },
    setdisk (id) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption({
    title : {
        text: '存储资源(G)',
        x:'center'
    },
    color: ['#00CC33','#DDD'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series : [
        {
            name: 'disk',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:820, name:'可用'},
                {value:100, name:'使用'}
            ],
            itemStyle: {
              normal: {label:{
              show:true,
              formatter:'{b} : {c} ({d}%)'
              },
              labelLine:{show:true}},
                emphasis: {
                    label: {
                        show: true,
                        formatter: "{b}\n{c} ({d}%)",
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    })
    }
  },
  mounted() {
      this.$nextTick(function() {
      this.setcpu('cpu')
      }),
      this.$nextTick(function() {
      this.setmemory('memory')
      }),
      this.$nextTick(function() {
      this.setdisk('disk')
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

#resource-content div{
  float:left;
  text-align:center;
  color:#686868;
  background-color: white;
}
#cpu,#memory,#disk{
  height:140px;
  width:380px;
  padding-top:5px;
  border:1px solid 	#DDDDDD;
  box-shadow:0 0 5px 	#AAAAAA;
}
.col{
  margin: 10px 0px;
}
@media (min-width: 1400px) {
  #cpu,#memory,#disk{
    height:180px;
    width:95%;
  }
  #resource-title{
    font-size: 20px;
  }
}
</style>
