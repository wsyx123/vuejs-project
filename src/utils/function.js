//告警规则校验
export function validateRule(ruleData){
  if(ruleData.name == null){
    return {status:false,message:'请填写规则名称!'}
  }
  if(ruleData.business == null){
    return {status:false,message:'请选择业务!'}
  }
  if(ruleData.alarm_depth == 2 && ruleData.component == null){
    return {status:false,message:'请选择组件!'}
  }
  if(ruleData.expressions.length == 0){
    return {status:false,message:'请添加表达式!'}
  }
  if(ruleData.logic_expression == null){
    return {status:false,message:'请填写逻辑表达式!'}
  }
  if(ruleData.title == null){
    return {status:false,message:'请填写告警标题!'}
  }
  if(ruleData.message == null){
    return {status:false,message:'请填写告警内容!'}
  }
  if(ruleData.time_type == 2 && (ruleData.start_time == null || ruleData.end_time == null)){
    return {status:false,message:'请填写工作时段!'}
  }
  if(ruleData.compress_enabled && (ruleData.total_time == null || ruleData.interval_time == null || ruleData.total_number == null)){
    return {status:false,message:'请填写压缩策略!'}
  }
  if(ruleData.notify_way.length == 0){
    return {status:false,message:'请至少选择一个告警方式!'}
  }
  if(ruleData.notifier.length == 0){
    return {status:false,message:'请至少选择一个通知用户!'}
  }
  return {status:true}
}