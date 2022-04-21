<template>
  <div :style="currentLocale == 'ar' ? 'direction:rtl' : 'direction:ltr' ">
    <!-- <Header /> -->
    <router-view/>
  </div>
</template>

<script>
  // import Header from './layout/header.vue'
export default {
  // components:{Header},
  computed: {
    currentLocale() {
      return this.$store.state.main.currentLocale;
    }
  }
}
</script>

<style>

</style>
