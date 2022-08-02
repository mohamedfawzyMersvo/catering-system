<template>
    <div class="single-kitchen"> 
        <div class="page-header"><p><span class="pointer"  @click="
            $router.push({
                name: `kitchen-list`,
            })
            "> {{$t('common.home')}} </span >/ <span> {{kitchenData.name}}</span> </p>
        </div>
        <div>
            <el-main  class="main-bg">
                <el-container>
                    <el-container>
                        <el-main>
                            <div class="main-content" style="{ boxShadow: `var(--el-box-shadow-base)` }">
                                <div class="single-head"> <p> {{$t('common.kitchen')}} </p>  
                                    <div class="add-hall">
                                        <!-- <div class="add-in-single"> <el-link type="primary" @click="openHallModel"> Add HALL <el-icon><circle-plus /></el-icon> </el-link> </div> -->
                                         <!-- <el-dropdown>
                                            <span class="el-dropdown-link">
                                            <el-icon><more-filled /></el-icon>
                                            <el-icon class="el-icon--right">
                                                <arrow-down />
                                            </el-icon>
                                            </span>
                                            <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item class="more-item"><el-icon><edit /></el-icon> Edit</el-dropdown-item>
                                                <el-dropdown-item class="delete-item"><el-icon><delete /></el-icon>Delete</el-dropdown-item>
                                            </el-dropdown-menu>
                                            </template>
                                        </el-dropdown> -->
                                    </div> 
                                </div>
                                <div class="wrapper">
                                    <div>  
                                        <h3> {{kitchenData.name}} </h3>
                                        <span> {{kitchenData.floor}} </span>

                                    </div>
                                    <div class="kitchen-single-state">
                                        <el-icon><edit-pen /></el-icon>
                                        <div style="{ boxShadow: `var(--el-box-shadow-base)` }"> <span class="num"> {{kitchenData.ordersCount}} </span> <span> {{$t('common.requests')}} </span>
                                         <!-- <div class="state green"> Total: 483 </div>  -->
                                        </div>
                                        <!-- <div> <span class="num"> 2 </span> <span> Rejected </span> <div class="state blue"> Total: 499 </div> </div>
                                        <div> <span class="num"> 32 </span> <span> Pendinig </span> <div class="state red"> Total: 3 </div> </div> -->
                                    </div>
                                </div>
                            </div>
                            <!-- <h4>Record activities</h4>
                            <el-table :data="tableData" height="250" style="width: 100%">
                                <el-table-column prop="date" label="Date" width="180" />
                                <el-table-column prop="name" label="Name" width="180" />
                                <el-table-column prop="address" label="Address" />
                            </el-table> -->

                            <div class="all-drinks loaded-drinks mt-2">
                            <el-row :gutter="20">
                                 <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-for="drink in loadedDrink" :key="drink.id">
                                    <div class="all-drinks-item" style="{ boxShadow: `var(--el-box-shadow-base)` }">
                                        <el-button type="text" class="x-btn" @click="removeDrink(drink)"> X</el-button>
                                        <div  class="block">
                                            <el-image
                                                :src='drink.itemImageBytes'
                                                fit="cover"
                                            ></el-image>
                                        </div>
                                        <div>
                                            <p class="title">{{$store.state.main.currentLocale == "en" ?drink.name : drink.name_Ar}}</p>
                                            <p class="item-data">{{$t('common.addedd')}}: {{drink.creationDate}}</p>
                                            <!-- <el-button type="primary" class="edit-btn" @click="editDrink(drink)">{{$t('common.edit')}} </el-button> -->
                                        </div>
                                    </div>
                                 </el-col>
                            </el-row>
                            </div>
                        </el-main>
                    </el-container>
                    <el-aside>
                        <div class="sidebar-bg" style="{ boxShadow: `var(--el-box-shadow-base)` }">
                        <h3>{{$t('common.listOfDrinks')}}</h3>
                        <div class="sidebar-head">
                        <el-select :placeholder="$t('common.select')" v-model="drinkSelected" @change="addToSelectedDrink">
                            <el-option
                               v-for="drink in drinkList.filter(item => item.id != 1009)" 
                                :key="drink.id" 
                                :label="$store.state.main.currentLocale == 'en' ? drink.name : drink.name_Ar"
                                :value="drink"
                            >
                            </el-option>
                        </el-select>
                            <!-- <div class="add-in-single"> <el-link type="primary" @click="openDrinkModel"> Add DRINK <el-icon><circle-plus /></el-icon> </el-link> </div> -->
                                <!-- <el-dropdown>
                                    <span class="el-dropdown-link">
                                    <el-icon><more-filled /></el-icon>
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                    </span>
                                    <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item class="more-item"><el-icon><edit /></el-icon> Edit</el-dropdown-item>
                                        <el-dropdown-item class="delete-item"><el-icon><delete /></el-icon>Delete</el-dropdown-item>
                                    </el-dropdown-menu>
                                    </template>
                                </el-dropdown> -->
                        </div>
                        <!-- <el-input
                            v-model="input1"
                            class="w-50 m-2"
                            placeholder="Searching for..."
                            :suffix-icon="Calendar"
                        >
                        <template #append>
                            <el-button><el-icon><Search /></el-icon></el-button>
                        </template>
                        </el-input> -->
                        </div>
                        <div class="all-drinks">
                            <div class="all-drinks-item" style="{ boxShadow: `var(--el-box-shadow-base)` }" v-for="drink in selectedDrink" :key="drink.id">
                                <!-- <el-button type="text" class="x-btn"> X</el-button> -->
                                <div  class="block">
                                    <el-image
                                        :src='drink.itemImageBytes'
                                        fit="cover"
                                    ></el-image>
                                </div>
                                <div>
                                    <p class="title">{{$store.state.main.currentLocale == "en" ?drink.name : drink.name_Ar}}</p>
                                    <p class="item-data">{{$t('common.addedd')}}: {{drink.creationDate}}</p>
                                    <el-button type="primary" class="edit-btn" @click="editDrink(drink)">{{$t('common.edit')}} </el-button>
                                </div>
                            </div>
                            <el-button type="primary" class="add-btn" v-if="selectedDrink.length" @click="addDrinkToKitchen">{{$t('common.add')}} </el-button>
                        </div>
                    </el-aside>
                </el-container>
            </el-main>
            <AddKitchen :modelVisible="kitchenModel" @modelClose="kitchenModel = false"/>
            <EditDrink :modelDrinkVisible="drinkModel" @drinkModelClose="atCloseDrinkModel" :editItemId="editItemId"/>
            <!-- <AddDrink :modelDrinkVisible="drinkModel" @drinkModelClose="drinkModel = false"/>
            <AddHall :modelHallVisible="hallModel" @hallModelClose="hallModel = false"/> -->
            </div>
    </div>
</template>

<script>
// import {MoreFilled, Edit, Delete, CirclePlus, Search} from '@element-plus/icons';
    import axios from 'axios'
    import { ElMessage } from 'element-plus'

import AddKitchen from './components/addKitchen.vue';
import EditDrink from '../drinks/components/addDrink'
// import AddHall from './components/addHall';
export default {
    components:{ AddKitchen, EditDrink},
    data() {
        return {
            // tableData: [
            //         {
            //             date: '2016-05-03',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            //         {
            //             date: '2016-05-02',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            //         {
            //             date: '2016-05-04',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            //         {
            //             date: '2016-05-01',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            //         {
            //             date: '2016-05-08',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            //         {
            //             date: '2016-05-06',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            //         {
            //             date: '2016-05-07',
            //             name: 'Tom',
            //             address: 'No. 189, Grove St, Los Angeles',
            //         },
            // ],
            kitchenModel: false,
            drinkModel: false,
            editItemId:"",
            hallModel: false,
            kitchenData:{},
            id:this.$route.params.id || 0,
            drinkList:[],
            selectedDrink:[],
            drinkSelected:{},
            pageSize:10,
            pageNumber:1,
            loadedDrink:[]
        }
    },
    created() {
        this.loadItem();
        this.loadSelectedDrinks();

    },
    methods: {
        loadItem(){
            axios.get(`Account/${this.id}/GetUserById`).then(res => {
                this.kitchenData = res.user;
            })
        },
        loadSelectedDrinks(){
            axios.get(`MenuItem/${this.id}/ListAllKitchenMenuItems`).then(res => {
                this.loadedDrink = res;
                this.loadDrinks();
            })
        },
        loadDrinks(){
            axios.get(`MenuItem/ListAllMenuItemsWithoutPagination`).then(res => {
                let loadedIds = this.loadedDrink.map((item) => item.id)
                this.drinkList = res.filter(drink => !loadedIds.includes(drink.id));
            })
        },
        addToSelectedDrink(){
            this.selectedDrink.push(this.drinkSelected);
        },
        addDrinkToKitchen(){
            axios.post(`MenuItem/AddMenueItemToKitchen`,
               {
                    "kitchenId": Number(this.$route.params.id),
                    "menuItemIds": this.selectedDrink.map(item => item.id)
                }
            ).then(() => {
                this.loadSelectedDrinks();
                this.selectedDrink = [];
            })
        },
        removeDrink({id}){
            axios.delete(`MenuItem/DeleteMenuItem/${id}`).then(() => {
                this.deleteMessage();
                this.loadSelectedDrinks();
            })
        },
        deleteMessage() {
            ElMessage({
                message: "Deleted",
                type: "warning",
            });
        },
        openKitchenModel(){
           this.kitchenModel = true;
        },
        openDrinkModel(){
           this.drinkModel = true;
        },
        editDrink({id}){
            this.editItemId = id;
            this.openDrinkModel()
        },
        atCloseDrinkModel(){
            this.drinkModel = false;
            this.editItemId = "";
        },
        openHallModel(){
           this.hallModel = true;
        }
    },
}
</script>

<style lang="scss">
    .path-single{
        height: 50px;
        font-size: 24px;
        line-height: 50px;
        background-color: #fff;
        p{
            font-size: 16px;
            color: #89828f;
            margin: 0;
            span{
                color: #3c3c3c;
            }
        }
    }
    .single-kitchen{
        .single-head{
            display: flex;
            justify-content: space-between;
            .add-hall{
                display: flex;
                align-items: center;
                .el-icon{
                    margin: 0 4px;
                }
            }
            .el-dropdown{
                margin-left: 10px;
                position: relative;
                top: -4px;
                .el-dropdown-link .el-icon{
                    transform: rotate(90deg);
                }
            }
            p{
                margin: 0;
            }
        }
        .wrapper{
            display: flex;
            justify-content: space-between;
            padding: 50px 40px;
            @media (max-width: 600px) { 
                flex-flow: column;
            }
        }
        h3{
            color: #1b1b1b;
            font-size: 30px;
            font-weight: bolder;
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 768px) {
                font-size: 20px;
            }
        }
        .main-content {
            border: 1px solid #f3f1f3;
            padding: 10px 20px 20px 30px;
            background-color: #fff;
            border-radius: 7px;
        }
        .el-aside{
            width: 400px;
            margin-top: 20px;
            background-color: #f6f6f6;
            h3{
                margin: 0;
                margin-bottom: 10px;
            }
        }
        .sidebar-bg{
            border: 1px solid #f3f1f3;
            background-color: #fff;
            padding: 10px 20px 20px 30px;
            border-radius: 7px;
            margin-bottom: 12px;
        }
        .sidebar-head{
            display: flex;
            align-items: center;
            // justify-content: end;
            background-color: #fff;
            .el-dropdown{
                margin-left: 10px;
                line-height: 2.2;
                position: relative;
                top: -4px;
                .el-dropdown-link .el-icon{
                    transform: rotate(90deg);
                }
            }
            .el-select.el-select--default{
                width: 70%;
            }
        }
        @media (max-width: 992px) { 
             .el-container{
                 flex-flow:column ;
             }
            .el-aside{
                width: 100% !important;
             }
        }
    }
    .kitchen-single-state {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 15px;
        text-align: center;
        > div{
            border: 1px solid #f3f1f3;
            border-radius: 7px;
            padding: 10px;
        }
        span{
            display: block;
            color: #89828f;
            font-weight: bolder;
        }
        .num{
            font-size: 30px;
        }
        div{
            display: flex;
            flex-flow: column;
        }
        .state{
            width:150px ;
            text-align: center;
            margin-top: 10px;
            &.green{
                background-color: #d6f5da;
                color: #47cf58;
            }
            &.blue{
                background-color: #cdebff;
                color: #0099ff;
            }
            &.red{
                background-color: #fadbdb;
                color: #e64b4b;
            }
        }
         @media (max-width: 992px) { 
             flex-flow: column;
             align-items: center;
         }

    }
    .loaded-drinks{
        margin-top: 20px;
    }
    .add-in-single{
        display: flex;
        align-items: center;
        color: #0000ff;
        margin-bottom: 15px;
        i{
            font-size: 20px;
            margin-left: 7px;
        }
        .el-link--inner{
            display: flex;
            align-items: center;
        }
    }
    .all-drinks-item{
        display: flex;
        background-color: #fff;
        border: 1px solid #f3f1f3;
        border-radius: 7px;
        margin-bottom: 12px;
        position: relative;
        .block{
            margin-right: 10px;
            padding-right: 10px;
            width: 50%;
            border-right: 1px solid #f6f6f6;
            .el-image{
                overflow: initial;
            }
            img{
                min-height: 100%;
                padding: 5px;
                height: 90px;
                width: 134px;
                border-radius: 9px;
            }
        }
        .title{
            color: #263948;
            font-weight: bolder;
            margin: 0;
            margin-top: 10px;
        }
        .item-data{
            margin: 0;
            color: #bab3c0;
            font-size: 15px;
        }
        .edit-btn{
            background-color: #f8f8f8;
            color:#0000ff;
            font-weight: bolder;
            width: 97%;
            margin: auto;
            margin-top: 8px;
            display: block;
        }
        .x-btn{
            position: absolute;
            right: 1px;
        }
    }

    @include rtl() {
        .all-drinks-item{
            .block{
                margin-left: 10px;
                padding-right: 10px;
                margin-right: initial;
                padding-right: initial;
            }
            .x-btn{
                position: absolute;
                right: initial;
                left: 1px;
            }
        }
    }

</style>