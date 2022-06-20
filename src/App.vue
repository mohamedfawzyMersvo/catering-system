<template>
  <div :style="currentLocale == 'ar' ? 'direction:rtl' : 'direction:ltr' ">
    <!-- <Header /> -->
    <router-view/>
  </div>
</template>

<script>
  // import Header from './layout/header.vue'
    // import { useCookies } from "vue3-cookies";

export default {
  // components:{Header},
  computed: {
    currentLocale() {
      return this.$store.state.main.currentLocale;
    }
  },
  watch: {
    dark: {
      handler: function() {
        // const { cookies } = useCookies();
        // because we are using this handler immideatly we need to wait for data changes using nextTick.
        this.$nextTick(() => {

           
        //  this.$store.state.main.themeConfig.PrimaryColor ?
            document.documentElement.style.setProperty('--default-primary-color', this.$store.state.main.themeConfig.primaryColor )
            // document.documentElement.style.setProperty('--default-primary-color', '#5e1ad5');
          // this.$store.state.main.themeConfig.secondaryColor ?
            document.documentElement.style.setProperty('--default-second-color', this.$store.state.main.themeConfig.secondaryColor )
            // document.documentElement.style.setProperty('--default-second-color', '#5d19d4');  // for immediat color change
          
        })
      },
      immediate: true
    }
  }
}

</script>

<style>

</style>
