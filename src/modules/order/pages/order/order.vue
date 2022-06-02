<template>
    <div>
    <el-button type="success" class="request-attend-btn" @click="handleRequestAttend">{{$t('common.requestAttend')}}<el-icon><View /></el-icon></el-button>
     <el-tabs v-model="activeName" class="order-tabs" @tab-click="handleClick">
        <el-tab-pane :label="$t('common.coldDrinks')" name="first">
             <div class="main-bg">
                <el-main>
                    <el-row :gutter="12">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="drink in coldDrinkList" :key="drink.id">
                                <div class="order-item" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                                <div class="order-image">
                                        <div  class="block">
                                            <el-image
                                                src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                                                fit="cover"
                                            ></el-image>
                                        </div>
                                    </div>
                                    <div class="order-data"> 
                                        <div class="title-rate">
                                            <!-- <el-rate v-model="rate" text-color="#ff9900"></el-rate> -->
                                            {{$store.state.main.currentLocale == "en" ?drink.name : drink.name_Ar}}
                                        </div>
                                        
                                        <el-input-number class="input-number" v-model.number="drink.num" min="1" @change="handleChange" />
                                    
                                        <div class="tags">
                                            <!-- <el-tag class="ml-2" type="info">Tag 1</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 2</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 3</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 4</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 5</el-tag> -->
                                        </div>
                                        <el-button type="text" :disabled="drink.sugarDisabled" v-if="!drink.sugarDisabled" class="request-btn btn--burble" @click="openDetailsModel(drink)">{{$t("common.request")}} <el-icon><caret-right /></el-icon></el-button>
                                        <span v-else> {{$t("common.noSugar")}} </span>
                                    </div>
                                </div>
                            </el-col>
                    </el-row>
                </el-main>
            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('common.hotDrinks')" name="second">
            <div class="main-bg">
                <el-main>
                    <el-row :gutter="12">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="drink in hotDrinkList" :key="drink.id">
                                <div class="order-item" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                                <div class="order-image">
                                        <div  class="block">
                                            <el-image
                                                src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                                                fit="cover"
                                            ></el-image>
                                        </div>
                                    </div>
                                    <div class="order-data"> 
                                        <div class="title-rate">
                                            <!-- <el-rate v-model="rate" text-color="#ff9900"></el-rate> -->
                                            {{drink.name}}
                                        </div>
                                        
                                        <el-input-number class="input-number" v-model.number="drink.num" min="1" @change="handleChange" />
                                    
                                        <div class="tags">
                                            <!-- <el-tag class="ml-2" type="info">Tag 1</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 2</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 3</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 4</el-tag>
                                            <el-tag class="ml-2" type="info">Tag 5</el-tag> -->
                                        </div>
                                        <el-button type="text" :disabled="drink.sugarDisabled" class="request-btn btn--burble" @click="openDetailsModel(drink)">{{$t('common.request')}} <el-icon><caret-right /></el-icon></el-button>
                                    </div>
                                </div>
                            </el-col>
                    </el-row>
                </el-main>
            </div>
        </el-tab-pane>
    <OrderDetails :modelVisible="openModel" @modelClose="openModel = false" :drink="drink"/>
    </el-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import OrderDetails from './components/orderDetails.vue';
import {CaretRight, View} from '@element-plus/icons';

export default {
    components:{CaretRight, View, OrderDetails},
    data() {
        return {
            coldDrinkList:[],
            hotDrinkList:[],
            activeName:"first",
            rate:null,
            num:1,
            pageSize:10,
            pageNumber:1,
            openModel:false,
            drink:{}
        }
    },
    mounted() {
        this.loadColdDrinks();
        this.loadHotDrinks();
    },
    methods: {
        loadColdDrinks(){
            axios.get(`MenuItem/${this.pageSize}/${this.pageNumber}/1/ListAllMenuItemsByCategory`).then(res => {
                this.coldDrinkList = res.menuItemResponseList;
                this.coldDrinkList.filter(drink => drink.num = 1);
            })
        },
        loadHotDrinks(){
            axios.get(`MenuItem/${this.pageSize}/${this.pageNumber}/2/ListAllMenuItemsByCategory`).then(res => {
                this.hotDrinkList = res.menuItemResponseList;
                this.hotDrinkList.filter(drink => drink.num = 1);
            })
        },
        handleRequestAttend(){
            let order = {
                "menuItemId": 1009,
                "quantity": 0,
                "sugarSpoon": [
                    ""
                ]
            }
            axios
            .post('Order/CreateOrder', order)
            .then(() => {
                this.successMessage();
            })
        },
        openDetailsModel(drink){
            this.drink = drink;
           this.openModel = true;
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.attendsuccess'),
                type: 'success',
            })
        },
    },
}
</script>

<style lang="scss">
 .order-tabs{
        text-align: center;
        .el-tabs__nav{
            float: initial;
            display: inline-block;
            border-radius: 9px;
            padding: 0 ;
        }
        .el-tabs__item{
            text-align: center;
            padding: 0 10px !important;
            &.is-active{
                background-color: #fff;
                color: var(--default-primary-color);
            }
            &:hover{
                color: initial;
            }
        }
        .el-tabs__active-bar{
            background-color: var(--default-primary-color);
        }
 }
 .order-item{
     background-color: #fff;
     padding: 10px;
     display: flex;
     .order-image .block{
            margin-right: 20px;
            width: 200px;
            height: auto;
     }
     .title-rate{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;
        .el-rate__item{
            background: #fef4ea;
            i{
                // color: #ffb036 !important;
            }
        }
     }
     .input-number{
         margin: 0 50px;
         margin-bottom: 10px;
     }
    .ml-2{
         margin-right: 10px;
    }
    .tags{
        margin-bottom: 10px;
    }
    .request-btn{
        // background-color: #0000ff;
        width: 127px;
        &:hover{
            background-color: var(--default-primary-color);
        }
        i{
            margin-left: 5px;
            font-size: 20px;
        }
    }
 }
 .request-attend-btn{
    margin: 20px auto !important;
    margin-bottom: 0 !important;
    display: block !important;
    border-radius: 8px !important;
    font-weight: bolder;
    i{
        margin-left: 7px;
    }
 }
 @include rtl() {
      .request-btn{
          i{
              transform: rotate(180deg);
          }
      }
       .request-attend-btn i{
           margin-left: 0;
           margin-right: 7px;
       }
 }
</style>
