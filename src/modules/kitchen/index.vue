<template>
   <div>
      <Header>
         <!-- <el-menu-item index="2" :route="{name:'kitchen.home'}"> <HomeFilled class="icon" /></el-menu-item> -->
         <el-menu-item index="3" :route="{name:'served'}"> <List class="icon" /> {{$t('common.served')}}</el-menu-item>
      </Header>
      <router-view />
   </div>
</template>

<script>
import Header from '@/layout/header'
import { List } from '@element-plus/icons'

export default {
   components:{Header, List}
}
</script>

<style>

</style>
