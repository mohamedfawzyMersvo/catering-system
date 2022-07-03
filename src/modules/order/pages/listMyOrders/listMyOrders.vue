<template>
<div class="main-bg">
    <el-main>

        <!-- <el-button class="btn--burble reload-btn" @click="this.loadData">
            {{ $t('common.reload') }} <el-icon><RefreshRight /></el-icon>
        </el-button> -->
  
        <el-row :gutter="12" class="list-my-order">
            <h3 class="gray-title">{{$t('common.customerRequests')}} </h3>
            <el-col :xs="24" v-for="order in orders" :key="order.id">
                <el-card shadow="never" :style="{ boxShadow: `var(--el-box-shadow-base)` }" class="request-card" v-if="userData" @click="openDetailsModel(order)">
                    <img class="order-img" :src="order.menuItem.itemImageBytes || 'https://media.istockphoto.com/vectors/immediate-immediately-vector-id1097680374?k=20&m=1097680374&s=170667a&w=0&h=_97FL1mFmapFRImXGdIp6S7dNtMo9XNQ0kdX2c13PIU='" />
                    
                    <div class="title-time-wrapper">
                        <p class="title"> {{$store.state.main.currentLocale == "en" ? order.menuItem.name : order.menuItem.name_Ar}} </p>
                        <p class="time"> {{order.creationDate}} </p>
                    </div>
                    <!-- <div class="requester-name">
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
                    </div> -->
                
                    <el-button class="btn--burble cancel-btn" @click="onCanceld(order)">
                        {{ $t('common.cancel') }}
                    </el-button>
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
        <!-- <OrderDetails :modelVisible="openModel" :selectdItem="selectdItem" @modelClose="openModel = false"/> -->
     </el-main>
</div>
</template>

<script>
import { RefreshRight} from '@element-plus/icons';
// import OrderDetails from './components/orderDetails.vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
   components:{  RefreshRight },
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
   },
   methods: {
        loadData(){
            axios.get(`Order/${this.id}/${this.pageSize}/${this.pageNumber}/GetOrdersListByCreatedUserId`).then(res => {
                this.pagingModel = res.pagingModel;
                this.orders =  res.orders.filter(order => order.statusId == 1) ;
                this.userData = res.userData
                this.orders.filter(order =>  order.status = true); // add status in every order
                
                // this.orders = this.orders.filter(order => order.menuItem.categoryStatusId != 3); // remove request attend
    
            })
        },
        loadMore(){
            this.pageSize += 10;
            this.loadData();
        },
        onCanceld({id}){
            axios
            .delete(`Order/CancelOrder/${id}`)
            .then(() => {
                this.successMessage();
                this.loadData();
            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyCanceld'),
                type: 'success',
            })
        },
   },
   computed: {
       showLoadMore(){
           return (this.orders.length + this.allRequstAttend.length) < this.pagingModel.totalCount
       },
   },
   unmounted() {
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
    .cancel-btn{
        margin-top: 20px !important;
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