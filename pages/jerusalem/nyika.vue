<template>
    <NuxtLayout name="default">
    
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">All Tabheris</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the church tabheris</p>
        </div>
        <form @submit.prevent="addNew()" class="sm:mt-0 sm:ml-16 sm:flex-none flex flex-row items-center gap-2">
          <div class="sm:col-span-3">
        </div>
          <input disabled v-model="nyika" type="text" name="Region" class="h-fit border p-2 border-gray-400 rounded-md" id="region" placeholder="New nyika Name">
          <button disabled type="submit" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add</button>
        </form>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="">
          <div class="inline-block min-w-full py-2 align-middle">
            <div  class="grid grid-cols-4 gap-4 my-10">
    <div v-for="(nyika,index) in nyikas" :key="index" class="bg-cyan-600 p-5 w-full shadow-xl rounded-md hover:-mt-2 duration-300">
        <p class="text-white text-lg bbold mb-3">{{ nyika.name }} Nyika</p>
        <p class="text-xs text-gray-200">No. of tabheri ({{ nyika.taberis.length }})</p>
    </div>
    <div class="border-green-500 border-2 border-dashed flex flex-row justify-center items-center p-5 w-full shadow-xl rounded-md duration-300">
        <p class="text-4xl bbold text-green-500">+</p>
    </div>
  </div>
<p class="text-md mmedium my-5">Tabular View</p>
          <div class="flex flex-row justify-between items-region my-2 px-2">
            <downloadCSV @click="asPDF()"/>
            <div class="flex flex-row justify-center items-center gap-x-2">
              <input v-model="searchParam" type="text" placeholder="Search" class="rounded-md border p-2 border-gray-400" @keyup="filterTable(tempNyikas,searchParam)"/>
            </div>
        </div>
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Nyika</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No of Tabheris</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="(nyika,index) in nyikas" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{nyika.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ nyika.taberis.length }}</td>
                    <td class="relative whitespace-nowrap border-b border-gray-200 py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">View<span class="sr-only"></span></a>
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
    import downloadCSV from '@/components/shared/downloadCSV.vue';
    export default {
    data(){
      return{
        loading: false,
        nyikas: [],
        nyika:"",
        greaterId:"",
        errors:{},
        errored: false,
        searchParam: '',
        tempNyikas: ''
      }
    },
    methods:{
      async getNyika() {
          console.log("Fetching Nyika Data....");
          this.loading = true;
         const URL= "http://3.10.190.157:7635/nyikas";
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
            this.tempNyikas = this.nyikas
            // this.loadImages();
            var x= 0;
         
            //   for(x=0;x<this.properties.length;x++){
            //     this.getImages(this.properties[x].id)
            //     console.warn("Property: "+this.properties[x].id)
            //   }
            // this.imgs = this.nyika.images;
            console.log(this.nyikas);
            console.log(typeof (this.nyikas))
            console.log("Fetching  nyika Data Completed...");
          }).catch(error => {
            console.warn(error.code)
            this.error = error.code;
            this.errored = true
    
          }).finally(() => this.loading = false);
        },
        async addNew(){
         
         this.errors = {};
         if(!this.greaterId){
             this.errors.greaterId = "Email is required";
         }
         if(!this.nyika){
             this.errors.nyika = "Email is required";
         }
         if (Object.keys(this.errors).length === 0) {
    // Your code for handling the login form submission
    this.loading = true;
    try{
     await axios.post('http://3.10.190.157:7635/nyikas/add?greaterId='+ this.greaterId,
     {
     name:this.nyika,
     },{
         headers: {'Content-Type': 'application/json',
         // Authorization : 'Bear' + localStorage.token,
         'Access-Control-Allow-Origin': '*'
       },
         credentials: 'include',
       }).then((response) =>{
       const data = response.data;
       console.log(data);
        alert("New Region Added");
        this.getTaberis();
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
     filterTable(data, searchParam){
        let result = [];
        if(searchParam != ""){
          this.tempNyikas.forEach(item => {
              let currentItem = JSON.stringify(Object.values(item));

              currentItem = currentItem.toLowerCase();
              searchParam = searchParam.toLowerCase();

              if(searchParam != "," || "{" || "}"){
                  if(currentItem.includes(searchParam)){
                              result.push(item);
                  }
              }
          
          });

          this.nyikas = result;
        }else{
        this.nyikas= this.tempNyikas

        }
       
        // let temp = data;
        
       },
    },
    mounted(){
      this.getNyika()
    }
    }
    </script>
    
    <style>
    
    </style>