<template>
     <el-dialog
            v-model="dialogVisible"
            width="30%"
            custom-class="order-model theme-model"
            :before-close="handleClose"
        >
        <template #title>
            <p class="theme-title"> {{$t('common.changeSystemsetting')}} </p>
        </template>
            <div>
                <el-upload
                    ref="upload"
                    class="upload-demo upload-logo"
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
                        <div v-if="itemImageBytes" class="preview-img-theme">
                            <img :src="itemImageBytes" />
                        </div>
                    </template>
                </el-upload>
            </div>
        <div class="colors-wrapper">
            <div class="demo-color-block">
                <span class="demonstration">{{$t('common.primaryColor')}}</span>
                <el-color-picker v-model="formObj.PrimaryColor" @active-change="changeColor1" />
            </div>
            <div class="demo-color-block">
                <span class="demonstration">{{$t('common.secondaryColor')}}</span>
                <el-color-picker v-model="formObj.secondaryColor" @active-change="changeColor2"/>
            </div>
            <!-- <div class="demo-color-block">
                <span class="demonstration">{{$t('common.thirdColor')}}</span>
                <el-color-picker v-model="formObj.optionalColor" />
            </div> -->
            <el-form-item :label="$t('common.breakTime')" class="break-time">
                <el-input-number v-model="formObj.breakTime" :min="0" /> &nbsp; {{$t('common.inMinutes')}}
            </el-form-item>
        </div>
        
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleSubmit">{{$t("common.done")}}</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>
    // import axios from 'axios'
    import { useCookies } from "vue3-cookies";
    import axios from 'axios'
    import { ElMessage } from 'element-plus'


export default {
    components:{},
    props:[
        "modelVisible",
    ],
    data() {
        return {
            formObj:{
                PrimaryColor :"",
                secondaryColor :"",
                optionalColor:"",
                thumbnial:"",
                breakTime:0
            },
            fileList:[],
        }
    },
    mounted () {
        // const { cookies } = useCookies();
        // this.primaryColor = cookies.get("color1") || "#5e1ad5";
        // this.secondaryColor = cookies.get("color2") || "#5d19d4";

        this.loadItem();
    },
    methods: {
        handleSubmit(){
            var formdata = new FormData();
            Object.entries(this.formObj).forEach(([key, value]) => {
                formdata.append(key, value);
            });
            formdata.set('thumbnial', this.file);
            axios
            .put(`ThemeConfiguration/${this.$store.state.main.themeConfig.id}/UpdateThemeConfiguration`, formdata , {headers: {'content-type': 'multipart/form-data'} })
            .then(() => {
                this.successMessage();
                this.loadItem();
                this.handleClose();
            })
        },
        loadItem(){
            axios.get(`ThemeConfiguration/GetThemeConfiguration`).then(res => {
                this.formObj.PrimaryColor = res.primaryColor;
                this.formObj.secondaryColor = res.secondaryColor;
                this.formObj.optionalColor = res.optionalColor;
                this.formObj.breakTime=res.breakTime;
                console.log(res);
                this.$store.commit('main/setThemeConfig', res);

            })
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyAdded'),
                type: 'success',
            })
        },
        changeColor1(color){
            const { cookies } = useCookies();
            cookies.set("color1", color);
            document.documentElement.style.setProperty('--default-primary-color', color); // for immediat color change
        },
        changeColor2(color){
            const { cookies } = useCookies();
            cookies.set("color2", color);
            document.documentElement.style.setProperty('--default-second-color', color);  // for immediat color change
        },
        handleImgChange () {
        this.fileList = this.$refs.upload.uploadFiles;
        this.file = event.target.files[0];

        if(this.fileList.length === 2) this.fileList.splice(0, 1)
        let self = this;
        // self.formObj.Thumbnial = event.target.files[0];
                // Ensure that you have a file before attempting to read it
                if (event.target.files && event.target.files[0]) {
                        
                        // create a new FileReader to read this image and convert to base64 format
                        var reader = new FileReader();
                        // Define a callback function to run, when FileReader finishes its job
                        reader.onload = (e) => {
                            console.log('e', e)
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        self.formObj.thumbnial  = e.target.result;
                        }
                        // Start the reader job - read file as a data url (base64 format)
                        reader.readAsDataURL(event.target.files[0]);
                }
            

        },
        handleRemove(){
            console.log('delete');
            this.file = "";
            this.formObj.thumbnial = "";
        },
        handleClose(){
            this.$emit('modelClose');
        },
    },
    watch: { 
        modelVisible() {
            this.dialogVisible = this.modelVisible;
        }
    }
}
</script>

<style lang="scss">
    .theme-model{
        
        .el-dialog__body{
            margin-top: 25px;
        }
        .colors-wrapper{
            padding: 17px 37px;
            text-align: left;
            .demo-color-block {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
            }
            .demo-color-block .demonstration {
                min-width: 105px;
                margin-right: 10px;
            }
        }
    .upload-logo {
        // display: flex;
        // align-items: center;
        // justify-content: space-around;
        padding: 0 22px;
        .el-upload-list__item:first-child {
            width: 140px;
            margin: 20px auto;
            margin-bottom: 0;
        }
    .el-upload-list__item-name{
         width: 96px;
        margin: auto;   
    }}
    .preview-img-theme{
        margin-top: 20px;
        img{
            width: 143px;
            margin: auto;
            display: block;
            border-radius: 10px;
        }
    }
    @media (max-width: 576px) {
        .el-tabs__content .el-dialog.order-model{
            width: 53%;
        }
    }
    .theme-title{
        margin-bottom: 30px;
    }
    .break-time{
        .el-form-item__label{
            margin-right:39px;
        }
        .el-input-number{
            width: 110px;
        }
    }
}
 @include rtl() {
    .colors-wrapper{
        text-align: right
    }
    .break-time{
        .el-form-item__label{
            margin-left: 19px;
            margin-right: 0;
        }
    }
 }
</style>
