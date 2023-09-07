<template>
  <NuxtLayout name="default">
    <h1 class="text-2xl font-bold">{{ region.name }} Region Dashboard</h1>
    <h2 class="text-md text-gray-600 font-semibold mb-5">Overview</h2>
    <h2 class="text-md font-bold mb-3">General Statistics</h2>
    <div class="grid lg:grid-cols-4 gap-4 mb-5">
      <NuxtLink to="./reports/" class="card">
        <div class="hover:shadow-lg duration-300 bg-white bg-gradient-to-b from-violet-600 via-violet-600 to-indigo-600 text-white rounded-md shadow p-4 justify-region flex items-region h-32">
          <div class="leading-none flex-1">
            <div class="card-header__title text-gray-dark mb-2">Annual Expected</div>
            <div class="flex items-region">
              <div class="font-semibold text-2xl m-0">$24,000</div>
            </div>
          </div>    
    <div class="p-5 py-6 rounded-full text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chart-bar" width="40" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
        <path d="M4 20l14 0"></path>
      </svg>
    </div>
        </div>
        <div class="w-full bg-gray-light h-1">
          <div class="bg-warning text-xs leading-none h-1 text-region text-white rounded" style="width: 45%"></div>
        </div>
      </NuxtLink>


      <NuxtLink to="./financials/" class="card">
        <div class="hover:shadow-lg duration-300 bg-white bg-gradient-to-b from-emerald-500 to-emerald-900 text-white rounded-md shadow p-4 justify-region flex items-region h-32">
          <div class="leading-none flex-1">
            <div class="card-header__title text-gray-dark mb-2">Current Balance</div>
            <div class="flex items-region">
              <div class="font-semibold text-2xl m-0">$50,000 </div>
            </div>
          </div>    
          <div class="p-5 py-5 rounded-full bg-purple-500 bg-gradient-to-t text-white"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
     <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
     <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
  </svg></div>
        </div>
        <div class="w-full bg-gray-light h-1">
          <div class="bg-primary text-xs leading-none h-1 text-region text-white rounded" style="width: 24%"></div>
        </div>
      </NuxtLink>
  
      <NuxtLink to="./members/" class="card">
        <div class="hover:shadow-lg duration-300 bg-white bg-gradient-to-b from-violet-600 via-violet-600 to-indigo-600 text-white rounded-md shadow p-4 justify-region flex items-region h-32">
          <div class="leading-none flex-1">
            <div class="card-header__title text-gray-dark mb-2">Number of Members</div>
            <div class="flex items-region">
              <div class="font-semibold text-2xl m-0">8</div>
            </div>
          </div>    
          <div class="p-5 py-6 rounded-full text-white"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chart-bar" width="40" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
     <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
     <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
     <path d="M4 20l14 0"></path>
  </svg></div>
        </div>
        <div class="w-full bg-gray-light h-1">
          <div class="bg-warning text-xs leading-none h-1 text-region text-white rounded" style="width: 45%"></div>
        </div>
      </NuxtLink>
  
      <NuxtLink to="./center/" class="card">
        <div class="hover:shadow-lg duration-300 text-white bg-white bg-gradient-to-r from-red-500 to-orange-500 rounded-md shadow p-4 justify-region flex items-region h-32">
          <div class="leading-none flex-1">
            <div class="card-header__title text-gray-dark mb-2">Number of Greaters</div>
            <div class="flex items-region">
              <div class="font-semibold text-2xl m-0">2</div>
            </div>
          </div>    
          <div class="p-5 py-5 rounded-full bg-purple-500 bg-gradient-to-t text-white"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
     <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
     <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
  </svg></div>      </div>
        <div class="w-full bg-gray-light h-1">
          <div class="bg-success text-xs leading-none h-1 text-region text-white rounded" style="width: 45%"></div>
        </div>
      </NuxtLink>
    </div>
  
    <h2 class="text-lg font-bold my-5">Center List</h2>
    <div class="grid grid-cols-4 gap-4">
      <NuxtLink :to="'./center/'+item.id" v-for="(item,index) in this.region.centers" :key="index" class="flex flex-row border-b-blue-500 border-b-2 hover:border-b-4 duration-100 justify-between items-region bg-white text-blue-500 w-full rounded-md border border-slate-200 p-4 hover:shadow">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-filled" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M9 3a1 1 0 0 1 .608 .206l.1 .087l2.706 2.707h6.586a3 3 0 0 1 2.995 2.824l.005 .176v8a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-11a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" stroke-width="0" fill="currentColor"></path>
  </svg>
  <p class="text-lg text-black">{{ item.name }}<br><label class="text-xs text-gray-400">{{ item.greaters.length}} greaters</label></p>
      </NuxtLink>
    </div>
  
  </NuxtLayout>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data(){
      return{
        region: [],
        loading: true,
      }
    },
  methods:{
    async getRegion() {
        console.log("Fetching region Data....");
        this.loading = true;
        const scopeId = localStorage.getItem('scopeId')
        const URL= `http://3.10.190.157:7635/regions/get{id}?id=${scopeId}`;
        // const token = localStorage.token;
        // console.log('Token is string: ' + isString(token))
        // console.log(token);
        await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.token,
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((res) => {
          this.region = res.data;
          // this.tabheriMembers = res.data.members
          console.log(this.region);
          console.log("Fetching region Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true;
  
        }).finally(() => this.loading = false);
      },
  },
  
  mounted(){
   this.getRegion();
  }
  }
  </script>
  
  <style>
  
  </style>