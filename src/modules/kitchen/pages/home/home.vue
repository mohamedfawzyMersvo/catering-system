<template>
<div class="main-bg">
    <el-main>
        <el-button class="btn--burble confirmed-btn" @click="startAudio">
            Work
        </el-button>
     <el-row :gutter="12">
            <el-col :xs="24">
                <h3 class="gray-title">Attendance requests </h3>
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
                    <!-- <el-switch
                        v-model="value4"
                        class="ml-2"
                        inline-prompt
                        :active-icon="Check"
                        :inactive-icon="Close"
                    /> -->
                    <!-- <input type="checkbox" class="switch" data-checked="ON" data-before="OFF"> -->
                    <el-button class="btn--burble confirmed-btn" @click="stopAudio">
                        <span v-if="!audioStopped">{{ $t('common.confirm') }} <el-icon><circle-check-filled /></el-icon> </span>
                        <span v-else>{{ $t('common.confirmed') }} <el-icon><circle-check-filled /></el-icon> </span>
                    </el-button>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <h3 class="gray-title">Customer requests </h3>
            <el-col :xs="24" v-for="order in orders" :key="order.id">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" @click="openDetailsModel(order)">
                    <img class="order-img" :src="order.menuItem.itemImageBytes" />
                    <div class="title-time-wrapper">
                        <p class="title"> {{$store.state.main.currentLocale == "en" ? order.menuItem.name : order.menuItem.name_Ar}} </p>
                        <p class="time"> {{order.menuItem.creationDate}} </p>
                    </div>
                    <div class="requester-name">
                        <el-icon><avatar /></el-icon>
                        <p class="name"> moha fawzy </p>
                    </div>
                    <div class="request-place">
                        <el-icon><school /></el-icon>
                        <p class="hall"> floor {{i}}  </p>
                    </div>
                    <!-- <el-switch
                        v-model="value4"
                        class="ml-2"
                        inline-prompt
                       
                        active-text="Yj"
                        inactive-text="N"
                    >
                    </el-switch> -->
                    <input type="checkbox" class="switch" @click.stop data-checked="Served" data-before="Serve">
                </el-card>
            </el-col>
        </el-row>
        <audio autoplay controls loop hidden ref="player" id="player" class="audio-wrapper">
            <source src="@/assets/alert-bells-echo.wav" type="audio/wav">
            <source src="@/assets/alert-bells-echo.wav" type="audio/wav">
            Your browser does not support the audio element.
        </audio>
        <OrderDetails :modelVisible="openModel" :selectdItem="selectdItem" @modelClose="openModel = false"/>
     </el-main>
</div>
</template>

<script>
import { Phone, Avatar, School, CircleCheckFilled} from '@element-plus/icons';
import OrderDetails from './components/orderDetails.vue';
import axios from 'axios'

export default {
   components:{Phone, Avatar, School, CircleCheckFilled, OrderDetails },
   data() {
       return {
           id: this.$store.state.main.loggedUser.id || 0,
           value4:true,
           openModel:false,
           orders:[],
           selectdItem:{},
           audioStopped:false,
       }
   },
   mounted() {
       this.loadData();
    //    window.setInterval(() => {
    //         this.loadData()
    //    },1000);
   },
   methods: {
       fireee() {
           document.getElementById("player").click();
       },
        loadData(){
            axios.get(`Order/${this.id}/GetOrdersListByCreatedUserId`).then(res => {
                this.orders = res.orders;
                this.startAudio()
            })
        },
        onConfirmed(){
            axios
            .post('Order/{id}/ConfirmOrder',)
            .then(() => {
                this.successMessage();
                this.handleClose();
            })
        },
        startAudio(){
            let ply = document.getElementById('player');
            ply.play();
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
        i{
            margin-left: 10px;
        }
    }
    .order-img{
        width: 103px;
        height: auto;
        border-radius: 15%;
    }
    .audio-wrapper{
        // display: none;
    }

    @include rtl() {
  
    }
</style>