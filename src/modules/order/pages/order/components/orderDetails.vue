<template>
     <el-dialog
            v-model="dialogVisible"
            width="30%"
            custom-class="order-model"
            :before-close="handleClose"
        >
        <template #title>
            <p> {{$store.state.main.currentLocale == "en" ?drink.name : drink.name_Ar}} </p>
        </template>
        <div class="order-list-num" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
            <div class="num-item" >
                <el-input-number v-model.number="theDrink.sugarSpoon" :min=0 @change="handleChange" />
                <span class="title">{{$t("common.sugar")}}</span>
            </div>
            <el-form-item class="tags-wrapper" v-if="tagsOptions.length">
                <el-select
                    v-model="theDrink.tag"
                    class="select-tags"
                    multiple
                    filterable
                    default-first-option
                    :reserve-keyword="false"
                    :placeholder="$t('common.tagsPlaceHolder')"
                >
                    <el-option
                    v-for="item in tagsOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>
            </el-form-item>
            <!-- <div class="num-item">
                <el-input-number v-model="num" :min="1" @change="handleChange" />
                <span class="title">light sugar</span>
            </div>
            <div class="num-item">
                <el-input-number v-model="num" :min="1" @change="handleChange" />
                <span class="title">light sugar</span>
            </div> -->
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
    import { ElMessage } from 'element-plus'

export default {
    props:[
        "modelVisible", "drink", "tagsOptions"
    ],
    data() {
        return {
            dialogVisible: false,
            drinks:[],
            theDrink:{}
        }
    },
    // mounted() {
        
    
    //     if(this.modelVisible) {
    //         // for (let i=1; i <= this.drink.quantity; i++) {
    //         //     console.log('i', i)
    //         //     if (this.drink) {
    //         //         this.drinks.push({...this.drink});
    //         //         // this.drinks[i].sugarSpoon = 1
    //         //     }
    //         // }
    //         // this.drinks = Array(this.drink.num).fill({sugarSpoon:1})
    //         this.theDrink = this.drink
    //     }
    // },
    methods: {
        handleClose(){
            this.resetData();
            this.$emit('modelClose');
        },
        successMessage(){
            ElMessage({
                message: this.$t('common.successfullyOrdered'),
                type: 'success',
            })
        },
        resetData(){
            Object.assign(this.$data, this.$options.data.apply(this))
        },
        handleSubmit(){
            // let order = {
                // menuItemId: this.drink.id,
                // quantity: this.drink.num,
                // sugarSpoon: this.drinks.map(drink => drink.sugarSpoon),
                //  ...this.drink
            // }
            // this.drinks.map(order => {
            //     this.$store.commit('main/setOrder',order);
            // })
            this.$store.commit('main/setOrder',  this.theDrink);
           
            this.handleClose();
            // axios
            // .post('Order/CreateOrder', order)
            // .then(() => {
                // this.successMessage();
            // })
        }
    },
    watch: { 
        modelVisible() {
            this.dialogVisible = this.modelVisible;
            this.theDrink = this.drink
        }
    }
}
</script>

<style lang="scss">
    .order-model{
        background-color: #f8f8f8;
        .el-dialog__header{
            padding: 10px;
            p{
                text-align: left;
                margin: 0;
                font-size: 23px;
                span{
                    background-color: #e6e6e6;
                    color: #a3a3a3;
                    margin-left: 10px;
                    padding: 0 5px;
                    border-radius: 4px;
                    font-size: 13px;
                }
            }
        }
        .el-dialog__body{
            padding: 0;
        }

        .order-list-num{
            background-color: #fff;
            padding: 0 10px;
            padding-top: 8px;
            padding-bottom: 1px;
            .num-item{
                background-color: #f8f8f8;
                height: 44px;
                line-height: 44px;
                margin-bottom: 7px;
                text-align: left;
                
                .title{
                    margin-left: 10px;
                    color: #2d2d2d;
                }
            }
        }
        .select-tags{
             width: 80%;
            .el-tag:nth-child(1){
                background-color: #d2d6dd !important;
            }
            .el-tag:nth-child(2){
                background-color: #b4dfe5 !important;
            }
            .el-tag:nth-child(3){
                background-color: #dce4f8 !important;
            }
            .el-tag:nth-child(4){
                background-color: #d3d6fb !important;
            }
            .el-tag:nth-child(5){
                background-color: #fadee0 !important;
            }
        }
        .dialog-footer{
            .el-button{
                background-color: var(--default-second-color);
                color: #fff;
            }
        }
    }
    @media (max-width: 576px) {
        .el-tabs__content .el-dialog.order-model{
            width: 53%;
        }
    }
 @include rtl() {
     .num-item .title{
         margin-right: 10px;
     }
 }
</style>
