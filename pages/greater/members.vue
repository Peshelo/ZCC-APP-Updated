<template>
    <NuxtLayout name="default">
      <greaterMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import greaterMembers from '../../components/greater/greaterMembers.vue';
  export default {
    components:{greaterMembers},
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