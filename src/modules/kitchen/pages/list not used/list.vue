<template>
    <PageTitle title="My requests"/>    
    <div class="main-bg">
        <el-main>
         <el-card class="box-card">
             <h3> Request in progress</h3>
             <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for=" n in 4" :key="n">
                    <div class="grid-content order-box bg-white">
                        <div class="order-header">
                            <p> Coffee </p>
                        </div>
                        <div class="order-body">
                            <div class="order-num-date">
                                <div class="order-num">03</div>
                                <div class="order-date">
                                    <span>24 Dec 2020</span>
                                    <span>Today</span>
                                    <span>04:30 am</span>
                                    <span>Second floor</span>
                                </div>
                            </div>
                                <el-collapse v-model="activeNames" @change="handleChange" class="order-details">
                                    <el-collapse-item title="Order Details 02" name="1">
                                        <div>
                                        Consistent with real life: in line with the process and logic of real
                                        life, and comply with languages and habits that the users are used to;
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>

                        </div>
                        <div class="order-footer">
                            <div> 
                                <el-icon><close /></el-icon>
                                <el-icon><refresh-right /></el-icon>
                            </div>
                            <el-icon class="alarm"><alarm-clock /></el-icon>
                        </div>
                    </div>
                </el-col>
            </el-row>
         </el-card>

          <el-card class="box-card">
             <h3> Request complete</h3>
             <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for=" n in 4" :key="n">
                    <div class="grid-content order-box bg-white">
                        <div class="order-header">
                            <p> Coffee </p>
                        </div>
                        <div class="order-body">
                            <div class="order-num-date">
                                <div class="order-num">03</div>
                                <div class="order-date">
                                    <span>24 Dec 2020</span>
                                    <span>Today</span>
                                    <span>04:30 am</span>
                                    <span>Second floor</span>
                                </div>
                            </div>
                                <el-collapse v-model="activeNames" @change="handleChange" class="order-details">
                                    <el-collapse-item title="Order Details 02" name="1">
                                        <div>
                                        Consistent with real life: in line with the process and logic of real
                                        life, and comply with languages and habits that the users are used to;
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>

                        </div>
                        <div class="order-footer">
                            <div> 
                                <el-icon><close /></el-icon>
                                <el-icon><refresh-right /></el-icon>
                            </div>
                            <el-icon class="alarm"><alarm-clock /></el-icon>
                        </div>
                    </div>
                </el-col>
            </el-row>
         </el-card>

        </el-main>
    </div>
</template>
<script>

import PageTitle from '@/layout/pageTitle'
import { Close, RefreshRight, AlarmClock } from '@element-plus/icons'
export default {
    components:{PageTitle, Close, RefreshRight, AlarmClock}
}
</script>

<style lang="scss">
    .main-bg{
        background:#f6f6f6;
        height: 100vh;
    }
    .box-card{
        background:#fbfbfb;
        margin-bottom: 20px;
        h3{
            margin: 0;
            margin-bottom: 15px;
        }
    }
    .order-box{
        padding: 10px;
        margin-bottom: 20px;
        .order-header{
            background-color: #f8f7f8;
            color: #5e1ad5;
            text-align: center;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            p{
                font-size: 27px;
                margin: 0;
            }
        }
        .order-body{
            margin: 10px 0;
            .order-num-date {
                display: flex;
                justify-content: space-around;
                margin-bottom: 10px;
            }
            .order-num{
                font-weight: bold;
                font-size: 40px;
                display: flex;
                align-items: center;
            }
            .order-date {
                display: flex;
                flex-flow: column;
                
            }
            .order-details{
                .el-collapse-item__header{
                    color: #bab3c0;
                    font-size: 12px;
                }
            }
        }
    }
    .order-footer{
        display: flex;
        justify-content: space-between;
        >div{
            .el-icon{
                margin-right: 15px;
                color: #c3b8c3;
            }
        }
        .el-icon{
            border-radius: 50%;
            border: 1px solid;
            padding: 3px;
            &.alarm{
                padding: 4px;
                color: #f29331;
            }
        }
    }
    .bg-white{
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 21%);
    }
    .el-col {
        border-radius: 4px;
    }
    @include rtl() {
       .order-details .el-collapse-item__arrow {
            margin-right: auto;
            margin-left: 0;
            transform: rotate(180deg);
        }
    }
</style>