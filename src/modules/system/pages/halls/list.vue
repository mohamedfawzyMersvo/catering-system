<template>
    <div class="main-bg">
        <el-row>
            <el-col :span="24">
                <div class="page-header">
                  <p> <span class="pointer"  @click="
                            $router.push({
                                name: `home`,
                            })
                        "> {{$t('common.home')}} </span >/
                        {{$t('common.rooms')}}</p>
                  <div> 
                      <el-link type="primary" class="add-kitchen" @click="openHallModel">
                          {{$t('common.addRoom')}}
                          <el-icon><circle-plus /></el-icon>
                      </el-link>
                  </div>
                </div>
            </el-col>
        </el-row>
        <el-main>
            <el-row :gutter="12" class="list-row">
                <el-col :xs="16" :sm="12" :md="6" :lg="6" :xl="6" v-for="hall in hallsList" :key="hall.id">
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
                                <el-dropdown-item class="more-item" @click="editHalls(hall)"><el-icon><edit /></el-icon> {{$t('common.edit')}}</el-dropdown-item>
                                <el-dropdown-item class="delete-item"><span @click.stop="deleteHalls(hall)"><el-icon><delete /></el-icon>{{$t('common.delete')}} </span></el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                       <h4> {{hall.name}}</h4>
                       <div class="kitchen-state">
                           <div class="meta-data">
                                <span> {{hall.floor}} </span>    
                                <span> R:{{hall.ordersCount}} </span>    
                            </div>
                            <img :src="hall.filePath" />
                           <!-- <div> <span class="num"> 32 </span> <span> request </span> </div>
                           <div> <span class="num"> 32 </span> <span> request </span> </div>
                           <div> <span class="num"> 32 </span> <span> request </span> </div> -->
                        </div>
                        <!-- <el-button type="info" class="preview-btn" @click="
                            $router.push({
                                path: `/single/${hall.id}`,
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
        <AddHall :modelHallVisible="hallModel" @hallModelClose="whenCloseModel" @reloadData="loadData()" :editItemId="editItemId"/> 

    </div>
</template>

<script>
    import axios from 'axios'
    import { ElMessage } from 'element-plus'
    import {MoreFilled, Edit, Delete, CirclePlus} from '@element-plus/icons';
    import AddHall from './components/addHall.vue';
    export default {
        components:{AddHall, MoreFilled, Edit, Delete, CirclePlus},
        data() {
            return {
                currentPage:1,
                itemsPerPage:10,
                pagingModel:{},
                hallModel: false,
                hallsList:[],
                editItemId:""
            }
        },
        mounted() {
           this.loadData();
        },
        methods: {
            loadData(){
                axios.get(`UserManagement/${this.itemsPerPage}/${this.currentPage}/ListAllRooms`).then(res => {
                    this.hallsList = res.kitchensResponseList;
                    this.pagingModel = res.pagingModel;
                    // this.currentPage =res.pagingModel.currentPage;
                })
            },
           openHallModel(){
                this.hallModel = true;
            },
            whenCloseModel(){
                this.hallModel = false;
                this.editItemId = "";
            },
            editHalls({id}){
                this.editItemId = id;
                this.openHallModel()
            },
            deleteHalls({id}){
                axios.delete(`Account/DeleteUser/${id}`).then(() => {
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
            handleCurrentChange (newPage){
                this.currentPage = newPage;
                this.loadData()
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
            font-weight: bolder;
            width: 90%;
            margin: auto;
            display: block;
            border: 0;
            transition: all 0.5s;
            height: 40px;
            &:hover{
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
            height: 211px;
        }
    }
</style>
