<template>
        <div class="main-bg">
        <el-row>
            <el-col :span="24">
                <div class="page-header">
                  <p><span class="pointer"  @click="
                            $router.push({
                                name: `reports`,
                            })
                        "> {{$t('common.reports')}} </span >/ {{$t('common.room')}}</p>
                  <div> 
                  </div>
                </div>
            </el-col>
        </el-row>
        <el-main>
            <div class="all-orders">
                     <el-row :gutter="12">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="order"  v-for="(item) in orderDetails" :key="item.id">
                    <div class="order-title">
                        <p><span class="time">{{item.creationDate}} </span> <span class="id">#{{$route.params.number}}</span>  </p>
                    </div>
                    <div>
                        <div class="order-list">
                            {{$store.state.main.currentLocale == "en" ? item.menuItemName : item.menuItemNameAr}}  <span class="num">{{item.quantity}}</span>
                        </div>
                        <p v-if="item.tag">{{$t('common.tags')}}: {{item.tag}} </p>
                        <p v-if="item.sugarSpoon">{{$t('common.sugar')}}: {{item.sugarSpoon}} </p>

                        <div class="order-place">
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
                    </div>
                </div>
 </el-col>
            </el-row>
            </div>
        </el-main>
    </div>   
</template>

<script>
    import axios from 'axios'

export default {
    data() {
        return {
            orderDetails:[],
            pagingModel:{},
            pageSize: 10,
            pageNumber: 1,
        }
    },
    mounted(){
        this.loadItem();
    },
    methods: {
        loadItem(){
            axios.get(`Order/${this.$route.params.number}/GetOrderDetailsByOrderNumber`).then(res => {
                this.orderDetails = res.result.items;
            })
        },
    },
}
</script>

<style lang="scss">
    .room-details-items{
        display: flex;
        .room-details-item{
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            div{
                display: flex;
                flex-flow: column;
                margin-right: 20%;
                p{
                    margin: 0;
                }
            } 
        }
    }
</style>
