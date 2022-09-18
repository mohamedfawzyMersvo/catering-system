<template>
  <div> 
    <el-menu
        :default-active="activeIndex"
        class="el-menu-header"
        mode="horizontal"
        :ellipsis="false"
        router
    >
     <el-sub-menu index="6" class="lang-menu">
      <template #title>{{currentLocale == "ar" ? "عربى":"English"}}</template>
      <li class="el-menu-item" @click="changeLang('en')">English</li>
      <li class="el-menu-item" @click="changeLang('ar')">عربى</li>
    </el-sub-menu>
    <el-sub-menu index="2-4">
      <template #title>{{$t('common.profile')}}</template>
      <el-menu-item>{{ loggedUser?.email }}</el-menu-item>
      <el-menu-item class="logout-item" :route="{path:'/'}">
        <span @click="logOut()">{{$t('common.logout')}}</span>
              <img scr="@/assets/logout.png" />
        </el-menu-item>
    </el-sub-menu>  
  
    <div class="flex-grow" />
            
     
    
      <el-menu-item-group class="header-icon">
      <slot></slot>
        <!-- <el-menu-item index="2" :route="{name:'home'}"> <HomeFilled class="icon" /></el-menu-item>
        <el-menu-item index="3" :route="{name:'list'}"> <List class="icon" /></el-menu-item>
        <el-menu-item index="4"> <Medal class="icon" /></el-menu-item>
        <el-menu-item index="5" :route="{name:'requests'}" class="bell-notifi">
          <el-badge is-dot class="item">
              <Bell class="icon" />
          </el-badge>
        </el-menu-item> -->
    </el-menu-item-group>
    <el-menu-item index="1" :route="{name:homeLink}" class="logo-item">
      <!-- <img src="@/assets/logo.png" class="logo-img" /> -->
      <!-- <img src="@/assets/logo2.png" class="logo-img" /> -->
      <img :src="$store.state.main.themeConfig.logo?.filePath || ''" class="logo-img"  />
      <!-- {{$store.state.main.themeConfig.logo.filePath}} -->
      </el-menu-item>
  </el-menu>
  <div class="h-6"></div>
  </div>
</template>

<script>
<el-icon><medal /></el-icon>
  // import { HomeFilled, List, Bell, Medal } from '@element-plus/icons'
import i18n from '../i18n.js';
// import { useCookies } from "vue3-cookies";

// import router from './../router.js';
export default {
  name: 'Header',
  // components:{HomeFilled, List, Bell, Medal },
    data() {
      return {
        langs: ['ar', 'en'],
        activeIndex: 1
      }
    },
  beforeMount(){
    this.addRtlClass();
    console.log('i18n.global.locale.value', i18n.global.locale.value)
  },
  mounted(){
    },
  methods: {
    changeLang(lang){
      this.$store.commit('main/setCurrentLocale', lang);
      i18n.global.locale.value = lang
      this.addRtlClass()
    },
    logOut() {
      // const { cookies } = useCookies();
      this.$store.commit("main/logout");
      this.$cookies.remove('token');
      this.$router.push({ path: '/' });
    },
    addRtlClass(){
      let rootEl = document.querySelector('html');
      this.currentLocale == 'ar' ?  rootEl.classList.add('rtl'):  rootEl.classList.remove('rtl');
      i18n.global.locale.value = this.currentLocale;
      // i18n.changeLanguage(this.currentLocale)
    }
  },
  computed: {
    currentLocale() {
      return this.$store.state.main.currentLocale;
    },
    homeLink(){
      return this.$store.state.main.homeLink;
    },
    loggedUser(){
      return this.$store.state.main.loggedUser;
    }
  }
}
</script>

<style lang="scss">
  .el-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    direction: ltr;

    .header-icon{  
      display: flex;
      justify-content: space-between;
    }
    .bell-notifi {
      line-height: 0;
    }
    .icon {
      color: #1f1f1f;
      height: 34px;
    }
    &.el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: 2px solid #fff !important;
    }
    
    .header-icon>ul{
      display: flex;
    }
    .lang-menu{
      // margin:0 4px;
      .el-sub-menu__title{
        padding-left: 0;
      }
    }
    .logout-item{
      padding-right: 0;
    }
    @media (max-width: 376px) {
      .el-sub-menu__title.el-tooltip__trigger{
        padding: 0;
      }
     }
  }
@include ltr() {
  .el-menu-header {
     @media (max-width: 768px) {
      .logo-item{
        padding-left: 0;
      }
     }
    .lang-menu{
      margin-right: 5px;
      .el-sub-menu__title{
        padding-right: 0;
      }
    }
    .logout-item{
      padding-left: 0;
      padding-right: 20px;
    }
  }
}
@include rtl() {
  @media (max-width: 768px) {
    .logo-item{
        padding-right: 0;
      }
    }
}

  .flex-grow {
    width:76%;
  }
  .logo-img{
      width: auto;
      height: 50px;
  }
  @media (max-width: 576px) {
    .logo-img{
      width: 144px;
    }
    .el-menu--popup{
      svg {
        height: 50px;
        width: 50px;
      }
    }
    .el-sub-menu__icon-arrow {
      svg {
          height: 24px;
          width: 24px;
      }
    }
  }
</style>
