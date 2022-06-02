<template>
  <div :style="currentLocale == 'ar' ? 'direction:rtl' : 'direction:ltr' ">
    <!-- <Header /> -->
    <router-view/>
  </div>
</template>

<script>
  // import Header from './layout/header.vue'
    import { useCookies } from "vue3-cookies";

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
        const { cookies } = useCookies();
        // because we are using this handler immideatly we need to wait for data changes using nextTick.
        this.$nextTick(() => {
          cookies.get("color1") ?
            document.documentElement.style.setProperty('--default-primary-color', cookies.get("color1") ):
            document.documentElement.style.setProperty('--default-primary-color', '#5e1ad5');
          cookies.get("color2") ?
            document.documentElement.style.setProperty('--default-second-color', cookies.get("color2") ):
            document.documentElement.style.setProperty('--default-second-color', '#5d19d4');  // for immediat color change
          
        })
      },
      immediate: true
    }
  }
}

</script>

<style>

</style>
