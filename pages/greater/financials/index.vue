<template>
 <NuxtLayout name="default">
  <h1>Financials</h1>
  <greaterReports :id="this.scopeId"/>
 </NuxtLayout>
</template>

<script>
import greaterReports from '../../../components/greater/greaterReports.vue'
export default {
  components: { greaterReports },
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