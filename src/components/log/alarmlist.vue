<template>
<div>
  <div id="right-main-title">
    <div id="host-title">
      <span>业务系统:</span>
      <select v-model="business" @change="selectBusiness">
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
              <td>业务</td>
              <td>告警标题</td>
              <td>级别</td>
              <td>发送状态</td>
              <td>发送时间</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
    </div>
    <paging :total="total_record"></paging>
  </div>

</div>

</template>

<script>
import paging from '@/components/common/paging'
import {getAPItoken} from '@/utils/api'
export default {
  name: 'dashboard',
  components:{
    paging,
  },
  data () {
    return {
      token:null,
      total_record:0,
      businesses:null,
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
    }
  },
  mounted() {
    this.token = sessionStorage.getItem('token');
    const bpromise = getAPItoken(API.businessAPI,this.token);
    bpromise.then((data) =>{
      this.businesses = data;
    })
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
