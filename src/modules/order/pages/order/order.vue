<template>
<el-row :gutter="10">
    <el-col :span="18">
        <div>
            <el-button class="request-attend-btn" @click="handleRequestAttend">{{$t('common.requestAttend')}}<el-icon><View /></el-icon></el-button>
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
                                                        :src='drink.itemImageBytes'
                                                        fit="cover"
                                                    ></el-image>
                                                </div>
                                            </div>
                                            <div class="order-data"> 
                                                <div class="title-rate">
                                                    <!-- <el-rate v-model="rate" text-color="#ff9900"></el-rate> -->
                                                    {{$store.state.main.currentLocale == "en" ?drink.name : drink.name_Ar}}
                                                </div>
                                                
                                                <!-- <el-input-number class="input-number" v-model.number="drink.num" :min="1" @change="handleChange" /> -->
                                            
                                                <div class="tags">
                                                    <!-- <el-tag class="ml-2" type="info">Tag 1</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 2</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 3</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 4</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 5</el-tag> -->
                                                </div>
                                                <el-button type="text" v-if="!drink.sugarDisabled || drink.tag" class="request-btn btn--burble" @click="openDetailsModel(drink)">{{$t("common.request")}} <el-icon><caret-right /></el-icon></el-button>
                                                <el-button type="text" v-else class="request-btn btn--burble" @click="requesWithoutSugar(drink)">{{$t("common.request")}} <el-icon><caret-right /></el-icon></el-button>
                                                <!-- <span v-else> {{$t("common.noSugar")}} </span> -->
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
                                                        :src='drink.itemImageBytes'
                                                        fit="cover"
                                                    ></el-image>
                                                </div>
                                            </div>
                                            <div class="order-data"> 
                                                <div class="title-rate">
                                                    <!-- <el-rate v-model="rate" text-color="#ff9900"></el-rate> -->
                                                    {{drink.name}}
                                                </div>
                                                
                                                <!-- <el-input-number class="input-number" v-model.number="drink.num" :min="1" @change="handleChange" /> -->
                                            
                                                <div class="tags">
                                                    <!-- <el-tag class="ml-2" type="info">Tag 1</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 2</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 3</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 4</el-tag>
                                                    <el-tag class="ml-2" type="info">Tag 5</el-tag> -->
                                                </div>
                                                <el-button type="text" v-if="!drink.sugarDisabled || drink.tag" class="request-btn btn--burble" @click="openDetailsModel(drink)">{{$t('common.request')}} <el-icon><caret-right /></el-icon></el-button>
                                                <el-button type="text" v-else class="request-btn btn--burble" @click="requesWithoutSugar(drink)">{{$t("common.request")}} <el-icon><caret-right /></el-icon></el-button>

                                            </div>
                                        </div>
                                    </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-tab-pane>
            <OrderDetails :modelVisible="openModel" :key="drinkKey" @modelClose="openModel = false" :tagsOptions="tagsOptions" :drink="drink"/>
            </el-tabs>
        </div>
    </el-col>
        <el-col :span="6">
         <el-aside>
        <div  class="sidebar-bg room-sidebar" style="{ boxShadow: `var(--el-box-shadow-base)` }">
            <h3>{{$t('common.myOrders')}}</h3>
            <el-scrollbar height="400px">
                <div class="order-list">
                    <div class="order" v-for="(item, index) in theOrder" :key="item" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <p class="delete-order" @click="deleteOrder(index)">X</p>
                        <div>
                            <img :src="item.itemImageBytes" alt="">
                        </div>
                        <div class="data-wrapper">
                            <div class="token-title">
                                <!-- <p>token: 101</p> -->
                                <h3>{{$store.state.main.currentLocale == "en" ?item.name : item.name_Ar}}</h3>
                            </div>

                            <div class="specified">
                                <!-- <p><span>Specified</span> <span>Edit</span></p> -->
                                <div>
                                    <p> {{$t('common.Quantity')}}: </p> <el-input-number v-model="item.quantity" class="input-number" :min="1" />
                                    <!-- <p>Sugarless<span>5</span></p> -->
                                </div>
                                <div v-if="item.tag?.length"><p>{{$t('common.tags')}}:</p> {{item.tag.join()}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </el-scrollbar>
            <div class="btn-wrappers">
                <el-button type="text" class="">{{$t('common.cancel')}} </el-button>
                <el-button type="text" class="btn--burble" @click="order">{{$t('common.request')}}</el-button>
            </div>
        </div>
        </el-aside>
    </el-col>
</el-row>
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
            drink:{},
            tagsOptions:[],
            drinkKey:0
        }
    },
    mounted() {
        this.loadColdDrinks();
        this.loadHotDrinks();
    },
    methods: {
        loadColdDrinks(){
            axios.get(`MenuItem/${this.pageSize}/${this.pageNumber}/2/ListAllMenuItemsByCategory`).then(res => {
                this.coldDrinkList = res.menuItemResponseList;
                this.coldDrinkList.filter(drink => drink.quantity = 1);
            })
        },
        loadHotDrinks(){
            axios.get(`MenuItem/${this.pageSize}/${this.pageNumber}/1/ListAllMenuItemsByCategory`).then(res => {
                this.hotDrinkList = res.menuItemResponseList;
                this.hotDrinkList.filter(drink => drink.quantity = 1);
            })
        },
        handleRequestAttend(){
            let order = {
                "menuItemId": 1009,
                "quantity": 0,
                "sugarSpoon": [
                    ""
                ],
            }
            axios
            .post('Order/CreateOrder', order)
            .then(() => {
                this.successMessage();
            })
        },
        requesWithoutSugar(order){
             this.$store.commit('main/setOrder', order);
        },
        order(){
            let order = this.theOrder.map(item => { return {
                "menuItemId": item.id,
                quantity: item.quantity,
                sugarSpoon: [`${item.sugarSpoon? item.sugarSpoon: ''}`],
                tag: item.tag ? item.tag : []
            }})
            axios
            .post('Order/CreateOrderList', order)
            .then(() => {
                this.successfullyOrdered();
            })
        },
        deleteOrder(index){
            this.$store.commit('main/deleteOrder',index);
        },
        openDetailsModel({...drink}){
            this.drink.sugarSpoon = 1
            if (drink.tag?.length) {
               this.tagsOptions = drink.tag.split(',')
               drink.tag = []
            }
            this.drink = drink;
            this.openModel = true;
        },
        successfullyOrdered(){
            ElMessage({
                message: this.$t('common.successfullyOrdered'),
                type: 'success',
            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.attendsuccess'),
                type: 'success',
            })
        },
    },
    computed: {
        theOrder() {
            return this.$store.state.main.theOrder;
        }
    }
}
</script>



<style lang="scss">
 .order-tabs{
        text-align: center;

        .main-bg{
            height: 100%;
        }
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
            }
            &:hover{
                color: initial;
            }
        }
        .el-tabs__active-bar{
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
                    img {

                    }
            }
            .el-image{
                height: 150px;
                border-radius: 5px;
            }
            .title-rate{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                margin-bottom: 10px;
                margin-right: 10px;
                text-transform: capitalize;
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
                margin: 0 15px;
                width: 127px;
                i{
                    margin-left: 5px;
                    font-size: 20px;
                }
            }
            @media (max-width: 535px) { 
                flex-flow: column;
                align-items: center;
            }

        }

        .num-item{
            .el-input-number{
                width: 102px;
            }
        }
        .order-list{
            .order{
                position: relative;
                display:flex;
                margin-bottom:10px;
                border:1px solid #f1f3f4;
                background-color:#fff;
                padding-left:20px;
                padding-right:20px;
                .data-wrapper{
                    flex: 3;
                    .token-title{
                        margin-bottom:20px;
                        line-height: 3.4;
                        h3{
                            margin: 0 10px;
                        }
                    }
                }
                img{
                    width:50px;
                    height: 40px;
                    margin-top:20px;
                    // margin-right:20px;
                    border-radius: 6px;
                }
                p, h3{
                    margin:0;
                }
            }
            .specified{
                background-color:#f1f3f4;
                padding:6px;
                margin-bottom:10px;
                padding-top:6px;
                position:relative;
                > div {
                    display:flex;
                    p{
                        margin:0 10px;
                    }
                }
                > p {
                    margin-bottom:20px;
                    display:flex;
                    justify-content: space-between;
                    border-bottom: 1px dashed #b6b1b1;
                    padding-bottom: 9px;
                    span{
                        margin-left:0 !important;
                        &:first-child{
                            font-weight:bold;
                        }
                    }
                }
                p{
                    display:flex;
                    margin-right: 10px;
                    span{
                        margin-left:10px;
                    }
                }
                .el-input-number{
                    width: 100px;
                }
                // &:after{
                //     background-color: #fff;
                //     content: "";
                //     position: absolute;
                //     width: 20px;
                //     height: 20px;
                //     transform: rotate(129deg);
                //     left: -13px;
                //     top: 32px;
                // }
                // &:before{
                //     background-color: #fff;
                //     content: "";
                //     position: absolute;
                //     width: 20px;
                //     height: 20px;
                //     transform: rotate(129deg);
                //     right: -13px;
                //     top: 32px;
                // }
            }
        }

         .el-aside{
            width: 400px;
            margin-top: 20px;
            background-color: #f6f6f6;
            h3{
                margin: 0;
                margin-bottom: 10px;
            }
            .delete-order{
                position: absolute;
                right: 8px;
                top: -4px;
                cursor: pointer;
            }
        }
        .sidebar-bg{
            border: 1px solid #f3f1f3;
            background-color: #f1f3f4;
            padding: 10px 10px 10px 10px;
            border-radius: 7px;
            margin-bottom: 12px;
        }
        .sidebar-head{
            display: flex;
            align-items: center;
            // justify-content: end;
            background-color: #fff;
            .el-dropdown{
                margin-left: 10px;
                line-height: 2.2;
                position: relative;
                top: -4px;
                .el-dropdown-link .el-icon{
                    transform: rotate(90deg);
                }
            }
            .el-select.el-select--default{
                width: 70%;
            }
        }
        .btn-wrappers{
            margin-top: 10px;
            button{
                width:127px;
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
