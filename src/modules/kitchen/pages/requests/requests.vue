<template>
    <PageTitle title="Alert requests"/>    
    <div class="main-bg">
        <el-main>
            <h3>New Requests</h3>
            <el-table :data="tableData" border style="width: 100%" class="order-table">
                <el-table-column prop="serial" label="Serial" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="demand" label="Demand" />
                <el-table-column prop="details" label="Details" />
                <el-table-column prop="time" label="Time" />
                <el-table-column prop="activity" label="Activity">
                    <el-switch
                        v-model="value4"
                        class="ml-2"
                        inline-prompt
                        :active-icon="Check"
                        :inactive-icon="Close"
                    />
                </el-table-column>
            </el-table>

            <h3>Acceptable requests</h3>
            <el-table :data="tableData" border style="width: 100%" class="order-table">
                <el-table-column prop="serial" label="Serial" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="demand" label="Demand" />
                <el-table-column prop="details" label="Details" />
                <el-table-column label="Time">
                    07:05
                  <el-button type="text" class="x-btn">  <el-icon><View class="icon"/></el-icon></el-button>
                </el-table-column>
                <el-table-column> </el-table-column>
                <el-table-column prop="activity" label="Activity">
                    <el-switch
                        v-model="value4"
                        class="ml-2"
                        inline-prompt
                        :active-icon="Check"
                        :inactive-icon="Close"
                    />
                    <el-button type="text" class="x-btn"> X</el-button>

                    </el-table-column>
            </el-table>
        </el-main>
    </div>
</template>
<script>

import PageTitle from '@/layout/pageTitle'
import { View } from '@element-plus/icons'
import axios from 'axios'

export default {
    components:{PageTitle, View},
     data() {
      return {
        info:null,
        value4: true,
        tableData : 
        [
            {
                serial: '1',
                name: 'Tom',
                demand: 'Cofee',
                details: '3',
                time: '07:05',
                activity: '07:05',
            },
            {
                serial: '2',
                name: 'Tom',
                demand: 'Cofee',
                details: '3',
                time: '07:05',
                activity: '07:05',
            },
        ]
        
      }
    },
    mounted () {
        axios
            .get('/order/1/GetOrdersListByMenuItemId')
            .then(response => (this.info = response))
            console.error(this.info)
    }
}
</script>

<style lang="scss">
    .main-bg{
        background:#f6f6f6;
        height: 100vh;
    }
    .order-table{
        thead tr th {
            border-bottom: 6px solid #f6f6f6 !important;
        }
        tbody tr td {
            border-bottom: 4px solid #f6f6f6 !important;
        }
    }
    .el-button.x-btn{
        margin: 0 15px;
        color:#89828f ;
        font-size: 12px;
    }

    @include rtl() {

    }
</style>