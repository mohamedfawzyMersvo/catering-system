<template>
  <div> 
    <el-menu
        :default-active="activeIndex"
        class="el-menu-header"
        mode="horizontal"
        router
    >
    <el-menu-item index="1" :route="{name:homeLink}"><img src="@/assets/logo.png" class="logo-img" /></el-menu-item>
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
    <el-sub-menu index="6" class="lang-menu">
      <template #title>{{currentLocale == "ar" ? "عربى":"English"}}</template>
      <li class="el-menu-item" @click="changeLang('en')">English</li>
      <li class="el-menu-item" @click="changeLang('ar')">عربى</li>
    </el-sub-menu>
  </el-menu>
  <div class="h-6"></div>
  </div>
</template>

<script>
<el-icon><medal /></el-icon>
  // import { HomeFilled, List, Bell, Medal } from '@element-plus/icons'
import i18n from '../i18n.js';
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
  methods: {
    changeLang(lang){
      this.$store.commit('main/setCurrentLocale',lang);
      i18n.global.locale.value = lang
      this.addRtlClass()
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
    }
  }
}
</script>

<style lang="scss">
  .el-menu-header {
    display: flex;
    justify-content: space-between;
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
    .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: 2px solid var(--default-primary-color);
      color: var(--default-primary-color) !important;
    }
    .el-menu-item.is-active{
      .icon {
        color: var(--default-primary-color);
      }
    }
    .header-icon>ul{
      display: flex;
    }
  }
  @media (max-width: 576px) {
    .logo-img{
      width: 320px;
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
