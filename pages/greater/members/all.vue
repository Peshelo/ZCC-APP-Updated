<template>
    <NuxtLayout name="default">
      <greaterAllMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import greaterAllMembers from '@/components/greater/greaterAllMembers.vue';
  export default {
    components:{greaterAllMembers},
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