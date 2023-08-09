<template>
    <NuxtLayout name="default">
      <centerCommitteeMembers :id="this.scopeId"/>
    </NuxtLayout>
  </template>
  
  <script>
  import centerCommitteeMembers from '../../../components/center/centerCommitteeMembers.vue';

  export default {
    components: { centerCommitteeMembers },
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