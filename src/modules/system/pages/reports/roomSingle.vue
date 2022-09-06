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
            <el-button class="export-pdf" @click="print()">{{$t('common.exportPdf')}}</el-button>
            <div class="all-orders" id="divToPrint">
            <el-row :gutter="12">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="order"  v-for="(item, index) in orderDetails" :key="item.id">
                    <div class="order-title" v-if="index == 0">
                        <p><span class="time">{{item.creationDate}} </span> <span class="id">#{{$route.params.number}}</span>  </p>
                    </div>
                    <div>
                        <div class="order-list">
                            {{$store.state.main.currentLocale == "en" ? item.menuItemName : item.menuItemNameAr}}  <span class="num">{{item.quantity}}</span>
                        </div>
                        <p v-if="item.tag">{{$t('common.tags')}}: {{item.tag}} </p>
                        <p v-if="item.sugarSpoon">{{$t('common.sugar')}}: {{item.sugarSpoon}} </p>

                        <div class="order-place" v-if="index == orderDetails.length -1">
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
// import pdfMake from 'pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import htmlToPdfmake from 'html-to-pdfmake';
import html2pdf from "html2pdf.js";

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
    .export-pdf{
        margin-left: auto !important;
        display: block !important;
    }
    @include rtl() {
        .export-pdf{
            margin-right: auto !important;
            margin-left: 0 !important;
        }
    }
</style>
