<template>
<div>
  <div id="resultNotify" :class="{error:error,success:success}" hidden>
    <div class="row">
      <div class="col-sm-1" style="text-align: center;">
        <strong>结果!</strong>
      </div>
      <div class="col-sm-10">
        <span>{{resultMsg}}</span>
      </div>
      <div class="col-sm-1" style="text-align: center;margin-top:auto;cursor: pointer;" @click="closeResult">关闭</div>
    </div>
  </div>
  <div id="right-main-title">
    <div id="host-title">
      <span>{{this.$route.params.title}}</span>
      <div id="hint" style="background-color: #d9edf7;color: #31708f;;">
        <strong>注意!</strong>
        <span>规则不会自动保存,请注意丢失!</span>
      </div>
    </div>
    
  </div>
  <div id="right-main-content">
    <div class="cluster-list">
      <div class="ruleGroup" style="margin-top: 0px;">
        <span class="ruleGroupName">定义告警条件</span>
      </div>
      
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>规则名称:</div>
        <div class="col-sm-10"><input v-model="ruleData.name" style="width: 100%;"></div>
      </div>

      <div class="row">
        <div class="col-sm-2" id="title">备注:</div>
        <div class="col-sm-10"><input v-model="ruleData.description" style="width: 100%;"></div>
      </div>

      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>选择业务系统:</div>
        <div class="col-sm-2">
          <select v-model="ruleData.business">
            <option v-for="(business,index) in businesses" :value="business.id" @click="getBusinessFields(index)">{{business.name}}</option>
          </select>
        </div>
     
        <div class="col-sm-2" id="title"><span class="red">*</span>告警深度:</div>
        <div class="col-sm-2">
          <select v-model="ruleData.alarm_depth" @change="selectDepth">
            <option value="1">业务字段</option>
            <option value="2">组件字段</option>
          </select>
        </div>

        <div v-if="displayComponent">
          <div class="col-sm-2" id="title">选择组件:</div>
          <div class="col-sm-2">
            <select v-model="ruleData.component" @change="getComponentFields">
              <option v-for="(component,index) in components" :value="component.id">{{component.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>表达式:</div>
        <div class="col-sm-10">
          <button class="btn btn-xs" @click="addExpression"><i class="fa fa-plus" aria-hidden="true"></i> 添加</button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <table class="table table-bordered">
            <thead>
            <tr v-if="hasExpression">
              <td>标识</td>
              <td>字段</td>
              <td>运算符</td>
              <td>关键字</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(value,index) in ruleData.expressions">
              <td>{{value.expression_id}}</td>
              <td>
                <select v-model="value['field'+value.expression_id]">
                  <option v-for="(field,index) in fields" :value="field.name">{{field.name}}</option>
                </select>
              </td>
              <td>
                <select v-model="value['operator'+value.expression_id]">
                  <option value="eq">等于</option>
                  <option value="ne">不等于</option>
                  <option value="gt">大于</option>
                  <option value="lt">小于</option>
                  <option value="in">包含</option>
                </select>
              </td>
              <td>
                <input v-model="value['value'+value.expression_id]" style="width: 100%;">
              </td>
              <td>
                <span class="label label-danger" @click="deleteExpression(index)" style="cursor: pointer;">删除</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>逻辑表达式:</div>
        <div class="col-sm-10"><input v-model='ruleData.logic_expression' style="width: 100%;" placeholder="示例: (A|B)&C"></div>
      </div>

      <div class="ruleGroup"><span class="ruleGroupName">定义告警内容</span></div>
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>告警标题:</div>
        <div class="col-sm-10"><input v-model="ruleData.title" style="width: 100%;" placeholder="支持字段引用,示例: ${hostname}告警"></div>
      </div>
      <div class="row">
        <div class="col-sm-2" id="title">告警级别:</div>
        <div class="col-sm-10">
          <select style="width: 10%;" v-model="ruleData.level">
            <option value="1">低</option>
            <option value="2">中</option>
            <option value="3">高</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>告警内容:</div>
        <div class="col-sm-10"><input v-model="ruleData.message" style="width: 100%;" placeholder="支持字段引用,示例: 告警信息:${message}"></div>
      </div>

      <div class="ruleGroup"><span class="ruleGroupName">定义告警策略</span></div>
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>告警周期:</div>
        <div class="col-sm-2">
          <select v-model="ruleData.alarm_date">
            <option value="1">工作日</option>
            <option value="2">全年</option>
          </select>
        </div>
        <div class="col-sm-2" id="title"><span class="red">*</span>告警时段:</div>
        <div class="col-sm-2">
          <select v-model="ruleData.time_type">
            <option value="1">全天</option>
            <option value="2">工作时段</option>
          </select>
        </div>
        <div class="col-sm-4" v-if="ruleData.time_type==2">
          <span>填写:</span>
          <input v-model="ruleData.start_time" placeholder="09:00:00">~<input v-model="ruleData.end_time" placeholder="18:00:00">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>启用告警压缩:</div>
        <div class="col-sm-10"><input type="checkbox" class="switch_1" @click="enableCompress" :checked="ruleData.compress_enabled"></div>
      </div>
      <div class="row" v-if="ruleData.compress_enabled">
        <div class="col-sm-2" id="title"><span class="red">*</span>时间窗口:</div>
        <div class="col-sm-2"><input v-model="ruleData.total_time" placeholder="秒"></div>
        <div class="col-sm-2" id="title"><span class="red">*</span>告警间隔:</div>
        <div class="col-sm-2"><input v-model="ruleData.interval_time" placeholder="秒"></div>
        <div class="col-sm-2" id="title"><span class="red">*</span>告警次数:</div>
        <div class="col-sm-2"><input v-model="ruleData.total_number"></div>
      </div>

      <div class="ruleGroup"><span class="ruleGroupName">定义告警动作</span></div>
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>告警方式:</div>
        <div class="col-sm-10">  
          <input type="checkbox" @click="choiceNotifyWay" value="1" :checked="notifyWayCheckedJudge('1')">邮件
          <input type="checkbox" @click="choiceNotifyWay" value="2" :checked="notifyWayCheckedJudge('2')">短信
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2" id="title"><span class="red">*</span>通知用户:</div>
        <div class="col-sm-10">  
          <div class="select-selection-multiple" contenteditable @click="displaySelectOption">
            <ul class="nav">
              <li class="select-selection-choice" v-for="(user,index) in ruleData.notifier">{{user.name}}<i class="red fa fa-times" @click="removeUser(index)"></i>
              </li>
            </ul>
          </div>
          <div class="select-selection-option" v-if="displayOption">
            <table class="table">
              <tr v-for="(user,index) in users">
                <td @click="choiceUser(index)">{{user.name}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <hr>
      <div class="row" style="text-align: center;">
        <button class="btn btn-sm btn-warning">取消</button>
        <button class="btn btn-sm btn-primary" @click="saveRule">保存</button>
      </div>

    </div>
  </div>

</div>

</template>

<script>
import {getAPItoken,postAPItoken,putAPItoken} from '@/utils/api'
import {validateRule,showMessage} from '@/utils/function'
export default {
  components:{
  },
  data () {
    return {
      token:null,
      businesses:[],
      components:[],
      fields: [],
      displayComponent:false,
      displayOption: false,
      users: [{id:1,name:'admin'},{id:2,name:'yangxu'}],
      hasExpression: false,
      expressionID: 'A',
      resultMsg: null,
      error: false,
      success: false,
      // v-model相关
      ruleData:{
        name: null,             // 规则名称
        description: null,      // 描述
        business: null,         // 业务
        alarm_depth: 1,         // 告警深度
        component: null,        // 组件
        expressions: [],        // 表达式
        logic_expression: null, // 逻辑表达式
        title: null,            // 告警标题
        level: 1,               // 告警级别
        message: null,          // 告警内容
        alarm_date: 2,          // 告警周期 -- 全年,工作日
        time_type: 1,           // 告警时段 -- 全天,工作时段
        start_time: null,       // 工作时段开始时间
        end_time: null,         // 工作时段结束时间
        compress_enabled:false, // 启用告警压缩
        total_time: null,       // 压缩时间窗口
        interval_time: null,    // 时间间隔
        total_number: null,     // 告警总次数
        notify_way: [],         // 通知方式
        notifier: []            // 通知用户
      },
    }
  },
  methods:{
    getBusinesses(){
      this.token = sessionStorage.getItem('token');
      const bpromise = getAPItoken(API.businessAPI,this.token);
      bpromise.then((data) => {
        for(let index in data){
          let busidict = {}
          let busiObj = data[index]
          busidict['id'] = busiObj.id
          busidict['name'] = busiObj.name
          busidict['components'] = []
          for(let i in busiObj.components){
            let comptdict = {}
            comptdict['id'] = busiObj.components[i].id
            comptdict['name'] = busiObj.components[i].name
            busidict['components'].push(comptdict)
          }
          this.businesses.push(busidict);
        }
        //类型判断
        this.actionJudge();
      })
    },
    selectDepth(){
      if(this.ruleData.alarm_depth == 2){
        this.displayComponent = true;
      }else{
        this.displayComponent = false;
      }
    },
    displaySelectOption(event){
      event.stopPropagation();
      this.displayOption = true;
    },
    hiddenSelectOption(){
      this.displayOption = false;
    },
    choiceUser(index){
      event.stopPropagation();
      this.ruleData.notifier.push(this.users[index]);
      this.users.splice(index,1);
    },
    removeUser(index){
      this.users.push(this.ruleData.notifier[index]);
      this.ruleData.notifier.splice(index,1);
    },
    enableCompress(event){
      if(event.currentTarget.checked){
        this.ruleData.compress_enabled = true;
      }else{
        this.ruleData.compress_enabled = false;
      }
    },
    addExpression(){
      if(this.hasExpression){
        const num = this.expressionID.charCodeAt()+1;
        this.expressionID = String.fromCharCode(num);
        
      }else{
        this.hasExpression = true;
      }
      let tmpdict = {}
      let ID = this.expressionID;
      tmpdict['expression_id'] = ID;
      tmpdict['field'+ID] = null
      tmpdict['operator'+ID] = null
      tmpdict['value'+ID] = null
      this.ruleData.expressions.push(tmpdict);
    },
    deleteExpression(index){
      this.ruleData.expressions.splice(index,1);
      this.sortExpression();
      if(this.ruleData.expressions.length === 0){
        this.hasExpression = false;
      }
    },
    sortExpression(){
      let tmpExpressions = this.ruleData.expressions;
      let num = 'A'.charCodeAt();
      this.ruleData.expressions = [];
      for(let index in tmpExpressions){
        this.expressionID = String.fromCharCode(num);
        // field,operator,value都是动态跟ID关联的, 所以ID变了也得跟着变,数据要保留
        let tmpdict = {}
        let newID = this.expressionID;
        let oldID = tmpExpressions[index]['expression_id']
        tmpdict['expression_id'] = newID;
        tmpdict['field'+newID] = tmpExpressions[index]['field'+oldID]
        tmpdict['operator'+newID] = tmpExpressions[index]['operator'+oldID]
        tmpdict['value'+newID] = tmpExpressions[index]['value'+oldID]
        this.ruleData.expressions.push(tmpdict);
        num++;
      }
    },
    choiceNotifyWay(event){
      let value = event.currentTarget.value;
      if(event.currentTarget.checked){
        this.ruleData.notify_way.push(value)
      }else{
        let index = this.ruleData.notify_way.indexOf(value);
        this.ruleData.notify_way.splice(index,1);
      }
    },
    notifyWayCheckedJudge(value){
      if(this.ruleData.notify_way.indexOf(value) != -1){
        return true
      }
    },
    getBusinessFields(index){
      // 设置组件列表和获取日志结构字段
      this.components = this.businesses[index].components;
      const url = API.structureAPI+'?business='+this.ruleData.business+'&default=1&enabled=1';
      const spromise = getAPItoken(url,this.token);
      spromise.then((data) =>{
        this.fields = data;
      })
    },
    getComponentFields(){
      const url = API.structureAPI+'?business='+this.ruleData.business+'&enabled=1&component='+this.ruleData.component;
      const spromise = getAPItoken(url,this.token);
      spromise.then((data) =>{
        this.fields.push.apply(this.fields,data);
      })
    },
    getBusinessComponentFields(business_index){
      this.components = this.businesses[business_index].components;
      const url = API.structureAPI+'?business='+this.ruleData.business+'&default=1&enabled=1';
      const spromise = getAPItoken(url,this.token);
      spromise.then((data) =>{
        this.fields = data;
        const url = API.structureAPI+'?business='+this.ruleData.business+'&enabled=1&component='+this.ruleData.component;
        const spromise = getAPItoken(url,this.token);
        spromise.then((data) =>{
          this.fields.push.apply(this.fields,data);
        })
      })
    },
    saveRule(){
      let validateResult = validateRule(this.ruleData)
      if(validateResult['status']){
        if(this.$route.params.action == 'edit'){
          var ruleID = this.$route.params.ruleID
          var promise = putAPItoken(API.alarmruleAPI+ruleID+'/',this.ruleData,this.token)
        }else{
          var promise = postAPItoken(API.alarmruleAPI,this.ruleData,this.token)
        }
        promise.then((data) =>{
          if(data['status']){
            if(this.$route.params.action == 'edit'){
              var message = '{'+this.ruleData.name+'}--规则编辑成功';
            }else{
              var message = '{'+this.ruleData.name+'}--规则创建成功';
            }
          }else{
            var message = data['message'];
          }
          this.showMessage(data['status'],message)
        })
      }else{
        this.showMessage(false,validateResult['message'])
      }
    },
    showMessage(status,message){
      if(status){
        this.success = true;
      }else{
        this.error = true;
      }
      this.resultMsg = message;
    },
    closeResult(){
      this.success = false
      this.error = false
    },
    actionJudge(){
      if(this.$route.params.action == 'edit'){
        let id = this.$route.params.ruleID
        this.token = sessionStorage.getItem('token')
        const rpromise = getAPItoken(API.alarmruleAPI+id+'/',this.token)
        rpromise.then((data) => {
          this.ruleData = data
          var business_index = this.getBusinessIndex(this.ruleData.business)
          if(this.ruleData.alarm_depth==2){
            this.getBusinessComponentFields(business_index)
            this.displayComponent = true
          }else{
            this.getBusinessFields(business_index)
          }
          this.hasExpression = true;
        })
      }
    },
    getBusinessIndex(id){
      var index = 0;
      for(let i in this.businesses){
        if(this.businesses[i].id == id){
          index = Number(i)
        }
      }
      return index
    }
  },
  mounted() {
    this.getBusinesses();
    window.addEventListener('click', this.hiddenSelectOption);
  },
}
</script>

<style scoped>
.error{
  background-color: #f2dede;
  color: #a94442;
  border-color: #ebccd1;
  display: block;
}

.success{
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
  display: block;
}

#host-title{
  margin:17px 10px;
}

.cluster-list{
  margin: 10px;
}

#hint{
  float: right;
  font-size: 14px;
}

#resultNotify{
  position: fixed;
  width: 85%;
  left: 15%;
  top: 70px;
  z-index: 10;
}

.ruleGroup{
  text-align: center;
  margin-top: 30px;
}

.ruleGroupName{
  color:#48A3F6;
  margin-bottom: 10px;
  font-size: 16px;
}

.row{
  margin:10px 0px;
}


#title{
  text-align: right;
}

.red{
  color: red;
}

.select-selection-multiple{
  height: 34px;
  width: 100%;
  border: 1px solid #ddd;
  padding: 3px 0px;
  cursor: text;
}

.select-selection-choice{
  float: left;
  background-color: #fafafa;
  border:1px solid #e8e8e8;
  text-align: center;padding: 2px;
  margin-left: 5px;
}

.select-selection-option{
  width: 100%;
  border-left:1px solid #ddd;
  border-right:1px solid #ddd;
  border-bottom:1px solid #ddd;
  margin-top: 1px;
  padding: 3px;
}

.displayOption{
  display: block;
}

i{
  margin-left: 5px;
  cursor: pointer;
}

.table{
    width: 100%;
    max-width: 100%;
    margin-bottom: 0px;
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

</style>
