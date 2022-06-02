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
            <div class="num-item"  v-for="(drink, index) in drinks" :key="index">
                <el-input-number v-model.number="drink.sugarSpoon" :min=1 @change="handleChange" />
                <span class="title">{{$t("common.sugar")}}</span>
            </div>
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
    import axios from 'axios'
    import { ElMessage } from 'element-plus'

export default {
    props:[
        "modelVisible", "drink"
    ],
    data() {
        return {
            dialogVisible: false,
            drinks:[],
        }
    },
    updated() {
        if(this.modelVisible) {
            for (let i=1; i <= this.drink.num; i++) {
                this.drinks.push({sugarSpoon:1})
            }
            // this.drinks = Array(this.drink.num).fill({sugarSpoon:1})

        }
    },
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
            let order = {
                menuItemId: this.drink.id,
                quantity: this.drink.num,
                sugarSpoon: this.drinks.map(drink => drink.sugarSpoon)
            }
            axios
            .post('Order/CreateOrder', order)
            .then(() => {
                this.successMessage();
                this.handleClose();
            })
        }
    },
    watch: { 
        modelVisible() {
            this.dialogVisible = this.modelVisible;
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
