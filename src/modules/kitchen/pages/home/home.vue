<template>
<div class="main-bg">
    <el-main>

        <!-- <el-button class="btn--burble reload-btn" @click="this.loadData">
            {{ $t('common.reload') }} <el-icon><RefreshRight /></el-icon>
        </el-button> -->
     <el-row :gutter="12" v-if="isRequestAttend">
        <h3 class="gray-title">{{$t('common.attendanceRequests')}}</h3>
            <el-col :xs="24" v-for="request in allRequstAttend" :key="request.id">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" v-if="userData">
                    <el-icon class="phone-icon"><phone /></el-icon>
                    <div class="title-time-wrapper">
                        <p class="title"> {{$t('common.requestToAttend')}} </p>
                        <p class="time"> {{request.creationDate}} </p>
                    </div>
                    <div class="requester-name">
                        <el-icon><avatar /></el-icon>
                        <p class="name"> {{request.createdByUser.name}} </p>
                    </div>
                    <div class="request-place" v-if="request.createdByUser.floor && request.createdByUser.floor != 'null' ">
                        <el-icon><school /></el-icon>
                        <p class="hall">{{request.createdByUser.floor}}</p>
                    </div>
                    <div class="request-place" v-if='request.createdByUser.seatNumber && request.createdByUser.seatNumber != "null" '>
                        <el-icon><school /></el-icon>
                        <p class="hall"> {{$t('common.seatNumber')}}: {{request.createdByUser?.seatNumber}}  </p>
                    </div>
                
                    <el-button class="confirmed-btn" @click="onConfirmed(request.id)">
                        <span>{{ $t('common.confirm') }} <el-icon><circle-check-filled /></el-icon> </span>
                        <!-- <span v-else>{{ $t('common.confirmed') }} <el-icon><circle-check-filled /></el-icon> </span> -->
                    </el-button>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12" class="list-all-order">
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
            <h4 class="no-request gray-title" v-if="!orders.length"> {{$t('common.noRequest')}} </h4>
        </el-row>
        <!-- <audio controls loop ref="player" id="player" class="audio-wrapper">
            <source src="@/assets/alert-bells-echo.wav" type="audio/wav">
            <source src="@/assets/alert-bells-echo.wav" type="audio/wav">
            Your browser does not support the audio element.
        </audio> -->
        <el-button class="btn--burble reload-btn" @click="loadMore" v-if="showLoadMore">
            {{ $t('common.loadMore') }} <el-icon><RefreshRight /></el-icon>
        </el-button>
        <OrderDetails :modelVisible="openModel" :selectdItem="selectdItem" @modelClose="openModel = false"/>
     </el-main>
</div>
</template>

<script>
import { Phone, Avatar, School, CircleCheckFilled, RefreshRight} from '@element-plus/icons';
import OrderDetails from './components/orderDetails.vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
   components:{Phone, Avatar, School, CircleCheckFilled, RefreshRight, OrderDetails },
   data() {
       return {
           id: this.$store.state.main.loggedUser.id || 0,
           value4:true,
           openModel:false,
           orders:[],
           selectdItem:{},
           userData:{},
           allRequstAttend:{},
           isRequestAttend:false,
           audio: "",
           getDataintervaL: "",
           pagingModel:{
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
            axios.get(`Order/${this.id}/${this.pageSize}/${this.pageNumber}/GetOrdersListByCreatedUserId`).then(res => {
                    console.log('load 1', res);
                this.pagingModel = res.pagingModel;
                this.orders =  res.orders.filter(order => order.statusId == 1) ;
                this.userData = res.userData
                this.orders.filter(order =>  order.status = true); // add status in every order
                if(this.orders.length > 0){
                    this.startAudio();
                }
                this.allRequstAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3); // get the request attend
                this.isRequestAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3).length ? true : false;
                this.orders = this.orders.filter(order => order.menuItem.categoryStatusId != 3); // remove request attend
                //this.isRequestAttend && this.startAudio();
                // this.startAudio()

                this.getDataintervaL = setInterval( () => {this.loadDataWitoutLoading(); },20000);

            })
        },
        loadDataWitoutLoading(){
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
                instance.get(`Order/${this.id}/${this.pageSize}/${this.pageNumber}/GetOrdersListByCreatedUserId`).then(res => {
                    console.log('load 2', res);
                    this.pagingModel = res.data.pagingModel;
                    this.orders = res.data.orders.filter(order => order.statusId == 1)
                    this.userData = res.data.userData
                    this.orders.filter(order =>  order.status = true); // add status in every order
                    this.allRequstAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3); // get the request attend
                    this.isRequestAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3).length ? true : false;
                    console.log('this.orders.length', this.orders.length)
                    console.log('res.data.orders.length', res.data.orders.length)
                    console.log(' this.allRequstAttend', this.allRequstAttend.length)
                    console.log('orderNum', orderNum)
                    if(this.orders.length > 0 && res.data.orders.length > orderNum ){
                        this.startAudio();
                    }
                    this.orders = this.orders.filter(order => order.menuItem.categoryStatusId != 3); // remove request attend                    
            })
        },
        loadMore(){
            this.pageSize += 10;
            this.loadData();
        },
        onConfirmed(id){
            axios
            .put(`Order/${id}/ConfirmOrder`)
            .then(() => {
                // this.successMessage();
                // this.stopAudio();
                this.loadDataWitoutLoading();
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
       showLoadMore(){
           return (this.orders.length + this.allRequstAttend.length) < this.pagingModel.totalCount
       },
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

    @include rtl() {
         .reload-btn{
             i{
                margin-right:10px;
             }
         }
    }
</style>