<template>
   <div>
      <Header>
         <!-- <el-menu-item index="2" :route="{name:'order.home'}"> <HomeFilled class="icon" /></el-menu-item> -->
         <!-- <el-menu-item index="3" :route="{name:'order.list'}"> <List class="icon" /></el-menu-item> -->
      </Header>
      <router-view />
   </div>
</template>

<script>
import Header from '@/layout/header'
// import { HomeFilled } from '@element-plus/icons'

export default {
   components:{Header}
}
</script>

<style>

</style>
