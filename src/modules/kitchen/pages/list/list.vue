<template>
<el-tabs v-model="activeTab" class="list-tabs" @tab-click="handleClick">
    <el-tab-pane label="Acceptable" name="first">

        <div class="main-bg">
            <el-main>
            <el-row :gutter="12">
                    <el-col :xs="24">
                        <h3 class="gray-title">Today</h3>
                        <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card">
                            <el-icon class="phone-icon"><phone /></el-icon>
                            <div class="title-time-wrapper">
                                <p class="title"> Your request to attend immediately </p>
                                <p class="time"> 2 minutes ago </p>
                            </div>
                            <div class="requester-name">
                                <el-icon><avatar /></el-icon>
                                <p class="name"> moha fawzy </p>
                            </div>
                            <div class="request-place">
                                <el-icon><school /></el-icon>
                                <p class="hall"> hall 2 </p>
                            </div>
                            
                            <input type="checkbox" class="switch" data-checked="ON" data-before="OFF">
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="12">
                        <h3 class="gray-title">10/2/2022 </h3>
                    <el-col :xs="24" v-for="i in 5" :key="i">
                        <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" @click="openDetailsModel">
                            <el-icon class="order-icon"><phone /></el-icon>
                            <div class="title-time-wrapper">
                                <p class="title"> Your request to attend immediately </p>
                                <p class="time"> 2 minutes ago </p>
                            </div>
                            <div class="requester-name">
                                <el-icon><avatar /></el-icon>
                                <p class="name"> moha fawzy </p>
                            </div>
                            <div class="request-place">
                                <el-icon><school /></el-icon>
                                <p class="hall"> hall 2 </p>
                            </div>
                        
                            <input type="checkbox" class="switch" @click.stop data-checked="ON" data-before="Accept">
                        </el-card>
                    </el-col>
                </el-row>
                <OrderDetails :modelVisible="openModel" @modelClose="openModel = false"/>
            </el-main>
        </div>

    </el-tab-pane>
    <el-tab-pane label="Rejected" name="second">
  <div class="main-bg">
            <el-main>
            <el-row :gutter="12">
                    <el-col :xs="24">
                        <h3 class="gray-title">Today</h3>
                        <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card">
                            <el-icon class="phone-icon"><phone /></el-icon>
                            <div class="title-time-wrapper">
                                <p class="title"> Your request to attend immediately </p>
                                <p class="time"> 2 minutes ago </p>
                            </div>
                            <div class="requester-name">
                                <el-icon><avatar /></el-icon>
                                <p class="name"> moha fawzy </p>
                            </div>
                            <div class="request-place">
                                <el-icon><school /></el-icon>
                                <p class="hall"> hall 2 </p>
                            </div>
                            
                            <input type="checkbox" class="switch" data-checked="ON" data-before="OFF">
                        </el-card>
                    </el-col>
                </el-row>

                <el-row :gutter="12">
                        <h3 class="gray-title">10/2/2022 </h3>
                    <el-col :xs="24" v-for="i in 5" :key="i">
                        <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" @click="openDetailsModel">
                            <el-icon class="order-icon"><phone /></el-icon>
                            <div class="title-time-wrapper">
                                <p class="title"> Your request to attend immediately </p>
                                <p class="time"> 2 minutes ago </p>
                            </div>
                            <div class="requester-name">
                                <el-icon><avatar /></el-icon>
                                <p class="name"> moha fawzy </p>
                            </div>
                            <div class="request-place">
                                <el-icon><school /></el-icon>
                                <p class="hall"> hall 2 </p>
                            </div>
                        
                            <input type="checkbox" class="switch" @click.stop data-checked="ON" data-before="Accept">
                        </el-card>
                    </el-col>
                </el-row>
                <OrderDetails :modelVisible="openModel" @modelClose="openModel = false"/>
            </el-main>
        </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import { Phone, Avatar, School} from '@element-plus/icons';
export default {
   components:{Phone, Avatar, School },
   data() {
       return {
           orders:[],
           value4:true,
           openModel:false,
           activeTab:"first"
       }
   },
   
   methods: {

       openDetailsModel(){
           this.openModel = true;
       }
   },
    
}
</script>

<style lang="scss">
    .el-tabs__nav-wrap{
        padding: 15px 0;
    }
    .list-tabs{
        text-align: center;
        .el-tabs__nav{
            float: initial;
            display: inline-block;
            border: 2px solid #bab3c0;
            border-radius: 9px;
            padding: 0 ;
            background-color: #e9e6e9;
        }
        .el-tabs__item{
            text-align: center;
            background-color: #e9e6e9;
            border-radius: 9px;
            padding: 0 10px !important;
            &.is-active{
                background-color: #fff;
                color: #2d2d2d;
            }
            &:hover{
                color: initial;
            }
        }
        .el-tabs__active-bar{
            display: none;
        }
    }
    .el-col {
        margin-bottom: 10px;
    }

    @include rtl() {
  
    }
</style>