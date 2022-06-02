<template>
   <div>
      <Header>
         <el-menu-item index="4" class="edit-theme"> 
            <p  @click.stop="openModel = true"> Edit theme </p>
            
           </el-menu-item>


         <!-- <el-menu-item index="3" :route="{name:'single'}"> <List class="icon" /></el-menu-item> -->
            <Theme :modelVisible="openModel" @modelClose="openModel = false"/>
      </Header>
      <router-view />
   </div>
</template>

<script>
import Header from '@/layout/header'
import Theme from './components/theme.vue';

// import { HomeFilled } from '@element-plus/icons'

export default {
   components:{Header, Theme},
   data() {
      return {
         openModel:false,
      }
   },
}
</script>

<style lang="scss">
li.edit-theme{
   position: absolute;
   z-index: 1;
   // left: -10px;
   top: -10px;
   background-color: black;
   color: #fff;
   height: 29px;
   line-height: 0.7;
   border-radius: 0 0 5px 5px;
   &:hover{
      background-color: black !important;
      color: #fff !important;
   }
}
   .edit-theme.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .edit-theme.el-menu-item:not(.is-disabled):hover {
      background-color: black !important;
      color: #fff !important;
   }
</style>
