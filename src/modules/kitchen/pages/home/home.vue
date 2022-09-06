<template>
<div class="main-bg">
    <el-main>

        <el-button :disabled="!showBreakBtn" class="break-btn" :style="{ boxShadow: `var(--el-box-shadow-base)` }" @click="breakTime">
            {{ $t('common.break') }} <el-icon><AlarmClock /></el-icon> 
        </el-button>
     <el-row :gutter="12" v-if="isRequestAttend">
        <h3 class="gray-title">{{$t('common.attendanceRequests')}}</h3>
            <el-col :xs="24" v-for="requestAttend in allRequstAttend" :key="requestAttend.orderNumber">
                <div v-for="request in requestAttend.items" :key="request.id">
                    <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card">
                        <el-icon class="phone-icon"><phone /></el-icon>
                        <div class="title-time-wrapper">
                            <p class="title"> {{$t('common.requestToAttend')}} </p>
                            <p class="time"> {{request.creationDate}} </p>
                        </div>

                        <div class="requester-name">
                            <el-icon><avatar /></el-icon>
                            <p class="name"> {{$store.state.main.currentLocale == "en" ? request.menuItemName : request.menuItemNameAr}} </p>
                        </div>

                        <div class="request-place" v-if="request.floor && request.floor != 'null' ">
                            <el-icon><school /></el-icon>
                            <p class="hall">{{request.floor}}</p>
                        </div>

                        <div class="request-place" v-if='request.seatNumber && request.seatNumber != "null" '>
                            <el-icon><school /></el-icon>
                            <p class="hall"> {{$t('common.seatNumber')}}: {{request?.seatNumber}}  </p>
                        </div>
                    
                        <el-button class="confirmed-btn" @click="onConfirmed(requestAttend.orderNumber)">
                            <span>{{ $t('common.confirm') }} <el-icon><circle-check-filled /></el-icon> </span>
                            <!-- <span v-else>{{ $t('common.confirmed') }} <el-icon><circle-check-filled /></el-icon> </span> -->
                        </el-button>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <!-- <el-row :gutter="12" class="list-all-order">
            <h3 class="gray-title">{{$t('common.customerRequests')}} </h3>
            <el-col :xs="24" v-for="order in orders" :key="order.id">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" v-if="userData" @click="openDetailsModel(order)">
                    <img class="order-img" :src="order.menuItem.itemImageBytes" />
                    
                    <div class="title-time-wrapper">
                        <p class="title"> {{$store.state.main.currentLocale == "en" ? order.menuItem.name : order.menuItem.name_Ar}} </p>
                        <p class="time"> {{order.creationDate}} </p>
                    </div>
                    <div class="requester-name">
                        <el-icon><avatar /></el-icon>
                        <p class="name"> {{order.createdByUser?.name}} </p>
                    </div>

                    <div class="request-place" v-if="order.createdByUser?.floor && order.createdByUser?.floor != 'null'">
                        <el-icon><school /></el-icon>
                        <p class="hall"> {{order.createdByUser?.floor}}  {{i}}  </p>
                    </div>

                    <div class="request-place" v-if="order.createdByUser.seatNumber && order.createdByUser.seatNumber != 'null'">
                        <el-icon><school /></el-icon>
                        <p class="hall"> {{$t('common.seatNumber')}}: {{order.createdByUser.seatNumber}}  </p>
                    </div>
                
                    <input type="checkbox" v-model="order.status" class="switch" @click.stop @change="onConfirmed(order.id)" :data-checked="$t('common.serve')" :data-before="$t('common.served')">
                </el-card>
            </el-col>
            <h4 class="no-request gray-title" v-if="!orders.length"> {{$t('common.noRequest')}} </h4> -->

        <!-- </el-row> -->
        <!-- <audio controls loop ref="player" id="player" class="audio-wrapper">
            <source src="@/assets/alert-bells-echo.wav" type="audio/wav">
            <source src="@/assets/alert-bells-echo.wav" type="audio/wav">
            Your browser does not support the audio element.
        </audio> -->
        <el-button class="btn--burble reload-btn" @click="loadMore" v-if="showLoadMore">
            {{ $t('common.loadMore') }} <el-icon><RefreshRight /></el-icon>
        </el-button>

        <div class="all-orders">
             <el-row :gutter="12">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" v-for="order in orders" :key="order.orderNumber">
                    <div class="order">
                        <div class="order-title">
                            <p><span class="time" :class="{ 'is-late': notifyIfOrderDelyed(order.items[0].creationDate) }">{{order.items[0].creationDate}} </span> <span class="id">#{{order.orderNumber}}</span>  </p>
                        </div>
                        <div v-for="(item, index) in order.items" :key="item.id">
                            <div class="order-list">
                                {{$store.state.main.currentLocale == "en" ? item.menuItemName : item.menuItemNameAr}}  <span class="num">{{item.quantity}}</span>
                            </div>
                            <p v-if="item.tag">{{$t('common.tags')}}: {{item.tag}} </p>
                            <p v-if="item.sugarSpoon">{{$t('common.sugar')}}: {{item.sugarSpoon}} </p>

                            <div class="order-place" v-if="index == order.items.length -1">
                                <div>
                                    <p>{{$t('common.floor')}}</p>
                                    <p>{{item?.floor}}</p>
                                </div>
                                <div>
                                    <p>{{$t('common.room')}}</p>
                                    <p>{{item.createdByName}}</p>
                                </div>
                                <div v-if="item.seatNumber && item.seatNumber != 'null' ">
                                    <p>{{$t('common.seatNumber')}}</p>
                                    <p> {{item?.seatNumber}}</p>
                                </div>
                            </div>
                            <div class="order-submit" v-if="index == order.items.length -1">
                                <input type="checkbox" v-model="order.status" class="switch" @click.stop @change="onConfirmed(order.orderNumber)" :data-checked="$t('common.serve')" :data-before="$t('common.served')">
                            </div>
                        </div>

                    </div>
                </el-col>
            </el-row>
        </div>
        <OrderDetails :modelVisible="openModel" :selectdItem="selectdItem" @modelClose="openModel = false"/>
     </el-main>
</div>
</template>

<script>
import { Phone, Avatar, School, CircleCheckFilled, AlarmClock} from '@element-plus/icons';
import OrderDetails from './components/orderDetails.vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
   components:{Phone, Avatar, School, CircleCheckFilled, AlarmClock, OrderDetails },
   data() {
       return {
           id: this.$store.state.main.loggedUser.id || 0,
           value4:true,
           openModel:false,
           orders:[],
           selectdItem:{},
           allRequstAttend:{},
           isRequestAttend:false,
           audio: "",
           getDataintervaL: "",
           paginationModel:{
            totalCount:0
           },
           pageSize: 10,
           pageNumber: 1,

       }
   },
   mounted() {    
    this.loadData();
    this.audio = new Audio('https://www.orangefreesounds.com/wp-content/uploads/2021/08/Apartment-door-chime-sound-effect.mp3');               

    //this.startAudio();
   },
   methods: {
        loadData(){
            axios.post(`Order/GetOrdersListByCreatedUserId`,{
                "pageSize": this.pageSize,
                "pageNumber": this.pageNumber,
                "statusId":1
            }).then(res => {
                this.paginationModel = res.paginationModel;
                this.orders = res.orders
                this.orders.forEach(element => {
                    element.items.filter(order => order.statusId == 1) ; // the unserved only
                    element.status = true; // add status in every order
                    if(element.items.length > 0){
                        this.startAudio();
                    }

                });
                

                this.allRequstAttend = this.orders.filter(order => order.items[0].categoryStatusId == 3); // get the request attend
                this.isRequestAttend = this.orders.filter(order => order.items[0].categoryStatusId == 3).length ? true : false;
                this.orders = this.orders.filter(order => order.items.some(drink => drink.categoryStatusId != 3)); // remove request attend
                

                this.getDataintervaL = setInterval( () => {this.loadDataWitoutLoading(); },20000);

            })
        },
        loadDataWitoutLoading(){ // load in the background without loader
           let orderNum = this.orders.length + this.allRequstAttend.length;
            const token = this.$store.state.main.token
            var instance = axios.create({
                baseURL: axios.defaults.baseURL,
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
                instance.post(`Order/GetOrdersListByCreatedUserId`, {
                    "pageSize": this.pageSize,
                    "pageNumber": this.pageNumber,
                    "statusId":1
                }).then(res => {
                    this.paginationModel = res.data.paginationModel;
                    this.orders = res.data.orders
                    this.orders.forEach(element => {
                    element.items.filter(order => order.statusId == 1) ; // the unserved only
                    element.status = true; // add status in every order
                });
                
                this.allRequstAttend = this.orders.filter(order => order.items[0].categoryStatusId == 3); // get the request attend
                this.isRequestAttend = this.orders.filter(order => order.items[0].categoryStatusId == 3).length ? true : false;
                this.orders = this.orders.filter(order => order.items.some(drink => drink.categoryStatusId != 3)); // remove request attend

                if(this.orders.length > 0 && res.data.orders.length > orderNum ){
                    console.log("audio");
                    this.startAudio();
                }
            })
        },
        loadMore(){
            this.pageSize += 10;
            this.loadData();
        },
        breakTime(){
            axios
            .put(`UserManagement/SetKitchenInBreak`)
            .then((res) => {
              this.breakSuccessMessage();
              setTimeout(() => { this.stopTheBreak() }, res.breakTime * 60 * 1000);
            })
        },
        stopTheBreak(){
            axios
            .put(`UserManagement/SetKitchenAvailable`)
            .then(() => {
                
            })
        },
        onConfirmed(id){
            axios
            .put(`Order/${id}/ConfirmOrder`)
            .then(() => {
                // this.successMessage();
                // this.stopAudio();
                // this.loadDataWitoutLoading();
            })
        },
        notifyIfOrderDelyed(orderCreationDate){
          
            var date = new Date();
            let delayTime = 10;


            orderCreationDate = orderCreationDate.split(':');


            // if the Hour bigger
            if ((date.getHours() - 1) > orderCreationDate[0]) return true // getHours -1 for ksa time

            // if else the hour equal and the minuts bigger
            if ((date.getHours() - 1) == orderCreationDate[0] && date.getMinutes() >= orderCreationDate[1] && date.getMinutes() - orderCreationDate[1] >= delayTime) return true
            return false
        },
        breakSuccessMessage(){
            ElMessage({
                message: this.$t('common.successfullyBreak'),
                type: 'success',
            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyOrdered'),
                type: 'success',
            })
        },
        startAudio(){
            this.audio.play();
            // setTimeout(this.stopAudio(), 5000)
            
        },
        stopAudio(){
            console.log('dest')
            this.audio.currentTime = 0;
            this.audio.src = "";
        },

       openDetailsModel(selectdItem){
           this.selectdItem = selectdItem;
           this.openModel = true;
       }
   },
   computed: {
    //    showLoadMore(){
    //        return (this.orders.length + this.allRequstAttend.length) < this.pagingModel.totalCount
    //    },

    showBreakBtn(){
      return this.$store.state.main.loggedUser.alertnativeKitchenId ? true : false;

        
    }
   },
   unmounted() {
    this.stopAudio();
    clearInterval(this.getDataintervaL); //stop that interval
   }
    
}
</script>

<style lang="scss">
    .list-all-order{
        margin-bottom: 20px;
    }
    .el-col {
        margin-bottom: 10px;
    }
    .confirmed-btn{
        background-color: var(--default-second-color) !important;
        color: #f8f8f8 !important;
        border-radius: 8px !important;
        font-weight: bolder;
        i{
            margin-left: 10px;
        }
    }
    .order-img{
        width: 103px;
        height: 78px;
        border-radius: 15%;
    }
    .audio-wrapper{
        // display: none;
    }
    .no-request{
        margin: 120px auto;
        font-size: 20px;
    }
    .reload-btn{
        margin-top: 20px !important;
        display: block !important;
        margin: auto !important;
        line-height: 0.5;
        i{
            margin-left:10px;
            font-size: 15px;
        }
    }

    .break-btn{
        display: block !important;
        margin-left: auto !important;
        i{
            margin: 0 10px;
        }
    }
    // new design
    .all-orders{
        margin-top: 20px;
        .order{
            padding:20px 10px;
            background-color: #fff;
            border-radius: 7px;
            p {
                margin:0;
            }
            .time{
                font-size: 24px;
                font-weight: bold;
                margin-right: 20px;
                margin-left: 20px;
                margin-bottom: 15px;
                display: inline-block;
                &.is-late{
                    // color:red;
                    // box-shadow: 0 0 1px 1px red;
                    padding: 0 10px;
                    animation: color-change 1s infinite;
                }
            }
            .id{

            }

            .order-list{
                background-color: #f6f6f6;
                height: 45px;
                display: flex;
                align-items: center;
                padding: 0 10px;
                border-radius: 5px;
                margin-bottom: 10px;
                .num{
                    display: inline-block;
                    background: #fff;
                    border-radius: 5px;
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    margin: 0 15px;
                }
            }
        }
        .order-place{
            display: flex;
            justify-content: space-around;
            text-align: center;
            margin-top: 20px;
            // div:nth-child(2){
            //     border-right: 3px solid #f6f6f6;
            //     padding: 0 43px;
            // }
            // div:last-child{
            //     border-left: 3px solid #f6f6f6;
            // }
        }
        .order-submit{
            margin-top: 20px;
            display:flex;
            justify-content: center;
        }
    }
    @keyframes color-change {
        0% { color: red;box-shadow: 0 0 1px 1px red; }
        50% { color: #000; box-shadow: 0 0 1px 1px transparent}
        100% { color: red; box-shadow: 0 0 1px 1px red}
    }

    @include rtl() {
         .reload-btn{
             i{
                margin-right:10px;
             }
         }
         .break-btn{
            display: block !important;
            margin-right: auto;
            margin-left: 0 !important;
         }
    }
</style>