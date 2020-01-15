<template>
<div>
  <pagetitle></pagetitle>
  <div id="home-content">
    <div>
      <i style="cursor: pointer;" @click="showHidden(1)" class="fa" :class="{'fa-chevron-down':o_down,'fa-chevron-right':o_right}"></i>
      <span style="font-size: 18px;"> 日志概览</span>
      <div id="quickselect">
        <select>
          <option>Today</option>
          <option>Yesterday</option>
        </select>
      </div>
    </div>
    <div :class="{show_div:o_down,hidden_div:o_right}">
      <div class="col-lg-2 col-sm-6">
        <div id="log_num">
          <div>日志总条数</div>
          <div class="total" >{{log_num_total}} 条</div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="chart">
          <div id="log_num_statis" style="height: 300px;"></div>
        </div>
      </div>
      <div class="col-lg-2 col-sm-6">
        <div id="log_size">
          <div>日志总大小</div>
          <div class="total">{{log_size_total}}</div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="chart">
          <div id="log_size_statis" style="height: 300px;"></div>
        </div>
      </div>
      
      <div class="col-lg-2 col-sm-6">
        <div id="log_alert">
          <div>告警总条数</div>
          <div class="total">{{alert_save_total}} 条</div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="chart">
          <div id="alert_level_statis" style="height: 300px;"></div>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12">
        <div class="chart">
          <div id="alert_send_statis" style="height: 300px;"></div>
        </div>
      </div>
    </div>
    
    <div>&nbsp;</div>
    <div>
      <i style="cursor: pointer;" @click="showHidden(2)" class="fa" :class="{'fa-chevron-down':t_down,'fa-chevron-right':t_right}"></i>
      <span style="font-size: 18px;"> TOP5</span>
    </div>
    <div :class="{show_div:t_down,hidden_div:t_right}">
      <div class="col-sm-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h5 class="widget-title">
              <i class="fa fa-signal"></i>
              告警TOP5主机
            </h5>
          </div>

          <div class="panel-body">
            <table class="table">
              <thead>
                <tr>
                  <th>主机</th>
                  <th>业务</th>
                  <th>告警数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>172.16.149.2</td>
                  <td>smart</td>
                  <td>109</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h5 class="widget-title">
              <i class="fa fa-signal"></i>
              日志TOP5主机
            </h5>
          </div>

          <div class="panel-body">
            <table class="table">
              <thead>
                <tr>
                  <th>主机</th>
                  <th>业务</th>
                  <th>日志条数</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>172.16.149.2</td>
                  <td>smart</td>
                  <td>109</td>
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
import {getAPItoken} from '@/utils/api'
export default {
  name: 'Home',
  data () {
    return {
      token: null,
      o_down: true,
      o_right: false,
      t_down: true,
      t_right: false,
      log_legend:null,
      log_num_total: 0,
      log_num_series:null,
      log_size_total: 0,
      log_size_series:null,
      log_num_color: ['#f6da22','#bbe2e8','#6cacde'],
      alert_level_legend:[],
      alert_level_color: ['#5bc0de','#f0ad4e','#CC0000'],
      alert_level_series:[],
      alert_save_total:0,
      alert_send_total:0,
    }
  },
  mounted(){
    this.getHomeData();
  },
  methods:{
    getHomeData(date){
      this.token = sessionStorage.getItem('token');
      const home = getAPItoken(API.homeAPI+'?date='+date,this.token);
      home.then((data) =>{
        this.log_num_legend = data['legend']
        this.log_num_series = data['num_series']
        this.log_num_total = data['num_total']
        this.log_size_series = data['size_series']
        this.log_size_total = data['size_total']
        this.alert_level_legend = data['alert_level_legend']
        this.alert_level_series = data['alert_level_series']
        this.alert_save_total = data['alert_save_total']
        this.alert_send_total = data['alert_send_total']
        this.setalert('log_num_statis',this.log_num_color,'日志条数统计',this.log_legend,this.log_num_series);
        this.setalert('log_size_statis',this.log_num_color,'日志大小统计',this.log_legend,this.log_size_series);
        this.setalert('alert_level_statis',this.alert_level_color,'告警级别统计',this.alert_level_legend,this.alert_level_series);
        this.setalert_send('alert_send_statis',this.alert_send_total);
      })
    },
    showHidden(id){
      if(id === 1){
        if(this.o_down){
          this.o_right = true;
          this.o_down = false;
        }else{
          this.o_right = false;
          this.o_down = true;
        }
      }else{
        if(this.t_down){
          this.t_right = true;
          this.t_down = false;
        }else{
          this.t_right = false;
          this.t_down = true;
        }
      }
    },
    setalert(id,color,title,legend,series){
      this.chart = echarts.init(document.getElementById(id))
      this.chart.setOption({
        title: {
        text: title,
        //subtext: '虚构数据',
        left: 'center'
        },
        tooltip: {
          trigger: 'item',
          //formatter: '{a} <br/>{b} : {c} ({d}%)'
          formatter: '{b} : {c} ({d}%)'
        },
        color: color,
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            //center: ['50%', '50%'],
            selectedMode: 'single',
            data: series,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    setalert_send(id,value){
      this.chart = echarts.init(document.getElementById(id))
      this.chart.setOption({
        title: {
          text: '已发送告警条数',
          //subtext: '虚构数据',
          left: 'center'
        },
        tooltip: {
        formatter: '{a} <br/>{b} : {c}'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                min: 0,
                max: 900,
                center: ['50%', '55%'],
                detail: {formatter: '{value}'},
                data: [{value: value}]
            }
        ]
      })
    }
  }
}
</script>
<style scoped>
[class*="col-"]{
  padding: 5px;
}
#quickselect{
  float: right;
  margin-right: 5px;
}
.show_div{
  display: block;
}
.hidden_div{
  display: none;
}

#log_num,#log_size,#log_alert{
  text-align: center;
  color:white;
  height: 300px;
}

.total{
  padding: 50% 0px;
  font-size: 36px;
}

#log_num{
  background-color: #993399;
}

#log_size{
  background-color: #66FF66;
}

#log_alert{
  background-color: #FFCC99;
}
.chart{
  border:1px solid #ddd;
}

</style>
