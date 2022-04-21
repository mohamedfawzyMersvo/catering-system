<template>
    <div class="main-bg">
        <el-row>
            <el-col :span="24">
                <div class="page-header">
                  <p><span class="pointer"  @click="
                            $router.push({
                                name: `kitchen-home`,
                            })
                        "> {{$t('common.home')}} </span > / {{$t('common.drinks')}}</p>
                  <div> 
                      <el-link type="primary" class="add-kitchen" @click="openDrinkModel">
                          {{$t('common.addDrink')}}
                          <el-icon><circle-plus /></el-icon>
                      </el-link>
                  </div>
                </div>
            </el-col>
        </el-row>
        <el-main>
            <el-row :gutter="12">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" v-for="drink in drinkList" :key="drink.id">
                   <div class="list-item" style="{ boxShadow: `var(--el-box-shadow-base)` }"> 
                      
                        <el-icon><edit-pen /></el-icon>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                            <el-icon><more-filled /></el-icon>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item class="more-item" @click="editDrink(drink)"><el-icon><edit /></el-icon> {{$t('common.edit')}}</el-dropdown-item>
                                <el-dropdown-item class="delete-item"><span @click.stop="deleteDrink(drink)"><el-icon><delete /></el-icon>{{$t('common.delete')}} </span></el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                       <h4 class="name"> {{$store.state.main.currentLocale == "en" ?drink.name : drink.name_Ar}}</h4>
                       <div class="kitchen-state">
                           <!-- <div class="meta-data">
                                <span> {{kitchen.floor}} </span>    
                                <span> R:{{kitchen.ordersCount}} </span>    
                            </div> -->
                            <img :src="drink.itemImageBytes || src" />
                           <!-- <div> <span class="num"> 32 </span> <span> request </span> </div>
                           <div> <span class="num"> 32 </span> <span> request </span> </div>
                           <div> <span class="num"> 32 </span> <span> request </span> </div> -->
                        </div>
                        <!-- <el-button type="info" class="preview-btn" @click="
                            $router.push({
                                path: `/single/${drink.id}`,
                            })
                        ">
                        Preview</el-button> -->
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
       <AddDrink :modelDrinkVisible="drinkModel" @drinkModelClose="whenCloseModel" @reloadData="loadData()" :editItemId="editItemId"/>
    </div>
</template>

<script>
    import axios from 'axios'
    import { ElMessage } from 'element-plus'
    import {MoreFilled, Edit, Delete, CirclePlus} from '@element-plus/icons';
    import AddDrink from './components/addDrink.vue';
    export default {
        components:{AddDrink, MoreFilled, Edit, Delete, CirclePlus},
        data() {
            return {
                currentPage:1,
                itemsPerPage:10,
                pagingModel:{},
                drinkModel: false,
                drinkList:[],
                pageSize:10,
                pageNumber:1,
                editItemId:"",
                src:"https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData(){
                axios.get(`MenuItem/${this.pageSize}/${this.pageNumber}/ListAllMenuItems`).then(res => {
                    this.drinkList = res.menuItemResponseList;
                    this.pagingModel = res.pagingModel;
                    this.currentPage =res.pagingModel.currentPage;
                })
            },
            openDrinkModel(){
                this.drinkModel = true;
            },
            whenCloseModel(){
                this.drinkModel = false;
                this.editItemId = "";
            },
            editDrink({id}){
                this.editItemId = id;
                this.openDrinkModel()
            },
            deleteDrink({id}){
                axios.delete(`MenuItem/DeleteMenuItem/${id}`).then(() => {
                   this.deleteMessage();
                   this.loadData();
                })
            },
            deleteMessage() {
                ElMessage({
                    message: "Deleted",
                    type: "warning",
                });
            },
        },
    }
</script>

<style lang="scss">
    .page-header{
        background-color: #fff;
        height: 50px;
        line-height: 50px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        font-size: 17px;
        .add-kitchen span{
            display: flex;
            align-items: center;
            color: #0000ff;
            font-size: 17px;
            i{
                margin-left: 10px;
            }
        }
        p{
            font-weight: bolder;
            margin: 0;
        }
    }
    .list-item{
        background-color: #fff;
        padding: 10px;
        padding-top: 0;
        position: relative;
        border-radius: 7px;
        h4{
            margin-top: 0;
            margin-bottom: 0;
            font-size: 22px;
            font-weight: bolder;
            line-height: 1;
        }
        .el-icon{
            position: absolute;
            right: 10px;
            top: 10px;
        }
        .el-dropdown{
            width: 100%;
        }
        .el-dropdown--default{
            position: absolute;
            right: 0;
           .el-dropdown-link .el-icon{
                transform: rotate(90deg);
            }
        }
        .preview-btn{
            background: transparent;
            color: #5e1ad5;
            font-weight: bolder;
            width: 90%;
            margin: auto;
            display: block;
            border: 0;
            transition: all 0.5s;
            height: 40px;
            &:hover{
                background-color: #5e1ad5;
                border-radius: 7px;
                color: #fff;
            }
        }
    }
    .more-item.el-dropdown-menu__item{
        color: #3c3c3c;
        i.el-icon{
            color: #3c3c3c;
        }
    }
    .delete-item {
        color: #e64b4b !important;
        i.el-icon{
            color: #e64b4b;
        }
    }
    .name {
        margin-bottom: 10px !important;
        margin-left: 4px;
    }
    
    .kitchen-state {
        margin-bottom: 15px;
        .meta-data{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }
        img {
            width: 100%;
            border-radius: 7px;
        }
    }
</style>
