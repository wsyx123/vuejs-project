<template>
    <div class="accept-container">
        <div id="host-title">
          <div class="row">
            <div class="col-sm-6">Grafana</div>
            <div class="col-sm-6" style="text-align: right;">
              <button type="button" class="btn btn-default">取消</button>
          </div>
          </div>

        </div>
        <div id="cluster">
        <iframe id="show-iframe" frameborder=0 name="showHere" scrolling="true" :src="src"></iframe>
      </div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
        grafana:"",
        src:""
        }
    },
    methods:{
        test(){
            this.$ajax.post("http://172.16.149.2/grafana/login",{user:"admin",password:"admin"}).then((response)=>{ console.log(response);})
        }
    },
    mounted(){
        this.test();
        const oIframe = document.getElementById('show-iframe');
        const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        oIframe.style.width = (deviceWidth*0.85) + 'px';
        oIframe.style.height = (deviceHeight*0.81) + 'px';
        this.src = "http://172.16.149.2/grafana/dashboard/new?orgId=1"
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accept-container{
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
  top: 139px;
  width: 100%;
  left: 221px;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
  z-index: 5;
  overflow: scroll;
}
.sidemenu{
  display: none;
}
</style>
