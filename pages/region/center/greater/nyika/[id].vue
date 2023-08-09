<template>
  <NuxtLayout name="default">
    <nyikaTable :id="this.$route.params.id"/>
  </NuxtLayout>
</template>

<script>
import nyikaTable from '@/components/nyika/nyikaTable.vue'
export default {
  components: { nyikaTable },
}
</script>

<style>

</style>