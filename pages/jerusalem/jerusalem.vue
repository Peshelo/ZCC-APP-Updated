<template>
  <NuxtLayout name="default">
  
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">ZCC Church</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the church data.</p>
      </div>
      <form @submit.prevent="addNew()" class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <input class="p-2 rounded-sm" v-model="region" type="text" name="Region" id="region" placeholder="New Region Name">
        <button type="submit" class="inline-flex items-center justify-center border border-transparent bg-indigo-600 px-4 py-3 rounded-sm text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add</button>
      </form>
    </div>
    <div class="grid grid-cols-4 my-10 gap-3">
      <div @click="getCenters(region.id)" v-for="(region,index) in this.regions" :key="index" class="bg-cyan-600 p-5 w-full shadow-xl rounded-md hover:-mt-2 duration-300">
        <p class="text-white text-lg bbold mb-3">{{ region.name }}</p>
        <p class="text-xs text-gray-200">No. of centers ({{ region.centers.length }})</p>
    </div>
    </div>
    
    <!-- <p>These centers{{ this.centers }}</p> -->
<div v-if="showCenter" class="flex flex-row justify-between items-center">
   <p class="text-md mmedium my-5">Showing Centers </p>
   <select class="border rounded-md">
      <option v-for="(region,index) in this.regions" :key="index" @select="getCenters(region.id)">
        {{ region }}
      </option>
    </select>
</div>
   
  
            <div v-if="showCenter" class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Center Name</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No of Greaters</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                     Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr  v-for="(center,index) in centers.centers" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{center.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ center.greaters.length }}</td>
                    <td class="relative text-center whitespace-nowrap border-b border-gray-200 py-4 pr-4 pl-3 text-sm font-medium sm:pr-6 lg:pr-8">
                      <button href="#region" @click="getGreaters(center.id)" class="text-indigo-600 hover:text-indigo-900">View<span class="sr-only"></span></button>
                    </td>
                  </tr>
    
                  <!-- More people... -->
                </tbody>
              </table>
              <p v-if="centers.centers === null" class="text-center my-2 text-red-500">No centers yet</p>

              
            </div>
            <!-- <p>These Greaters ({{ this.greaters }})</p> -->
            <div v-if="showGreater" class="flex flex-row justify-between items-center">
   <p class="text-md mmedium my-5" id="region">Greater View </p>
   <select class="border rounded-md">
      <option v-for="(greater,index) in greaters.greaters" :key="index" @change="getGreaters(greaters.id)">
        {{ greater.name }}
      </option>
    </select>
</div>
   
  
            <div v-if="showGreater" class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Greater Name</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No of Tabheris</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr   v-for="(greater,index) in greaters.greaters" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{greater.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ greater.nyikas.length }}</td>
                    <td class="relative whitespace-nowrap text-center border-b border-gray-200 py-4 pr-4 pl-3  text-sm font-medium sm:pr-6 lg:pr-8">
                      <button href="#center" @click="getNyikas(greater.id)" class="text-indigo-600 hover:text-indigo-900">View<span class="sr-only"></span></button>
                    </td>
                  </tr>
  
                  <!-- More people... -->
                </tbody>
              </table>
              <p v-if="centers.centers === null" class="text-center my-2 text-red-500">No centers yet</p>
            </div>

            <div v-if="showNyika" class="flex flex-row justify-between items-center">
   <p class="text-md mmedium my-5" id="region">Nyika View </p>
   <select class="border rounded-md">
      <option v-for="(nyika,index) in nyikas.nyikas" :key="index" @change="getTabheris(nyika.id)">
        {{ nyika.name }}
      </option>
    </select>
</div>
   
  
            <div v-if="showNyika" class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Nyika Name</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No of Tabheris</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr   v-for="(nyika,index) in nyikas.nyikas" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{nyika.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ nyika.taberis.length }}</td>
                    <td class="relative whitespace-nowrap text-center border-b border-gray-200 py-4 pr-4 pl-3  text-sm font-medium sm:pr-6 lg:pr-8">
                      <button href="#center" @click="getTabheris(nyika.id)" class="text-indigo-600 hover:text-indigo-900">View<span class="sr-only"></span></button>
                    </td>
                  </tr>
  
                  <!-- More people... -->
                </tbody>
              </table>
              
              <p v-if="centers.centers === null" class="text-center my-2 text-red-500">No centers yet</p>
            </div>
            <!-- <p>{{ this.nyikas }}</p> -->

            <div v-if="showTabheri" class="flex flex-row justify-between items-center">
   <p class="text-md mmedium my-5" id="region">Tabheri View </p>
   <select class="border rounded-md">
      <option v-for="(nyika,index) in nyikas.nyikas" :key="index" @change="getTabheris(nyika.id)">
        {{ nyika.name }}
      </option>
    </select>
</div>
   
  
            <div v-if="showTabheri" class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Tabheri Name</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No of Members</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr   v-for="(tabheri,index) in tabheris.taberis" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{tabheri.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ tabheri.members.length }}</td>
                    <td class="relative whitespace-nowrap text-center border-b border-gray-200 py-4 pr-4 pl-3  text-sm font-medium sm:pr-6 lg:pr-8">
                      <button href="#center"  class="text-indigo-600 hover:text-indigo-900">View<span class="sr-only"></span></button>
                    </td>
                  </tr>
  
                  <!-- More people... -->
                </tbody>
              </table>
              
              <p v-if="centers.centers === null" class="text-center my-2 text-red-500">No centers yet</p>
            </div>
            <!-- <p>{{ this.tabheris }}</p> -->

    
  </div>
  
  </NuxtLayout>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
  data(){
    return{
      loading: false,
      regions: [],
      centers:[],
      greaters:[],
      nyikas:[],
      tabheris:[],
      showCenter:true,
      showGreater:false,
      showNyika:false,
      showTabheri:false,
      region:"",
      errors:{},
      errored: false
    }
  },
  methods:{
    async getRegion() {
        console.log("Fetching Regions Data....");
        this.loading = true;
       const URL= "http://3.10.190.157:7635/jerusalem";
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
          this.regions = res.data;
          // this.loadImages();
          var x= 0;
       
          //   for(x=0;x<this.properties.length;x++){
          //     this.getImages(this.properties[x].id)
          //     console.warn("Property: "+this.properties[x].id)
          //   }
          // this.imgs = this.nyika.images;
          console.warn(this.regions);
          console.log(typeof (this.regions))
          console.log("Fetching Regions Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async getCenters(id) {
        console.log("Fetching Center Data....");
        this.loading = true;
       const URL= "http://3.10.190.157:7635/regions/get{id}?id="+id;
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
          this.centers = res.data;
          // this.loadImages();
          var x= 0;
          console.log(this.centers);
          console.log(typeof (this.centers))
          console.log("Fetching Centers Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async getGreaters(id) {
        this.showGreater = true;
        console.log("Fetching Greaters Data....");
        this.loading = true;
       const URL= "http://3.10.190.157:7635/centers/get"+id;
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
          this.greaters = res.data;
          // this.loadImages();
          var x= 0;
          console.log(this.greaters);
          console.log(typeof (this.greaters))
          console.log("Fetching Greaters Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async getNyikas(id) {
        this.showNyika = true;
        console.log("Fetching Nyikas Data....");
        this.loading = true;
       const URL= "http://3.10.190.157:7635/greaters/get{id}?id="+id;
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
          this.nyikas = res.data;
          // this.loadImages();
          var x= 0;
          console.log(this.nyikas);
          console.log(typeof (this.nyikas))
          console.log("Fetching Nyikas Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async getTabheris(id) {
        this.showTabheri = true;
        console.log("Fetching Tabheris Data....");
        this.loading = true;
       const URL= "http://3.10.190.157:7635/nyikas/get/"+id;
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
          this.tabheris = res.data;
          // this.loadImages();
          var x= 0;
          console.log(this.tabheris);
          console.log(typeof (this.tabheris))
          console.log("Fetching Tabheris Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async addNew(){
       
       this.errors = {};
       if(!this.region){
           this.errors.email = "Email is required";
       }
       if (Object.keys(this.errors).length === 0) {
  // Your code for handling the login form submission
  this.loading = true;
  try{
   await axios.post('http://3.10.190.157:7635/regions/add',{
   name:this.region,
   },{
       headers: {'Content-Type': 'application/json',
       // Authorization : 'Bear' + localStorage.token,
       'Access-Control-Allow-Origin': '*'
     },
       credentials: 'include',
     }).then((response) =>{
     const data = response.data;
     console.log(data);
      console.log("New Region Added");
      this.getRegion();
   }).catch(error => {
   console.log(error)
   this.errored = true
   
 }).finally(() => this.loading = false);

}catch(err){
this.errors.network = "Error: " + err.message;
this.errors.ERR = err;
console.log("Error:",err.message)

}
 }
   },
  },
  beforeMount(){
this.getRegion()
  },
  mounted(){
      this.getCenters(1)
    
  }
  }
  </script>
  
  <style>
  
  </style>