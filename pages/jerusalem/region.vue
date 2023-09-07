<template>
    <NuxtLayout name="default">
      <div v-if="loading" class="loading-page">
      <p>Loading...</p>
    </div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">All Regions</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all regions</p>
        </div>
        <form @submit.prevent="addNew()" class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <input v-model="region" type="text" name="Region" id="region" placeholder="New Region Name" class="rounded-md p-2 border border-gray-400">
          <button type="submit" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add</button>
        </form>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Region</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No. of centers</th>
                    <!-- <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No. of greaters</th> -->

                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="(region,index) in regions.regions" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ region.name }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ region.centers.length }}</td>
                    <!-- <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell" v-if="region.centers[index].greaters !== undefined">{{ region.centers[index].greaters.length }}</td> -->

                    <td class="relative text-center whitespace-nowrap flex flex-row gap-x-2 justify-center border-b border-gray-200 py-4 pr-4 pl-3  text-sm font-medium sm:pr-6 lg:pr-8">
                      <NuxtLink :to="`./hierachy/${region.id}`" class="bg-blue-500 text-white p-2 rounded-md">View Centers</NuxtLink>
                      <button @click="deleteRegion(region.id)" class="bg-red-600 text-white p-2 rounded-md hover:text-indigo-900">Delete<span class="sr-only"></span></button>
                    </td>
                  </tr>
    
                  <!-- More people... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
        region:"",
        errors:{},
        errored: false
      }
    },
    methods:{
      async getRegion() {
          console.log("Fetching Regions Data....");
          this.loading = true;
         const URL= `http://3.10.190.157:7635/jerusalem/get{id}?id=${localStorage.scopeId}`;
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
            console.log(this.regions);
            console.log(typeof (this.regions))
            console.log("Fetching Regions Data Completed...");
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
     await axios.post('http://3.10.190.157:7635/regions/create',{
     name:this.region,
     },{
         headers: {'Content-Type': 'application/json',
         Authorization : 'Bearer ' + localStorage.token,
         'Access-Control-Allow-Origin': '*'
       },
         credentials: 'include',
       }).then((response) =>{
       const data = response.data;
       console.log(data);
       this.getRegion();
        alert("New Region Added");
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
     async deleteRegion(id){
           
           this.errors = {};
          //  if(!this.email){
          //      this.errors.email = "Email is required";
          //  }
          //  if(!this.password){
          //      this.errors.password = "Enter password";
          //  }
           if (Object.keys(this.errors).length === 0) {
      // Your code for handling the login form submission
      this.loading = true;
      try{
       await axios.delete(`http://3.10.190.157:7635/regions/delete?id=${id}`,{
       },{
           headers: {'Content-Type': 'application/json',
           Authorization : 'Bearer ' + localStorage.token,
           'Access-Control-Allow-Origin': '*'
         },
           credentials: 'include',
         }).then((response) =>{
         const data = response.data;
         console.log(data);
         this.getRegion();
        alert("Region has been deleted");
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
    mounted(){
      this.getRegion()
    }
    }
    </script>
    
    <style>
    
    </style>