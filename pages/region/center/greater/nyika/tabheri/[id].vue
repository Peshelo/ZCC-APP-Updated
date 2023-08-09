<template>
    <NuxtLayout name="default">
      <TabheriMembers :id="this.$router.params.id"/>
    </NuxtLayout>
  </template>
  
  <script>
  import TabheriMembers from "@/components/tabheri/tabheriMembers.vue"
  export default {
    components: {TabheriMembers},
    data(){
      return{
        scopeId:''
      }
    },
  mounted(){
  }
  }
  </script>
  
  <style>
  
  </style>