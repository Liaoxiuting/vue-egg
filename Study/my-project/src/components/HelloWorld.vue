<template>
<!-- 穿梭框 transfer -->
  <div class="hello">
    <el-transfer v-model="value" :data="datas"></el-transfer>
    <button @click="btn">点击</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
      
    return {
        datas: [{
            key: 0,
            label: '备选项1',
            disabled: false
          },{
            key: 1,
            label: '备选项2',
            disabled: false
          },{
            key: 2,
            label: '备选项3',
            disabled: false
          },
        ],
        value: []
    }
  },
  mounted(){},
  created(){
    // this.generateData()
  },
  methods:{
    generateData() {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        console.log(data,'--daata')
        this.datas=data
      },
      btn(){
        console.log(this.value,'---value')
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
