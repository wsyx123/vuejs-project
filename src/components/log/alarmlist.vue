<template>
<div>
  <div id="right-main-title">
    <div id="host-title">
      <span>业务系统:</span>
      <select v-model="business">
        <option v-for="(business,index) in businesses" v-bind:value="business.id">{{business.name}}</option>
      </select>
    </div>
  </div>
  <div id="right-main-content">
      <div class="cluster-list">
        <table class="table">
          <thead>
            <tr>
              <td><input @click="chose_cancel_all" type="checkbox"></td>
              <td>规则ID</td>
              <td>业务</td>
              <td>主机</td>
              <td>告警标题</td>
              <td>级别</td>
              <td>处理时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(alert,index) in alerts">
              <td><input type="checkbox"></td>
              <td>{{alert['_source'].ruleid}}</td>
              <td>{{alert['_source'].business}}</td>
              <td>{{alert['_source'].hostname}}</td>
              <td>{{alert['_source'].title}}</td>
              <td>
                <span class="label label-info" v-if="alert['_source'].level == 1">低</span>
                <span class="label label-warning" v-if="alert['_source'].level == 2">中</span>
                <span class="label label-danger" v-if="alert['_source'].level == 3">高</span>
              </td>
              <td v-text='timestamp_to_timestr(alert["_source"]["@timestamp"])'></td>
              <td><span class="label label-primary">查看</span></td>
            </tr>
          </tbody>
        </table>
    </div>
    <paging :total="total_record"></paging>
  </div>

</div>

</template>

<script>
import paging from '@/components/common/paging'
import {getAPItoken,postAPItoken} from '@/utils/api'
export default {
  name: 'dashboard',
  components:{
    paging,
  },
  data () {
    return {
      token:null,
      total_record:0,
      business: null,
      businesses:null,
      alerts: null,
    }
  },
  methods:{
    chose_cancel_all:function(event){
      let els = (this.$refs.mybox)
      for (let i = 0; i < els.length; i++) {
        if(event.currentTarget.checked){
          els[i].checked = true
        }else{
          els[i].checked = false
        }
      }
    },
    get_alerts(){
      const promise = postAPItoken(API.alertAPI,{type:'save'},this.token);
      promise.then((data) =>{
        this.alerts = data['data'];
        this.total_record = data['total'];
      })
    },
    timestamp_to_timestr(timestamp){
      var timeobj = new Date(timestamp);
      return timeobj.toLocaleString();
    }
  },
  mounted() {
    this.token = sessionStorage.getItem('token');
    const bpromise = getAPItoken(API.businessAPI,this.token);
    bpromise.then((data) =>{
      this.businesses = data;
    })
    this.get_alerts()
  }
}
</script>

<style scoped>
@import './common/table.css';
#host-title{
  margin:17px 10px;
}

.cluster-list{
  margin: 20px 10px;
}

select{
  font-size: 15px;
  width: 180px;
}
</style>
