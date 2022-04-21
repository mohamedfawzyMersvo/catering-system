<template>
     <el-dialog
            v-model="dialogVisible"
            width="30%"
            custom-class="addKitchen-model"
            :before-close="handleClose"
        >
        <template #title>
            <p> {{$t('common.addRoom')}}</p>
        </template>
        <el-form :model="hallData" class="addKitchenForm" label-position="top">
            <el-form-item :label="$t('common.roomName')">
                <el-input
                    size="large"
                    v-model="hallData.name"
                    class="w-50 m-2"
                    :prefix-icon="Message"
                />
            </el-form-item>
            <el-form-item :label="$t('common.email')">
                <el-input
                    size="large"
                    v-model="hallData.emailAddress"
                    :prefix-icon="Lock"
                />
            </el-form-item>
            <el-form-item :label="$t('common.location')" class="add-location">
                <el-input
                    size="large"
                    v-model="hallData.floor"
                    :prefix-icon="Lock"
                />
                <!-- <el-button type="text">Add</el-button> -->
            </el-form-item>
            <!-- <div class="tags">
                <el-tag
                    class="tag"
                    type="info"
                    effect="plain"
                    closable
                >
                street 1
                </el-tag>
                <el-tag
                    class="tag"
                    type="info"
                    effect="plain"
                    closable
                >
                appartment
                </el-tag> -->
            <!-- </div> -->
            <el-form-item :label="$t('common.kitchen')" class="select-kitchen">
            <el-select v-model="hallData.kitchenId" :placeholder="$t('common.select')" size="large">
                <el-option
                    v-for="item in kitchenList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.password')">
                <el-input
                    size="large"
                    v-model="hallData.password"
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
            hallData:{
                name:"",
                emailAddress:"",
                kitchenId:"",
                floor: "",
                password:"",
                roles:[
                    9
                ]
            },
            kitchenList:[],
        }
    },
    created() {
         this.loadKitchens();
    },
    methods: {
        handleSubmit(){
            if (!this.editItemId) {
                axios
                .post('Account/RegisterLocalUsers', this.hallData)
                .then(() => {
                    this.successMessage();
                    this.handleClose();
                    this.reLoadData();
                })
            }
            else{
                this.editKitchen();
            }
        },
        loadItem(){
            axios.get(`Account/${this.editItemId}/GetUserById`).then(res => {
                this.hallData = res.user;
            })
        },
         loadKitchens(){
            axios.get('UserManagement/ListAllkitchensWithoutPagination').then(res => {
                this.kitchenList = res;
            })
        },
        editKitchen(){
            this.hallData.roles = [9];
            axios
            .put('Account/UpdateUser', this.hallData)
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
        handleClose(){
            this.resetData();
            this.$emit('hallModelClose');
        },
        reLoadData(){
            this.$emit('reloadData');
        },
        resetData(){
            Object.assign(this.$data, this.$options.data.apply(this))
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
                background-color: #5e1ad5;
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
