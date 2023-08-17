<template>
  <NuxtLayout name="default">
    <h1 class="text-4xl my-4 font-bold">Jerusalem Members</h1>
    <adminMembers :id="this.scopeId"/>
  </NuxtLayout>
</template>

<script>
import adminMembers from '@/components/admin/adminMembers.vue';
export default {
  components:{adminMembers},
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