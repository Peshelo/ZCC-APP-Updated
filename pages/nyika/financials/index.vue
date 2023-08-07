<template>
  <NuxtLayout name="default">
    <nyikaReports :id="this.scopeId"/>
  </NuxtLayout>
</template>

<script>
import nyikaReports from '../../../components/nyika/nyikaReports.vue'
export default {
  components: { nyikaReports },
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