<template>
    <div class="kitchen-home">
        <div class="head">
            <img src="@/assets/kitchen-head.png" alt="">
        </div>
        <div class="kitchen-items">
              <el-row :gutter="20" justify="center" class="row">
                <el-col :xs="24" :sm="8" :md="5" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/drinks.png" alt="">
                            <h3>{{$t('common.drinks')}} </h3>
                            <span class="arrow" @click="goTo('drinks-list')"><el-icon><right /></el-icon></span>
                        </div>
                    </el-card>
                </el-col>
                <el-col  :xs="24" :sm="8" :md="5" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/halls.png" alt="">
                            <h3>{{$t('common.rooms')}}</h3>
                            <span class="arrow"  @click="goTo('halls-list')"><el-icon><right /></el-icon></span>
                        </div>
                     </el-card>
                </el-col>
                <el-col  :xs="24" :sm="8" :md="5" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/kitchen.png" alt="">
                            <h3>{{$t('common.kitchens')}}</h3>
                            <span class="arrow"  @click="goTo('kitchen-list')"><el-icon><right /></el-icon></span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import { Right} from '@element-plus/icons';
    export default {
        components:{Right},
        methods: {
            goTo(link){
                this.$router.push({name:link});
            }
        }
    }
</script>



<style lang="scss" scoped>
    .kitchen-home{
        margin: auto;
        margin-top: 50px;
        text-align: center;
        .row {
            margin-top: 30px;
        }
        .kitchen-item{
            margin-bottom: 30px;
            h3{
                font-weight: bolder;
                font-size: 27px;
            }
            img{
                height: 170px;
            }
            .arrow{
                cursor: pointer;
                display: inline-block;
                background-color: black;
                color: #fff;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                line-height: 44px;
            }
        }
    }
    .head{
        img {
            border-radius: 15px;
        }
    }


    @include rtl() {
        .arrow{
            transform: rotate(180deg);  
        }
    }
</style>

