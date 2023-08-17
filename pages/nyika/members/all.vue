<template>
    <NuxtLayout name="default">
      <nyikaAllMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import nyikaAllMembers from '@/components/nyika/nyikaAllMembers.vue';
  export default {
    components:{nyikaAllMembers},
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