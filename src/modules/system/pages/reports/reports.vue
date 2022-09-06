<template>
<el-row :gutter="10">
    <el-col :span="18">
        <div class="reports">
            <div class="reports-head">
                <h2>{{$t('common.filter')}}</h2>
                <div>
                    <el-button v-if="filteredList.length" class="export-pdf" @click="print()">{{$t('common.exportPdf')}}</el-button>
                    <el-input
                    v-model="searchValue"
                    :placeholder="$t('common.searchName')"
                    class="input-with-select"
                    >
                        <template #append>
                            <el-button><el-icon><Search /></el-icon> </el-button>
                        </template>
                    </el-input>
                </div>
            </div> <!-- end head -->
            <p>{{$t('common.all')}}</p>
            <el-main>
            <div class="all-filter-items">
                <div  id="divToPrint">
                    <el-row :gutter="12">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="item in filteredList.filter((item) => item.menuItemId != 1027)" :key="item">
                                    <div class="filter-item" @click="goToSingle(item)">
                                        <p class="title" v-if="filterType == 1 || filterType == 2">{{filterType == 1 ? item.kitchenName : filterType == 2  ? item.createdByName : ""}}</p>
                                        <p v-else>{{$store.state.main.currentLocale == "en" ? item.menuItemName : item.menuItemNameAr}}</p>
                                        <p class="count">{{item.menuItemId == 1027 ? $t('common.requestItemNum') : $t('common.count')}}</p>
                                        <span class="count-num">{{item.orderCount}}</span>

                                        <p class="range-date"> <span v-if="item.dateFrom">{{$t('common.from')}} {{item.dateFrom}}</span> <span v-if="item.dateFrom && item.dateTo">------- </span> <span v-if="item.dateTo">{{$t('common.to')}} {{item.dateTo}}</span></p>
                                    </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :offset="6" class="mt-4" v-for="item in filteredList.filter((item) => item.menuItemId == 1027)" :key="item">
                                    <div class="filter-item" @click="goToSingle(item)">
                                        <p class="title" v-if="filterType == 1 || filterType == 2">{{filterType == 1 ? item.kitchenName : filterType == 2  ? item.createdByName : ""}}</p>
                                        <p v-else>{{$store.state.main.currentLocale == "en" ? item.menuItemName : item.menuItemNameAr}}</p>
                                        <p class="count">{{item.menuItemId == 1027 ? $t('common.requestItemNum') : $t('common.count')}}</p>
                                        <span class="count-num">{{item.orderCount}}</span>

                                        <p class="range-date"> <span v-if="item.dateFrom">{{$t('common.from')}} {{item.dateFrom}}</span> <span v-if="item.dateFrom && item.dateTo">------- </span> <span v-if="item.dateTo">{{$t('common.to')}} {{item.dateTo}}</span></p>
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
            </div>
            </el-main>
        </div>
    </el-col>
    <el-col :span="6">
        <el-aside class="filter-wrapper">
           <h2>{{$t('common.filter')}}</h2>
           <!-- <el-collapse accordion>
            <el-collapse-item :title="$t('common.kitchen')" name="1">
                <p v-for="kitchen in kitchenList" :key="kitchen.id">{{kitchen.name}}</p>
            </el-collapse-item>
            <el-collapse-item :title="$t('common.room')" name="2">
                <p v-for="room in roomsList" :key="room.id">{{room.name}}</p>
            </el-collapse-item>
            <el-collapse-item title="Indicator" name="3">
                <div>
                Simplify the process: keep operating process simple and intuitive;
                </div>
                <div>
                Definite and clear: enunciate your intentions clearly so that the
                users can quickly understand and make decisions;
                </div>
                <div>
                Easy to identify: the interface should be straightforward, which helps
                the users to identify and frees them from memorizing and recalling.
                </div>
            </el-collapse-item>
            </el-collapse> -->
            <el-radio-group v-model="filterType" class="ml-4" @change="changeFilterType">
                <el-radio :label="1" size="large">{{$t('common.kitchen')}}</el-radio>
                <el-radio :label="2" size="large">{{$t('common.room')}}</el-radio>
                <el-radio :label="3" size="large">{{$t('common.drinks')}}</el-radio>
            </el-radio-group>
            <!-- <p>{{$t('common.kitchen')}}</p>
            <p>{{$t('common.room')}}</p>
            <p>{{$t('common.drinks')}}</p> -->
            <div class="filter-date-picker">
                <div class="block">
                    <!-- <span class="demonstration">Creation date</span> -->
                    <el-date-picker
                        v-model="creationDateFrom"
                        type="date"
                        :placeholder="$t('common.from')"
                        size="large"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                    />
                    <el-date-picker
                        v-model="creationDateTo"
                        type="date"
                        :placeholder="$t('common.to')"
                        size="large"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                    />
                </div>
            </div>

            <el-button type="text" class="filter-btn" @click="filter()">{{$t('common.filter')}}</el-button>
        </el-aside>
    </el-col>
</el-row>
</template>
<script>

import html2pdf from "html2pdf.js";
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
export default {
    components:{
        Search
    },
    data() {
        return {
            result:[],
            searchValue:"",
            pagingModel:{},
            filterType:"",
            creationDateFrom: "",
            creationDateTo: "",
            pageSize: 10,
            pageNumber: 1,
        }
    },
    mounted(){
        
    },
    methods:{
        filter(){
            axios.post(`Order/GetOrdersListForReport`,{
                "pageSize": this.pageSize,
                "pageNumber": this.pageNumber,
                "filterType": this.filterType,
                "creationDateFrom": this.creationDateFrom,
                "creationDateTo": this.creationDateTo
            }).then((res) => {
                this.pagingModel = res.result.paginationModel;
                this.result = res.result.orders
            })
        },
        goToSingle(item){
            if (this.filterType == 1) {
                this.$router.push({
                    name: 'room-details'
                    , params: {id: item.kitchenId, type: "kitchen", from:this.creationDateFrom , to:this.creationDateTo}
                })
            }
            else if(this.filterType == 2) {
                this.$router.push({
                    name: 'room-details'
                    , params: {id: item.roomId, type: "room", from:this.creationDateFrom , to:this.creationDateTo}
                })
            }
            else{
                this.$router.push({
                    name: 'room-details'
                    , params: {id: item.menuItemId, type: "drink", from:this.creationDateFrom , to:this.creationDateTo}
                })
            }
        },
        changeFilterType(){
            this.resetFilter();
        },
        handleCurrentChange (newPage){
            this.pageNumber = newPage;
            this.filter()
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
        resetFilter(){
            this.result = [];
            this.searchValue = ""
        }
    },
    computed: {
        filteredList: function filteredList() {
            let search = this.searchValue;
            let name = ""
            if (this.filterType == 1 || this.filterType == 2){
               name = this.filterType == 1 ? 'kitchenName' : this.filterType == 2 ? "createdByName" : ""
            }
            else{
               name = this.$store.state.main.currentLocale == "en" ? "menuItemName" : "menuItemNameAr"
            }
            console.log('name', name);
            let content = this.result.filter(function (item) {
                return item[name].toLowerCase().includes(search.toLowerCase());
            });

            return content;
        }
    }
}
</script>
<style lang="scss">
    .reports{
        padding: 20px;
        background-color: #f6f6f6;
        min-height: 500px;
        .reports-head{
            display: flex;
            align-items: center;
            justify-content: space-between;
            > div{
                display: flex;
            }
            h2{
                background-color: #111;
                padding: 2px 5px;
                color:#fff;
                font-size: 16px;
                border-radius: 4px;
            }
            .el-input{
                width: 200px;
                
            }
            ::-webkit-input-placeholder { /* Edge */
                color: #111;
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #111;
            }

            ::placeholder {
                color: #111;
            }
            .el-input-group__append{
                right: -5px;
                top: -2px;
            }
            .el-button{
                background-color: #111 !important;
                color: #fff !important;
            }
            .export-pdf{
                margin: 0 10px;
            }
        }

        .all-filter-items{
            .filter-item{
                padding: 20px 30px;
                background-color: #fff;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
                .title{
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                p{
                    margin: 0;
                    font-weight: bold;
                }
                .count{
                    font-size: 12px;
                }
                .count-num{
                    font-weight: bold;
                    font-size: 18px;
                    background-color: gray;
                    line-height: 0;
                    margin-bottom: 20px;
                    padding: 0 10px;
                }
                .range-date{
                    margin-top: 20px;
                }
            }
        }
    }
    .filter-wrapper{
        margin-top: 0;
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
        .el-radio-group{
            .el-radio{
                margin-right: 19px;
            }
        }
        .filter-date-picker{
            .el-input__inner{
                border: 0;
                padding: 0 !important;
            }
            .el-input{
                --el-input-icon-color: #111;
                width: 97%;
            }
            .el-input__prefix{
                right:0;
                left:auto;
            }
            ::-webkit-input-placeholder { /* Edge */
                color: #111;
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #111;
            }

            ::placeholder {
                color: #111;
            }
        }
        .filter-btn{
            margin: 10px 15px;
            width: 90%;
            height: 40px;
        }
    }

    @include rtl() {
        .filter-wrapper{
            // .el-collapse-item__arrow{
            //     margin: 0 auto 0 0;
            //     transform: rotate(180deg);
            //     &.is-active{
            //         transform: rotate(90deg);
            //     }
            // }
             .el-input__prefix{
                right:auto;
                left:0;
             }
             .el-input--large .el-input__suffix {
                right: 88%;
            }

             .el-radio-group{
                .el-radio{
                    margin-right: 0;
                }
                .el-radio__label {
                    padding-right: 8px;
                }
             }
        }
    }
</style>