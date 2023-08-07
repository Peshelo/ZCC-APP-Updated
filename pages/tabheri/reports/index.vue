<template>
  <NuxtLayout name="default">
    <tabheriReports :id="this.scopeId"/>
  </NuxtLayout>
</template>

<script>
import tabheriReports from '../../../components/tabheri/tabheriReports.vue'
export default {
  components: { tabheriReports },
  data(){
    return{
      scopeId: ""
    }
  },
beforeMount(){
  this.scopeId = localStorage.scopeId;
}
}
</script>

<style>

</style>