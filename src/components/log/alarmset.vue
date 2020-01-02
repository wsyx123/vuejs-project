<template>
<div>
  <div id="right-main-title">
    <div id="host-title">
      <span>业务系统:</span>
      <select v-model="business" @change="selectBusiness">
        <option v-for="(business,index) in businesses" v-bind:value="business.id">{{business.name}}</option>
      </select>
    </div>
    <div class='menu-button'>
      <div class='action-button'><button class="btn btn-xs btn-primary" @click="alarmCreate"><i class="fa fa-plus"></i> 新建</button></div>
      <div class='action-button'>
        <button class="btn btn-xs btn-success" @click="ruleBatchOpt('enabled')" :disabled="disabled"><i class="fa fa-play"></i> 启用</button>
      </div>
      <div class='action-button'>
        <button class="btn btn-xs btn-warning" @click="ruleBatchOpt('stop')" :disabled="disabled"><i class="fa fa-stop"></i> 停用</button>
      </div>
      <div class='action-button'>
        <button class="btn btn-xs btn-danger" @click="ruleBatchOpt('delete')" :disabled="disabled"><i class="fa fa-trash"></i> 删除</button>
      </div>
      <div id="store-search">
        <div class="input-group">
          <input type="text" class="form-control">
          <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
        </div>
      </div>
    </div>
  </div>
  <div id="right-main-content">
      <div class="cluster-list">
        <table class="table">
          <thead>
            <tr>
              <td><input @click="chose_cancel_all" type="checkbox" ref="controlAll"></td>
              <td>业务</td>
              <td>策略名</td>
              <td>级别</td>
              <td>周期</td>
              <td>时段</td>
              <td>启用</td>
              <td>创建时间</td>
              <td>更新时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rule in rules">
              <td><input type="checkbox" ref="rules" :value="rule.id" @click="choiceRule"></td>
              <td>{{businessesIDname[rule.business]}}</td>
              <td>{{rule.name}}</td>
              <td>
                <span class="label label-info" v-if="rule.level == 1">低</span>
                <span class="label label-warning" v-if="rule.level == 2">中</span>
                <span class="label label-danger" v-if="rule.level == 3">高</span>
              </td>
              <td v-if="rule.alarm_date == 1">工作日</td>
              <td v-else>全年</td>
              <td v-if="rule.time_type ==1">24小时</td>
              <td v-else>{{rule.start_time}}~{{rule.end_time}}</td>
              <td><input type="checkbox" class="switch_1" :checked="rule.enabled" @click="ruleEnabled($event,rule.id)"></td>
              <td>{{rule.create_time}}</td>
              <td>{{rule.update_time}}</td>
              <td><button class="btn btn-xs btn-primary" @click="alarmEdit(rule.id)"><i class="fa fa-pencil-square-o"></i></button></td>
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
import {getAPItoken,patchAPItoken,deleteAPItoken} from '@/utils/api'

export default {
  name: 'dashboard',
  components:{
    paging,
  },
  data () {
    return {
      token:null,
      rules:null,
      total_record: 0,
      id_array: [],
      disabled:true,
      businesses:null,
      business: null,
      businessesIDname: {},
    }
  },
  methods:{
    chose_cancel_all(event){
      let els = (this.$refs.rules)
      for (let i = 0; i < els.length; i++){
        if(event.currentTarget.checked){
          this.id_array.push(els[i].value)
          els[i].checked = true
        }else{
          els[i].checked = false
          let index = this.id_array.indexOf(els[i].value)
          this.id_array.splice(index,1)
        }
      }
      this.judge_id_array()
    },
    cancel_checked(){
      let els = (this.$refs.rules)
      for (let i = 0; i < els.length; i++){
        els[i].checked = false
        this.id_array = []
      }
      this.$refs.controlAll.checked = false
      this.judge_id_array()
    },
    choiceRule(event){
      let value = event.currentTarget.value;
      if(event.currentTarget.checked){
        this.id_array.push(value)
      }else{
        let index = this.id_array.indexOf(value)
        this.id_array.splice(index,1)
      }
      this.judge_id_array()
    },
    judge_id_array(){
      if(this.id_array.length == 0){
        this.disabled = true
      }else{
        this.disabled = false
      }
    },
    getAlarmRules(){
      if(this.business){
        var url = API.alarmruleAPI+'?business='+this.business;
      }else{
        var url = API.alarmruleAPI;
      }
      this.token = sessionStorage.getItem('token');
      const rpromise = getAPItoken(url,this.token);
      rpromise.then((data) => {
        this.rules = data;
        this.total_record = this.rules.length;
      })
    },
    alarmCreate(){
      this.$router.push({name: 'alarmcreate',params:{title:'新建告警规则',action:'create'}});
    },
    selectBusiness(){
      this.getAlarmRules();
    },
    ruleBatchCommon(opt,id,status){
      if(opt == 'delete'){
        var promise = deleteAPItoken(API.alarmruleAPI+id+'/',{},this.token);
      }else{
        var promise = patchAPItoken(API.alarmruleAPI+id+'/',{enabled:status},this.token);
      }
      promise.then((res) => {
        this.getAlarmRules();
      })
    },
    ruleEnabled(event,id){
      if(event.currentTarget.checked){
        this.ruleBatchCommon('enabled',id,true);
      }else{
        this.ruleBatchCommon('enabled',id,false);
      }
    },
    alarmEdit(id){
      this.$router.push({name: 'alarmedit',params:{title:'编辑告警规则',ruleID:id,action:'edit'}});
    },
    ruleBatchOpt(opt){
      if(opt == 'enabled'){
        status = true
      }else{
        status = false
      }
      for(let i in this.id_array){
        this.ruleBatchCommon(opt,this.id_array[i],status)
      }
      this.cancel_checked()
    }
  },
  mounted() {
    this.getAlarmRules();
    this.token = sessionStorage.getItem('token');
    const bpromise = getAPItoken(API.businessAPI,this.token);
    bpromise.then((data) =>{
      this.businesses = data;
      for(let i in this.businesses){
        this.businessesIDname[this.businesses[i]['id']] = this.businesses[i]['name'];
      }
    })
  },
}
</script>

<style scoped>
@import './common/table.css';


.menu-button,.action-button,#host-title,#store-search{
  display: inline-block;
}
#host-title{
  margin:17px 10px;
}

.menu-button{
  float: right;
  margin: 17px;
}
.action-button{
  margin-right:10px;
}

.cluster-list{
  margin: 20px 10px;
}

#store-search{
  width:250px;
  vertical-align: middle;
  margin-left: 10px;
}
#store-search input{
  height: 30px;
}

input[type=checkbox]{
    cursor: pointer;
    height: 1em;
    line-height: 1.25em;
    width: 1.25em;
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

select{
  font-size: 15px;
  width: 180px;
}

</style>
