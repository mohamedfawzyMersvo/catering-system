<template>
<div class="main-bg">
    <el-main>

        <el-button v-if="showBreakBtn" class="break-btn" :style="{ boxShadow: `var(--el-box-shadow-base)` }" @click="breakTime">
            {{ $t('common.break') }} <el-icon><AlarmClock /></el-icon> 
        </el-button>
        <div class="all-orders">
             <el-row :gutter="12">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" v-for="order in orders" :key="order.orderNumber">
                    <div class="order">
                        <div class="order-title">
                            <p><span class="time">{{order.items[0].creationDate}} </span> <span class="id">#{{order.orderNumber}}</span>  </p>
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
                                <!-- <input type="checkbox" v-model="order.status" class="switch" @click.stop @change="onConfirmed(order.orderNumber)" :data-checked="$t('common.serve')" :data-before="$t('common.served')"> -->
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
import { AlarmClock} from '@element-plus/icons';
import OrderDetails from './components/orderDetails.vue';
import axios from 'axios'

export default {
   components:{ AlarmClock, OrderDetails },
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
    //this.startAudio();
   },
   methods: {
        loadData(){
            axios.get(`Order/${this.pageSize}/${this.pageNumber}/GetOrdersListByCreatedUserId`).then(res => {
                this.paginationModel = res.paginationModel;
                this.orders = res.orders
                this.orders.forEach(element => {
                    element.items.filter(order => order.statusId == 2) ; // the served only
                    element.status = true; // add status in every order

                });
                

                this.allRequstAttend = this.orders.filter(order => order.items[0].categoryStatusId == 3); // get the request attend
                this.isRequestAttend = this.orders.filter(order => order.items[0].categoryStatusId == 3).length ? true : false;
                this.orders = this.orders.filter(order => order.items.some(drink => drink.categoryStatusId != 3)); // remove request attend
                

                this.getDataintervaL = setInterval( () => {this.loadDataWitoutLoading(); },20000);

            })
        },
        loadMore(){
            this.pageSize += 10;
            this.loadData();
        },


   },

    
}
</script>

<style lang="scss">

</style>