<template>
    <div class="notice">
        <el-table
        :data="list"
            border
            style="width: 100%"
            >
            <el-table-column
                prop="date"
                label="日期"
                width="180"
                >
            </el-table-column>
            <el-table-column
                prop="user"
                label="姓名"
                width="180"
                >
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="texts"
                label="签名"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="180"
                > 
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteFn(scope,list)"
                    type="text"
                    size="small">
                        移除
                    </el-button>
                    <el-button 
                    @click.native.prevent="detailRow(scope, list)" 
                    type="text"
                    size="small">
                        详情
                    </el-button>
                    <el-button 
                    @click.native.prevent="modifyRow(scope)" 
                    type="text"
                    size="small">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 抽屉 查看 -->
        <el-drawer
        title="成员详情"
        :visible.sync="drawer"
        :direction="direction"
        >
        <div v-if="detailObj" class="cts">
            <h2>
                角色
            </h2>
            <p>
                {{detailObj.role=='admin'?'管理者':'员工'}}    
            </p>
            <h2>
                用户名
            </h2>
            <p>
                {{detailObj.user}}</p>
            <h2>
                注册时间
            </h2>
            <p>{{detailObj.date}}</p>
            <img :src='detailObj.imgs' alt="">
        </div>
        </el-drawer>
        <!-- 修改 弹框 -->
        <Statistics 
        v-if="falge" 
        :statisticsObj='statisticsObj'
        @Falg='falgFn'
        />

    </div>
</template>
<script>
import { mapActions,mapState } from 'vuex'
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            detailObj:null,
            drawer: false,
            direction: 'rtl',//控制抽屉弹出的 方位 rtl / ltr / ttb / btt

            falge:false,
            statisticsObj:null
        }
    },
    computed:{
        ...mapState('userStatistics',['list'])
    },
    methods:{
        ...mapActions('userStatistics',['userStatisticsFn','deleteRow']),
        deleteFn(scope,rows) {//移除操作
            console.log(scope)
            let id=scope.row.id;
            this.deleteRow({id})
        },
        detailRow(scope, rows){//查看详情
                this.detailObj=scope.row
                this.drawer = true
        },
        modifyRow(scope){//修改
            this.statisticsObj=scope.row
            this.falge=true
        },
        falgFn(falge){//弹框显示 隐藏
             this.falge=falge
        }
    },
    created(){
        console.log(this.detailObj)
        this.userStatisticsFn('/userstatistics')
        
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
            /* header-cell-style="text-align: center;"
            cell-style="text-align: center;" */
.notice{
    width: 100%;
    height: 100%;
    overflow: auto;
}
.cts{
    width: 100%;
    height: 100%;
}
.cts>h2{
    color: black;
    line-height: 1rem;
    
}
.cts>p{
    color: black;
    line-height: 1rem;
}
.cts>img{
    width: 80%;
}
</style>