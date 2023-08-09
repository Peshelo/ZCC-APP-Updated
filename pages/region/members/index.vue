<template>
    <NuxtLayout name="default">
      <regionsMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import regionsMembers from '@/components/region/regionMembers.vue';
  export default {
    components:{regionsMembers},
    data(){
      return{
        scopeId:''
      }
    },
  beforeMount(){
    this.scopeId= localStorage.scopeId
  }
  }
  </script>
  
  <style>
  
  </style>