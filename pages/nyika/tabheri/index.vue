<template>
  <NuxtLayout name="default">
    <nyikaTable :id="this.scopeId"/>
  </NuxtLayout>
    
</template>

<script>
import nyikaTable from '../../../components/nyika/nyikaTable.vue'
export default {
  components: { nyikaTable },
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