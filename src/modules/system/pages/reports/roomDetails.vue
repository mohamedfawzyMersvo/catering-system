<template>
        <div class="main-bg">
        <el-row>
            <el-col :span="24">
                <div class="page-header">
                  <p><span class="pointer"  @click="
                            $router.push({
                                name: `reports`,
                            })
                        "> {{$t('common.reports')}} </span >/ {{this.$route.params.type == "room" ? $t('common.room') : $t('common.kitchen')}}</p>
                  <div> 
                  </div>
                </div>
            </el-col>
        </el-row>
            <h2 class="room-title">{{this.$route.params.type == "room" ? roomOrders[0]?.createdByName : roomOrders[0]?.kitchenName}}</h2>
            <p class="range-date" style="padding:0 20px;"> <span v-if="$route.params.from">{{$t('common.from')}} {{$route.params.from}}</span> <span v-if="$route.params.from && $route.params.to">------- </span> <span v-if="$route.params.to">{{$t('common.to')}} {{$route.params.to}}</span></p>
        <el-main>
            <!-- {{this.$route.params.id}}
            {{this.$route.params.from}}
            {{this.$route.params.to}} -->
            <el-row :gutter="12" class="room-details-items">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="item in roomOrders" :key="item.roomId">
                   <div style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <div class="room-details-item" @click="goToSingle(item)">
                            <div>
                                <p>{{$t('common.number')}}</p>
                                <p>{{item.orderNumber}}</p>
                            </div>
                            <div>
                                <p>{{$t('common.dateTime')}}</p>
                                <p>{{item.creationDate}} {{item.creationDateHour}}</p>
                            </div>
                            <div>
                                <p>{{ this.$route.params.type == "room" ? $t('common.kitchen') : $t('common.room') }}</p>
                                <p>{{ this.$route.params.type == "room" ? item.kitchenName : item.createdByName}}</p>
                            </div>
                        </div>
                   </div>
                </el-col>
            </el-row>
            <div class="pagination-block">
                <el-pagination
                    :currentPage="currentPage"
                    :page-size="pagingModel.pageSize"
                    :total="pagingModel.totalCount"
                    :small="small"
                    :disabled="disabled"
                    :background="true"
                    layout=" prev, pager, next"
                    @current-change="handleCurrentChange"
                    >
                </el-pagination>
            </div>
        </el-main>
    </div>   
</template>

<script>
    import axios from 'axios'

export default {
    data() {
        return {
            roomOrders:[],
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
            axios.post(`Order/GetOrdersListForReportDetail`, {         
                "roomId": this.$route.params.type == "room" ? this.$route.params.id : 0,
                "kitchenId": this.$route.params.type == "kitchen" ? this.$route.params.id : 0,
                "menuItemId": this.$route.params.type == "drink" ? this.$route.params.id : 0,
                "creationDateFrom": this.$route.params.from,
                "creationDateTo": this.$route.params.to,
                "pageSize": this.pageSize,
                "pageNumber": this.pageNumber
            }).then(res => {
                console.log('res.result.orders', res.result.orders)
                this.roomOrders = res.result.orders;
                this.pagingModel = res.result.paginationModel;
            })
        },
        goToSingle(item){
            this.$router.push({
                name: 'room-single'
                , params: {number: item.orderNumber}
            })
        },
    },
}
</script>

<style lang="scss">
    .room-title{
        padding: 0 20px;
    }
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
    @include rtl() {
         .room-details-item{
            div{
                margin-right: 0;
                margin-left: 20%;
            }
         }
    }
</style>
