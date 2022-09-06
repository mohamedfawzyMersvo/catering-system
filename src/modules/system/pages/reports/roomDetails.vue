<template>
        <div class="main-bg">
        <el-row>
            <el-col :span="24">
                <div class="page-header">
                  <p><span class="pointer"  @click="
                            $router.push({
                                name: `reports`,
                            })
                        "> {{$t('common.reports')}} </span >/ {{this.$route.params.type == "room" ? $t('common.room') : this.$route.params.type == "kitchen" ? $t('common.kitchen') : $t('common.drinks')}}</p>
                  <div> 
                  </div>
                </div>
            </el-col>
        </el-row>
        <el-main>
            <div id="divToPrint">
                <div class="details-head">
                    <div>
                        <h2 class="room-title">{{this.$route.params.type == "room" ? roomOrders[0]?.createdByName : this.$route.params.type == "kitchen" ? roomOrders[0]?.kitchenName : $store.state.main.currentLocale == "en" ? roomOrders[0]?.menuItemName : roomOrders[0]?.menuItemNameAr}}</h2>
                        <p class="range-date" style="padding:0 20px;"> <span v-if="$route.params.from">{{$t('common.from')}} {{$route.params.from}}</span> <span v-if="$route.params.from && $route.params.to">------- </span> <span v-if="$route.params.to">{{$t('common.to')}} {{$route.params.to}}</span></p>
                    </div>
                    <el-button class="export-pdf" @click="print()">{{$t('common.exportPdf')}}</el-button>
                </div>
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
                                <div v-if="this.$route.params.type == 'kitchen'">
                                    <p>{{$t('common.serveTime')}}</p>
                                    <p>{{item.serveTime}}</p>
                                </div>
                                <div v-if="this.$route.params.type == 'drink'">
                                    <p>{{$t('common.kitchen')}}</p>
                                    <p>{{item.kitchenName}}</p>
                                </div>
                                <div>
                                    <p>{{ this.$route.params.type == "room" ? $t('common.kitchen') : $t('common.room') }}</p>
                                    <p>{{ this.$route.params.type == "room" ? item.kitchenName : item.createdByName}}</p>
                                </div>
                            </div>
                    </div>
                    </el-col>
                </el-row>
            </div>
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
import html2pdf from "html2pdf.js";
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
        print() {
        const element = document.getElementById('divToPrint');
        document.getElementById('divToPrint').classList.add("on-open-pdf");
        var opt = {
            margin: 0,
            filename: "report.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, width: '1077' },
            jsPDF: { unit: "in", format: "tabloid", orientation: "portrait" },
        };

            html2pdf()
            .set(opt)
            .from(element)
            .toPdf()
            .get("pdf")
            .then(function () {
                document.getElementById('divToPrint').classList.remove("on-open-pdf");
            })
            .save();
        },
    },
}
</script>

<style lang="scss">
    .room-title{
        padding: 0 20px;
        text-transform: capitalize;
    }
    .details-head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div{
            display: flex;
            align-items: center;
        }
    }
    .room-details-items{
        display: flex;
        .room-details-item{
            display: flex;
            justify-content: space-around;
            background-color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            div{
                display: flex;
                flex-flow: column;
                // margin-right: 11%;
                p{
                    margin: 0;
                    &:first-child{
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                }
            } 
        }
    }
    @include rtl() {
         .room-details-item{
            div{
                margin-right: 0;
                // margin-left: 20%;
            }
         }
    }
</style>
