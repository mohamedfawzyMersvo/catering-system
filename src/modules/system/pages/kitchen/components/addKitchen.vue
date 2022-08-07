<template>
     <el-dialog
            v-model="dialogVisible"
            width="30%"
            custom-class="addKitchen-model"
            :before-close="handleClose"
        >
        <template #title>
            <p> {{editItemId ? $t('common.editKitchen') : $t('common.addKitchen')}}</p>
        </template>
        <el-form :model="kitchenData" class="addKitchenForm" label-position="top">
            <el-form-item :label="$t('common.kitchenName')">
                <el-input
                    size="large"
                    v-model="kitchenData.name"
                    class="w-50 m-2"
                    :prefix-icon="Message"
                />
            </el-form-item>
            <el-form-item :label="$t('common.email')">
                <el-input
                    size="large"
                    v-model="kitchenData.emailAddress"
                    :prefix-icon="Lock"
                />
            </el-form-item>
            <el-form-item :label="$t('common.location')" class="add-location">
                <el-input
                    size="large"
                    v-model="kitchenData.floor"
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
                appartment 2
                </el-tag>
            </div> -->
            <el-form-item :label="$t('common.password')">
                <el-input
                    size="large"
                    v-model="kitchenData.password"
                    type="password"
                    show-password
                    :prefix-icon="Lock"
                />
            </el-form-item>
            <div>
                <el-upload
                    ref="upload"
                    class="upload-demo upload-img"
                    :file-list="fileList"
                    :limit="2"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    :on-change="handleImgChange"
                >   
                    <template #trigger>
                        <el-icon><Plus /></el-icon>
                        <el-button type="primary">{{$t('common.chooseImg')}}</el-button>
                    </template>
                    <el-button class="ml-3" type="success" @click="submitUpload" style="display:none">
                    upload to server
                    </el-button>
                    <template #tip>
                        <div class="el-upload__tip text-red">
                            
                        </div>
                        <div v-if="kitchenData.picture" class="preview-img">
                            <img :src="kitchenData.picture" />
                        </div>
                    </template>
                </el-upload>
            </div>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose" type="text" class="close">{{ $t('common.close') }}</el-button>
            <el-button @click="handleSubmit" class="add"> {{this.editItemId ? $t('common.edit') : $t('common.add')}}</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>
    import axios from 'axios'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'


export default {
    components:{ Plus},
    props:[
        "modelVisible", "editItemId"
    ],
    data() {
        return {
            dialogVisible: false,
            kitchenData:{
                id:"",
                name:"",
                emailAddress:"",
                floor: "",
                password:"",
                picture:"",
                roles:[
                    8
                ]
            },
            file:{},
            fileList:[]


        }
    },
    mounted() {
    },
    methods: {
        handleSubmit(){
            if (!this.editItemId) {
                var formdata = new FormData();
                Object.entries(this.kitchenData).forEach(([key, value]) => {
                    formdata.append(key, value);
                });
                formdata.set('picture', this.file);
                axios
                    .post('Account/RegisterLocalUsers',formdata, {headers: {'content-type': 'multipart/form-data'}})
                    .then((response) => {
                       this.successMessage();
                       this.handleClose();
                       this.reLoadData();
                      return response;
                    }).catch(({ response })=>{
                       
                        let keys = response.data?.errors ? Object.keys(response.data?.errors) : [];

                        let validationMessage = keys.map(key => response.data?.errors[key]);
                        if (validationMessage.length) {
                            this.errorMessage(JSON.stringify(validationMessage));
                        }
                        else{
                          this.errorMessage(response.data?.errorCode);
                        }
                    })
            }
            else{
                this.editKitchen();
            }
        },
        loadItem(){
            axios.get(`Account/${this.editItemId}/GetUserById`).then(res => {
                this.kitchenData = res.user;
                // this.file.url = res.picture.filePath;
                this.kitchenData.picture = res.user.filePath

            })
        },
        editKitchen(){
            this.kitchenData.roles = [8];
            this.kitchenData.alternativeKitchenId = 0;
            var formdata = new FormData();
            Object.entries(this.kitchenData).forEach(([key, value]) => {
                formdata.append(key, value);
            });
            formdata.set('picture', this.file);
            axios
            .put('Account/UpdateUser', formdata, {headers: {'content-type': 'multipart/form-data'}})
            .then((response) => {
               this.successMessage();
               this.handleClose();
               this.reLoadData();
                return response;
            }).catch(({ response })=>{
                
                let keys = response.data?.errors ? Object.keys(response.data?.errors) : [];

                let validationMessage = keys.map(key => response.data?.errors[key]);
                if (validationMessage.length) {
                    this.errorMessage(JSON.stringify(validationMessage));
                }
                else{
                    this.errorMessage(response.data?.errorCode);
                }
            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyAdded'),
                type: 'success',
            })
        },
        handleImgChange () {
            this.fileList = this.$refs.upload.uploadFiles
            this.file = event.target.files[0];
            if(this.fileList.length === 2) this.fileList.splice(0, 1)
            let self = this;
            // this.itemImageBytes = event.target.files[0];
            // Ensure that you have a file before attempting to read it
            if (event.target.files && event.target.files[0]) {
                
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    console.log('e', e)
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                self.kitchenData.picture = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(event.target.files[0]);
            }
        },
        handleRemove(){
            console.log('delete');
            this.file = "";
            this.kitchenData.picture = "";
        },
        errorMessage(theMessage){
            ElMessage.error(theMessage)
        },
        reLoadData(){
            this.$emit('reloadData');
        },
        handleClose(){
            this.resetData();
            this.$emit('modelClose');
        },
        resetData(){
            Object.assign(this.$data, this.$options.data.apply(this))
        }
    },
    watch: { 
        modelVisible() {
            this.dialogVisible = this.modelVisible;
            if (this.modelVisible && this.editItemId){
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
        .el-form-item__label{
            margin-left: 7px;
        }
        .tags{
            margin-bottom: 15px;
            margin-left: 20px;
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
    }
    @media (max-width: 992px) { 
        .addKitchen-model.el-dialog{
            width: 60%;
        }
    }
    @media (max-width: 576px) {
        .addKitchen-model.el-dialog{
            width: 70%;
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
