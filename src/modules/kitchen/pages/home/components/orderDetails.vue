<template>
     <el-dialog
            v-model="dialogVisible"
            width="30%"
            custom-class="order-model"
            :before-close="handleClose"
        >
        <template #title>
            <p> Khaled ElAhmed <span v-if="selectdItem && selectdItem.menuItem"> {{$store.state.main.currentLocale == "en" ? selectdItem.menuItem.name : selectdItem.menuItem.name_Ar}} </span></p>
        </template>
        <div class="order-list-num" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
            <div class="num-item" v-for="sugarSpoon in selectdItem.sugarSpoon.split(',')" :key="sugarSpoon">
                <span class="num">{{sugarSpoon}}</span>
                <span class="title">sugar</span>
            </div>
        </div>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose">{{ $t('common.done') }}</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>
export default {
    props:[
        "modelVisible","selectdItem",
    ],
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        handleClose(){
            this.$emit('modelClose');
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
                margin: 0;
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
                .num{
                   text-align: center;
                   display: inline-block;
                   background-color: #e6e6e6;
                   color:#2d2d2d; 
                   width: 35px;
                   border-radius: 4px;
                   margin-right: 10px;
                }
                .title{
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
        .order-model .order-list-num .num-item {
            text-align: right;
        }
        .order-model .order-list-num .num-item .num{
            margin-left: 10px;
            margin-right: 0;
        }
        .order-model{
            .el-dialog__footer {
                text-align: left
            }
        }
    }
</style>
