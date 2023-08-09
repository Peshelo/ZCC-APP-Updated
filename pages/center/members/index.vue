<template>
    <NuxtLayout name="default">
      <centerMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import centerMembers from '../../../components/center/centerMembers.vue';
  export default {
    components:{centerMembers},
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