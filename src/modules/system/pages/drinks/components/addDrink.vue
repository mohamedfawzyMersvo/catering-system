<template>
     <el-dialog
            v-model="dialogVisible"
            width="35%"
            custom-class="addKitchen-model"
            :before-close="handleClose"
        >
        <template #title>
            <p> {{editItemId ? $t('common.editDrink') : $t('common.addDrink')}}</p>
        </template>
        <el-form :model="form" class="addKitchenForm" label-position="top">
            <div class="name-wrapper"> 
                <label> {{$t('common.name')}} </label>
                <el-form-item :label="$t('common.drinkEnglish')">
                    <el-input
                        size="large"
                        v-model="drinkData.name"
                        class="w-50 m-2"
                        :prefix-icon="Message"
                    />
                </el-form-item>
            <el-form-item :label="$t('common.drinkArabic')">
                <el-input
                    size="large"
                    v-model="drinkData.name_Ar"
                    class="w-50 m-2"
                    :prefix-icon="Message"
                />
            </el-form-item>
            </div>
            <div class="type-wrapper">
                <label class="type-label"> {{$t('common.type')}} </label>
                <el-radio v-model="drinkData.categoryStatusId" :label=1 size="large">{{ $t('common.hot') }}</el-radio>
                <el-radio v-model="drinkData.categoryStatusId" :label=2 size="large">{{ $t('common.cold') }}</el-radio>
            </div>
            <div> 
                <el-checkbox v-model="drinkData.sugarDisabled" :label="$t('common.noSugar')" size="large" />
            </div>
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
                        <div v-if="drinkData.itemImageBytes" class="preview-img">
                            <img :src="drinkData.itemImageBytes" />
                        </div>
                    </template>
                </el-upload>
            </div>
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
    import { Plus } from '@element-plus/icons-vue'

export default {
    components:{ Plus},
    props:[
        "modelDrinkVisible", "editItemId"
    ],
    data() {
        return {
            dialogVisible: false,
            drinkData:{
                name: "",
                name_Ar:"",
                categoryStatusId: 0,
                itemImageType: "",
                itemImageBytes: "",
                sugarDisabled:false
            },
            imgByte:"",
            fileList:[]
            // file:{}
        }
    },
    methods: {
        handleSubmit(){
            if (!this.editItemId) {
                axios
                    .post('MenuItem/CreateMenuItem', this.drinkData)
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
                this.editDrink();
            }
        },
        loadItem(){
            axios.get(`MenuItem/${this.editItemId}/GetMenuItemById`).then(res => {
                this.drinkData = res.menuItem;
                // this.file.url = this.drinkData.itemImageBytes;
            })
        },
        editDrink(){
            axios
            .put(`MenuItem/${this.editItemId}/UpdateMenuItem`, this.drinkData)
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
                         self.drinkData.itemImageBytes = e.target.result;
                         }
                         // Start the reader job - read file as a data url (base64 format)
                         reader.readAsDataURL(event.target.files[0]);
                    }
            

        },
        handleRemove(){
            console.log('delete');
            // this.file = "";
            this.drinkData.itemImageBytes = "";
        },
        reLoadData(){
            this.$emit('reloadData');
        },
        handleClose(){
            this.resetData();
            this.$emit('drinkModelClose');
        },
        resetData(){
            Object.assign(this.$data, this.$options.data.apply(this))
        }
    },
    watch: { 
        modelDrinkVisible() {
            this.dialogVisible = this.modelDrinkVisible;
            if (this.modelDrinkVisible && this.editItemId){
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
             @media screen and (max-width: 768px) {
                padding: 10px !important;
            }
        }

       
        .dialog-footer{
            display: flex;
            justify-content: space-between;
            .el-button.add{
                background-color: var(--default-second-color);
                color: #f8f8f8;
                box-shadow: 0 12px 25px 0 #401d0448;
            }
            .el-button{
                width: 47%;
                border-radius: 10px;
                height: 40px;
            }
        }
        .name-wrapper{
            border: 1px solid #d7d3da;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 20px;
            > label {
                font-weight: bolder;
                color: #263948;
                position: relative;
                bottom: 28px;
                padding: 0 10px;
                background-color: #fff;
                font-size: 18px;
            }
        }
        .type-wrapper{
            margin-bottom: 16px;
            padding: 0 10px;
            .type-label{
                display: block;
                margin-bottom: 10px;
            }
            label{
                color: #1b1b1b;
                font-size: 16px;
            }
            .el-radio{
                border: 1px solid #d7d3da;
                padding: 0 25px;
                border-radius: 10px;
                &.is-checked{
                    border: 2px solid var(--default-primary-color);
                }
                .el-radio__input.is-checked .el-radio__inner{
                    border-color: var(--default-primary-color);
                    background: var(--default-primary-color);;
                }
                .el-radio__label{
                    color: var(--default-primary-color);
                    font-weight: bolder;
                    font-size: 16px;
                }
            }
        }
        .upload-img{
            margin-top: 35px;
            background-color: #f9f9f9;
            border: 2px dashed #f3f1f3;
            border-radius: 10px;
            padding: 10px;
            text-align: center;
            .el-upload--text{
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .el-icon{
                
                border: 1px solid #1b1b1b;
                border-radius: 50%;
                padding: 2px;
                color: #1b1b1b;
                margin-right: 7px;
                font-size: 20px;
            }
            button {
                color: #1b1b1b;
                background: transparent;
                border: 0;
                padding-left: 0;
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
        .addKitchen-model .type-wrapper .el-radio .el-radio__label{
            margin-right: 10px;
        }
        .addKitchen-model .type-wrapper .el-radio{
            margin-right: 10px;
        }
        .el-checkbox.el-checkbox--large .el-checkbox__label{
            margin-right: 5px;
        }
    }
</style>
