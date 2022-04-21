<template>
  <el-row>
    <el-col :span="24"><div class="grid-content bgPage-Title">{{title}}</div></el-col>
  </el-row>
</template>

<script>
export default {
    props:["title"]
}
</script>

<style>
    el-row {
        margin-bottom: 20px;
    }
    .bgPage-Title {
        height: 50px;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
    }
</style>