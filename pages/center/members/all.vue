<template>
    <NuxtLayout name="default">
      <centerAllMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import centerAllMembers from '@/components/center/centerAllMembers.vue';
  export default {
    components:{centerAllMembers},
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