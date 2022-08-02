<template>
   <div>
      <Header>
         <!-- <el-menu-item index="2" :route="{name:'order.list'}"> <HomeFilled class="icon order-now" />{{$t('common.orderNow')}}</el-menu-item>
         <el-menu-item index="3" :route="{name:'listMyOrders'}"> <List class="icon myOrders" />{{$t('common.myOrders')}} </el-menu-item> -->
      </Header>
      <router-view />
   </div>
</template>

<script>
import Header from '@/layout/header'
// import { HomeFilled, List } from '@element-plus/icons'

export default {
   components:{Header}
}
</script>

<style>
.myOrders{
   margin-right: 7px;
   height: 21px !important;
}
.order-now{
   margin-right: 7px;
   height: 21px !important;
}
</style>
