<template>
    <NuxtLayout name="default">
      <regionAllMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import regionAllMembers from '@/components/region/regionAllMembers.vue';
  export default {
    components:{regionAllMembers},
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