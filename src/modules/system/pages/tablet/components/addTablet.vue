<template>
     <el-dialog
            v-model="dialogVisible"
            width="30%"
            custom-class="addKitchen-model"
            :before-close="handleClose"
        >
        <template #title>
            <p> {{ editItemId ? $t('common.edittablet') : $t('common.addtablet')}}</p>
        </template>
        <el-form :model="tabletData" class="addKitchenForm" label-position="top">
            <el-form-item :label="$t('common.name')">
                <el-input
                    size="large"
                    v-model="tabletData.name"
                    class="w-50 m-2"
                    :prefix-icon="Message"
                />
            </el-form-item>
            <el-form-item :label="$t('common.email')">
                <el-input
                    size="large"
                    v-model="tabletData.emailAddress"
                    :prefix-icon="Lock"
                />
            </el-form-item>
            <el-form-item :label="$t('common.room')" class="select-kitchen">
            <el-select v-model="tabletData.roomId" :placeholder="$t('common.select')" size="large">
                <el-option
                    v-for="item in roomsList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.seatNumber')">
                <el-input
                    size="large"
                    v-model="tabletData.seatNumber"
                    class="w-50 m-2"
                    :prefix-icon="Message"
                />
            </el-form-item>
            <el-form-item :label="$t('common.password')">
                <el-input
                    size="large"
                    v-model="tabletData.password"
                    type="password"
                    show-password
                    :prefix-icon="Lock"
                />
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose" type="text" class="close">{{ $t('common.close') }}</el-button>
            <el-button @click="handleSubmit" class="add">{{this.editItemId ? $t('common.edit') : $t('common.add')}}</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>
    import axios from 'axios'
    import { ElMessage } from 'element-plus'
export default {
    props:[
        "modelHallVisible", "editItemId"
    ],
    data() {
        return {
            dialogVisible: false,
            tabletData:{
                roomId: "",
                seatNumber:"",
                name:"",
                emailAddress:"",
                password:"",
                roles:[
                    10
                ]
            },
            roomsList:[],
        }
    },
    mounted() {
         this.loadRooms();
    },
    methods: {
        handleSubmit(){
            if (!this.editItemId) {
                axios
                .post('Account/RegisterLocalUsers', this.tabletData)
                .then(() => {
                    this.successMessage();
                    this.handleClose();
                    this.reLoadData();
                }).catch(() => {
                    this.errorMessage("EmailExist");
                })
            }
            else{
                this.editTablet();
            }
        },
        loadItem(){
            axios.get(`Account/${this.editItemId}/GetUserById`).then(res => {
                this.tabletData = res.user;
            })
        },
         loadRooms(){
            axios.get('UserManagement/ListAllRoomsWithoutPagination').then(res => {
                this.roomsList = res;
            })
        },
        editTablet(){
            this.tabletData.roles = [10];
            axios
            .put('Account/UpdateUser', this.tabletData)
            .then(() => {
               this.successMessage();
               this.handleClose();
               this.reLoadData();
            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyAdded'),
                type: 'success',
            })
        },
        errorMessage(theMessage){
            ElMessage.error(theMessage)
        },
        handleClose(){
            this.resetData();
            this.$emit('tabletModelClose');
        },
        reLoadData(){
            this.$emit('reloadData');
        },
        resetData(){
            Object.assign(this.$data, this.$options.data.apply(this))
            this.loadRooms();
        }
    },
    watch: { 
        modelHallVisible() {
            this.dialogVisible = this.modelHallVisible;
            if (this.modelHallVisible && this.editItemId){
                this.loadItem()
            }
        }
    }
}
</script>

<style lang="scss">
    .addKitchen-model{
        background-color: #f8f8f8;
        .el-dialog__header{
            padding: 10px 30px;
            p{
                margin: 0;
                color: #3c3c3c;
                font-size: 20px;
                font-weight: bolder;
            }
        }
        .el-dialog__body{
            padding: 0;
        }
        .addKitchenForm{
            padding: 30px;
            padding-top: 10px;
            input{
                border-radius: 20px;
            }
            .add-location .el-form-item__content{
                display: flex;
                flex-wrap: nowrap;
                input{
                    margin-right: 10px;
                }
                button{
                    color:#0000ff ;
                }
            }
            .tag{
                margin-right: 5px;
            }
        }

       
        .dialog-footer{
            display: flex;
            justify-content: space-between;
            .el-button.close{
                color: #1b1b1b;
            }
            .el-button.add{
                background-color: var(--default-second-color);
                color: #f8f8f8;
            }
            .el-button{
                width: 50%;
                border-radius: 20px;
                font-weight: bolder;
            }
        }
        .select-kitchen{
            margin-top: 20px;
            .el-select{
                margin-top: 0;
                width: 100%;
            }
        }
    }
    @include rtl() {
        .order-model .el-dialog__header{
            p{
                text-align: right;
                display: flex;
                align-items: center;
                span{
                    margin-right: 10px;
                }
            }
            .el-dialog__headerbtn{
                left:var(--el-dialog-padding-primary) ;
                right: initial;
            }
        }
        .order-model{
            .el-dialog__footer {
                text-align: left
            }
        }
    }
</style>
