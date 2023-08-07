<template>

    <div v-if="showSide" class="min-h-full">
      <!-- <TabheriSideNav/> -->
      <div v-if="this.role === 'TABHERA_ADMIN'">
        <TabheriSideNav/>
      </div>
      <div v-if="this.role === 'NYIKA_ADMIN'">
        <NyikaSideNav/>
      </div>
      <div v-if="this.role === 'GREATER_ADMIN'">
        <GreaterSideNav/>
      </div>
      <div v-if="this.role === 'CENTER_ADMIN'">
        <CenterSideNav/>
      </div>
  
      <div v-if="this.role === 'REGIONAL_ADMIN'">
        <RegionSideNav/>
      </div>
  
      <div v-if="this.role === 'JERUSALEM_ADMIN'">
        <AdminSideNav/>
      </div>
      <div class="flex bg-sky-50 h-screen overflow-auto flex-1 md:max-w-12xl md:mx-auto flex-col lg:pl-64">
        <TopNav/>
        <main class="flex-1 p-10 pb-8">
          <!-- Page header -->
        <slot/>
         
        </main>
      </div>
    </div>
    </template>
    <script setup>
     
  </script>
    
    <script>
  import sideNav from '../components/admin/sideNav.vue';
  import TopNav from '../components/admin/TopNav.vue';
  import TabheriSideNav from '../components/tabheri/sideNav.vue'
  import NyikaSideNav from '../components/nyika/sideNav.vue'
  import GreaterSideNav from '../components/greater/sideNav.vue'
  import CenterSideNav from '../components/center/sideNav.vue'
  import RegionSideNav from '../components/region/sideNav.vue'
  import AdminSideNav from '../components/admin/sideNav.vue'
  
  
  
    export default {
     
      components: {sideNav,TopNav,TabheriSideNav,NyikaSideNav,GreaterSideNav,CenterSideNav,RegionSideNav,AdminSideNav},
          data(){
        return{
          show:false,
          showSide: true,
          role: ''
        }
      },
      mounted(){
        this.role = localStorage.getItem('role');
      }
    }
    </script>
    