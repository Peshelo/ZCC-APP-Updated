<template>
    <NuxtLayout name="default">
      <nyikaCommitteeMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import nyikaCommitteeMembers from '../../components/nyika/nyikaCommitteeMembers.vue';

  export default {
    components: { nyikaCommitteeMembers },
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