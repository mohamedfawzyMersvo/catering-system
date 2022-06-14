<template>
<div class="main-bg">
    <el-main>
        <!-- <el-button class="btn--burble reload-btn" @click="this.loadData">
            {{ $t('common.reload') }} <el-icon><RefreshRight /></el-icon>
        </el-button> -->
     <el-row :gutter="12" v-if="isRequestAttend">
        <h3 class="gray-title">{{$t('common.attendanceRequests')}}</h3>
            <el-col :xs="24" v-for="request in allRequstAttend" :key="request.id">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card">
                    <el-icon class="phone-icon"><phone /></el-icon>
                    <div class="title-time-wrapper">
                        <p class="title"> {{$t('common.requestToAttend')}} </p>
                        <p class="time"> {{request.creationDate}} </p>
                    </div>
                    <div class="requester-name">
                        <el-icon><avatar /></el-icon>
                        <p class="name"> {{userData.name}} </p>
                    </div>
                    <div class="request-place">
                        <el-icon><school /></el-icon>
                        <p class="hall">{{userData.floor}}</p>
                    </div>
                    <div class="request-place" v-if="userData.seatNumber">
                        <el-icon><school /></el-icon>
                        <p class="hall"> {{$t('common.seatNumber')}}: {{userData.seatNumber}}  </p>
                    </div>
                
                    <el-button class="confirmed-btn" @click="onConfirmed(request.id)">
                        <span v-if="!audioStopped">{{ $t('common.confirm') }} <el-icon><circle-check-filled /></el-icon> </span>
                        <span v-else>{{ $t('common.confirmed') }} <el-icon><circle-check-filled /></el-icon> </span>
                    </el-button>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <h3 class="gray-title">{{$t('common.customerRequests')}} </h3>
            <el-col :xs="24" v-for="order in orders" :key="order.id">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" @click="openDetailsModel(order)">
                    <img class="order-img" :src="order.menuItem.itemImageBytes" />
                    <div class="title-time-wrapper">
                        <p class="title"> {{$store.state.main.currentLocale == "en" ? order.menuItem.name : order.menuItem.name_Ar}} </p>
                        <p class="time"> {{order.creationDate}} </p>
                    </div>
                    <div class="requester-name">
                        <el-icon><avatar /></el-icon>
                        <p class="name"> {{userData.name}} </p>
                    </div>
                    <div class="request-place">
                        <el-icon><school /></el-icon>
                        <p class="hall"> {{userData.floor}}  {{i}}  </p>
                    </div>
                    <div class="request-place" v-if="userData.seatNumber">
                        <el-icon><school /></el-icon>
                        <p class="hall"> {{$t('common.seatNumber')}}: {{userData.seatNumber}}  </p>
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

        <OrderDetails :modelVisible="openModel" :selectdItem="selectdItem" @modelClose="openModel = false"/>
     </el-main>
</div>
</template>

<script>
import { Phone, Avatar, School, CircleCheckFilled} from '@element-plus/icons';
import OrderDetails from './components/orderDetails.vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
   components:{Phone, Avatar, School, CircleCheckFilled, OrderDetails },
   data() {
       return {
           id: this.$store.state.main.loggedUser.id || 0,
           value4:true,
           openModel:false,
           orders:[],
           selectdItem:{},
           userData:{},
           audioStopped:false,
           allRequstAttend:{},
           isRequestAttend:false,
       }
   },
   mounted() {    
    this.loadData();
    this.startAudio();
   },
   methods: {
        loadData(){
            // console.log('axios.defaults.baseURL', axios.defaults.baseURL);
            axios.get(`Order/${this.id}/GetOrdersListByCreatedUserId`).then(res => {
                this.orders = res.orders.filter(order => order.statusId == 1);
                this.userData = res.userData
                this.orders.filter(order =>  order.status = true); // add status in every order
                this.allRequstAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3); // get the request attend
                this.isRequestAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3).length ? true : false;
                this.orders = this.orders.filter(order => order.menuItem.categoryStatusId != 3); // remove request attend
                this.isRequestAttend && this.startAudio();
                // this.startAudio()

                setInterval( () => {this.loadDataWitoutLoading(); },7000);

            })
        },
        loadDataWitoutLoading(){
            const token = this.$store.state.main.token
            var instance = axios.create({
                baseURL: axios.defaults.baseURL,
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
                instance.get(`Order/${this.id}/GetOrdersListByCreatedUserId`).then(res => {
                    this.orders = res.orders.filter(order => order.statusId == 1);
                    this.userData = res.userData
                    this.orders.filter(order =>  order.status = true); // add status in every order
                    this.allRequstAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3); // get the request attend
                    this.isRequestAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3).length ? true : false;
                    this.orders = this.orders.filter(order => order.menuItem.categoryStatusId != 3); // remove request attend
            })
        },
        // loadData(){
        //     const headers = { ['Authorization'] :  this.$store.state.main.token};
        //     fetch(`${axios.defaults.baseURL}Order/${this.id}/GetOrdersListByCreatedUserId`,{headers} )
        //     .then(response => response.json())
        //     .then(res => {
        //         this.orders = res.orders.filter(order => order.statusId == 1);
        //         this.userData = res.userData
        //         this.orders.filter(order =>  order.status = true); // add status in every order
        //         this.allRequstAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3); // get the request attend
        //         this.isRequestAttend = this.orders.filter(order => order.menuItem.categoryStatusId == 3).length ? true : false;
        //         this.orders = this.orders.filter(order => order.menuItem.categoryStatusId != 3); // remove request attend
        //     })
        // },
        onConfirmed(id){
            axios
            .put(`Order/${id}/ConfirmOrder`)
            .then(() => {
                // this.successMessage();
                // this.stopAudio();
                this.loadData();
            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyOrdered'),
                type: 'success',
            })
        },
        startAudio(){
            var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');               
            audio.play();
        },
        stopAudio(){
            let ply = document.getElementById('player');
            ply.src = "";
            this.audioStopped = true;
        },
       openDetailsModel(selectdItem){
           this.selectdItem = selectdItem;
           this.openModel = true;
       }
   },
    
}
</script>

<style lang="scss">
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