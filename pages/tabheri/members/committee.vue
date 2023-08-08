<template>
    <NuxtLayout name="default">
      <TabheriCommittee :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  export default {
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