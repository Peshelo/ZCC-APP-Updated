<template>
  <NuxtLayout name="default">
    <tabheriCollections :id="1"/>
  </NuxtLayout>
</template>

<script>
import tabheriCollections from '../../../components/tabheri/tabheriCollections.vue' 
 export default {
  components: { tabheriCollections },
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