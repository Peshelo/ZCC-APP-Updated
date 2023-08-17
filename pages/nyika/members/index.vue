<template>
    <NuxtLayout name="default">
      <nyikaMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import nyikaMembers from '@/components/nyika/nyikaMembers.vue';

  export default {
    components: { nyikaMembers },
    data() {
        return {
            scopeId: ""
        };
    },
    beforeMount() {
        this.scopeId = localStorage.scopeId;
    },
}
  </script>
  
  <style>
  
  </style>