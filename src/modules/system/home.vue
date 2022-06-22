<template>
    <div class="kitchen-home">
        <div class="head">
            <img src="@/assets/headCofee.jpeg" alt="">
             <p  @click.stop="openModel = true" class="edit-theme">{{$t('common.editTheme')}} </p>
        </div>
        <div class="kitchen-items">
             <el-main>
              <el-row :gutter="20" justify="center" class="row">
                <el-col :xs="24" :sm="8" :md="8" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/drinks.png" alt="">
                            <h3>{{$t('common.drinks')}} </h3>
                            <span class="arrow" @click="goTo('drinks-list')"><el-icon><right /></el-icon></span>
                        </div>
                    </el-card>
                </el-col>
                <el-col  :xs="24" :sm="8" :md="8" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/halls.png" alt="">
                            <h3>{{$t('common.rooms')}}</h3>
                            <span class="arrow"  @click="goTo('halls-list')"><el-icon><right /></el-icon></span>
                        </div>
                     </el-card>
                </el-col>
                <el-col  :xs="24" :sm="8" :md="8" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/kitchen.png" alt="">
                            <h3>{{$t('common.kitchens')}}</h3>
                            <span class="arrow"  @click="goTo('kitchen-list')"><el-icon><right /></el-icon></span>
                        </div>
                    </el-card>
                </el-col>
                <el-col  :xs="24" :sm="8" :md="8" :lg="5" :xl="5"><div class="grid-content bg-purple" />
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="kitchen-item">
                            <img src="@/assets/tablet.png" alt="" class="tablet-img">
                            <h3>{{$t('common.tablets')}}</h3>
                            <span class="arrow"  @click="goTo('tablet-list')"><el-icon><right /></el-icon></span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            </el-main>
        </div>
        <Theme :modelVisible="openModel" @modelClose="openModel = false"/>
    </div>
</template>
<script>
    import { Right} from '@element-plus/icons';
    import Theme from './components/theme.vue';

    export default {
        components:{Right, Theme},
           data() {
            return {
                openModel:false,
            }
        },
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
        margin-top: 30px;
        text-align: center;
        .row {
            margin-top: 30px;
        }
        .kitchen-item{
            margin-bottom: 30px;
            h3{
                font-weight: bolder;
                font-size: 27px;
                margin: 0;
                margin-bottom: 10px;
            }
            img{
                height: 170px;
                width: 170px;
            }
            .tablet-img{
                // padding-top: 10px;
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
        .el-card{
            @media screen   and (max-width: 768px) {
                margin-bottom: 15px;
            }
        }
    .head{
        img {
            border-radius: 15px;
            width: 800px;
            height: 221px;
        }
    }
    .edit-theme{
        background: black;
        color: #fff;
        width: 140px;
        border-radius: 7px;
        text-align: center;
        margin: 20px auto;
    }


    @include rtl() {
        .arrow{
            transform: rotate(180deg);  
        }
    }
</style>

