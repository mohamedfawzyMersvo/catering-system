<template>
<div class="main-bg">
    <el-main>
    <div class="date-card">
        <el-row :gutter="12" class="time-card">
            <el-col :xs="24" :sm="10" :md="10" :lg="6" :xl="6">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                    <el-icon><calendar /></el-icon>
                    <div class="arrow-left date-wrapper">
                        <span class="date-title">{{$t("common.date")}}:</span>
                        <span class="date">{{todayDate()}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" class="time-card">
            <el-col :xs="24" :sm="10" :md="10" :lg="6" :xl="6">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                   <el-icon><clock /></el-icon>
                    <div class="arrow-left date-wrapper">
                        <span class="date-title">{{$t("common.theTimeNow")}}:</span>
                        <span class="date">{{ time()}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" class="time-card">
            <el-col :xs="24" :sm="10" :md="10" :lg="6" :xl="6">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                    <el-icon><calendar /></el-icon>
                    <div class="arrow-left date-wrapper">
                        <span class="date-title">{{$t("common.dayOfWeek")}}</span>
                        <span class="date">{{day()}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <div class="progress-circle">
        <el-progress type="circle" :percentage="25" stroke-width="10" color="#e5e9f2" width="200" :show-text=false />
        <div class="img-inside">
            <!-- <span class="time-left"> Time Left </span>
            <span class="time"> 00:35:18 </span>
            <span class="shift-time"> 08:25 am / 10:00 am </span> -->
            <img src="@/assets/drinkimg.png" />
        </div>
    </div>
    <div class="text-center">
        <el-button type="text" class="btn--burble" :style="{ boxShadow: `var(--el-box-shadow-base)` }" @click="$router.push({name:'order.list'});">{{$t("common.startOrdering")}}</el-button>
    </div>
     </el-main>
</div>
</template>

<script>
import { Calendar, Clock } from '@element-plus/icons'

export default {
    components:{Calendar, Clock},
    methods: {
        time(){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return time;
        },
        day(){
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let today = new Date();
            return days[today.getDay()]
        },
        todayDate(){
            let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        }
    },
}
</script>

<style lang="scss">
    .main-bg {
        height: 100vh;
    }
    .date-card{
        .el-card__body {
         display: flex; 
         align-items: center;
         padding: 10px;
         .el-icon{
             width: 25%;
             padding-right: 20px;
             font-size: 30px;
             color: var(--default-primary-color);
         }  
        }
        .time-card{
            margin-bottom: 10px;
        }
        .date-title{
            line-height: 1;
            color: #868686;
            display: block;
        }
        .date-wrapper{
            padding-left: 10px;
            position: relative;
        }
        .arrow-left{
            &::before {
                content: "";
                position: absolute;
                height: 100%;
                left: -7px;
                border: 1px solid #e9e6e9;
            }
        }
    }
    .progress-circle{
        display: flex;
        justify-content: center;
        position: relative;
        // .text-inside{
        //     top: 28px;
        //     position: absolute;
        //     display: flex;
        //     flex-flow: column;
        //     text-align: center;
        //     color: #89828f;
        //     .time-left{
        //         font-size: 21px;
        //     }
        //     .time{
        //         color: #263948;
        //         font-size: 30px;
        //     }
        //     .shift-time{
        //         font-size: 14px;
        //     }
        // }
        .img-inside{
            position: absolute;
                top: 11px;
            img {
                width: 177px;
                border-radius: 50%;
            }

        }
    }
    .text-center{
        margin-top: 20px;
        text-align: center;
        .el-button {
            width: 250px;
            height: 40px;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
    }
    .demo-progress .el-progress--circle {
    margin-right: 15px;
    }
    @include rtl() {
        .arrow-left {
            &::before{
                // content: none;
                right: -18px;
                left: initial;
            }
        }
        .date-card .el-card__body .el-icon {
            padding-right: 0;
            padding-left: 20px;
        }
    }
</style>