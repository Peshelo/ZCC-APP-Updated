<template>
    <NuxtLayout name="default">
      <div v-if="loading" class="loading-page">
    <p>Loading...</p>
  </div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">{{this.nyikas.name}} Greater</h1>
          <label class="text-gray-600">Showing Nyika List</label>
        </div>
        <form @submit.prevent="addNew()" class="sm:mt-0 sm:ml-16 sm:flex-none flex flex-row items-center gap-2">
          <input v-model="nyika" type="text" name="Region" class="h-fit p-2 rounded-md border border-gray-400" id="region" placeholder="New nyika Name">
          <select v-model="this.financialGroup" class="h-fit p-3 rounded-md border border-gray-400 bg-white text-black">
            <option selected disabled>Financial Group</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>Ruzevha</option>
          </select>
          <button type="submit" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add</button>
        </form>
      </div>
      <div class="mt-4 flex flex-col">
        <div class="">
          <div class="inline-block min-w-full py-2 align-middle">
            
            <div class="grid grid-cols-6 bg-white border border-gray-300 rounded-md p-5 gap-4 max-md:grid-cols-1 my-10">
              <NuxtLink :to="'./'+nyika.id" v-for="(nyika,index) in nyikas.nyikas" :key="index" class="flex flex-col text-center shadow-2xl border-blue-500 border-b-2 hover:bg-white hover:text-blue-500 group duration-150 justify-between items-center bg-blue-500  text-white w-full rounded-md borde p-4 hover:shadow">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-folder-filled" width="60" height="60" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M9 3a1 1 0 0 1 .608 .206l.1 .087l2.706 2.707h6.586a3 3 0 0 1 2.995 2.824l.005 .176v8a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-11a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" stroke-width="0" fill="currentColor"></path>
  </svg>
  <p class="text-white text-sm group-hover:text-blue-500">{{ nyika.name }}<br><label class="text-xs text-right text-gray-100 group-hover:text-black">{{ nyika.taberis.length }} tabheris</label></p>
      </NuxtLink>
  </div>
<p class="text-md mmedium my-5 font-bold">Nyika List Table</p>
            <div class=" bg-white border border-gray-300  rounded-md py-1 ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Nyika</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No of Tabheries</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="(nyika,index) in nyikas.nyikas" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{nyika.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{ nyika.taberis.length }}</td>
                    <td class="relative flex flex-row justify-center whitespace-nowrap border-b border-gray-200 py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <button @click="deleteNyika(nyika.id)" class="bg-red-500 text-white p-2 py-1 mr-2 rounded">Delete</button> 

                      <NuxtLink :to="'./'+nyika.id" class="text-indigo-600 hover:text-indigo-900 bg-blue-600 text-white p-2 py-2 rounded">View</NuxtLink>
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
        nyikas: [],
        financialGroup:'',
        nyika:"",
        greaterId:1,
        errors:{},
        errored: false
      }
    },
    methods:{
      asPDF(){
      this.exportTableToCSV(null, 'Nyika List.csv');
    },
    exportTableToCSV(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for(var i = 0; i < rows.length; i++){
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for(var j = 0; j < cols.length; j++){
            row.push(cols[j].innerText);
        }
        csv.push(row.join(","));
    }

    // download csv file
    this.downloadCSV(csv.join("\n"), filename);
},
 downloadCSV(csv, filename) {
   	    var csvFile;
	var downloadLink;

	csvFile = new Blob([csv], {type:"text/csv"});
	downloadLink = document.createElement("a");
	downloadLink.download = filename;
	downloadLink.href = window.URL.createObjectURL(csvFile);
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();
},
async deleteNyika(id){
           
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
       await axios.delete(`http://localhost:8080/nyikas/delete?id=${this.id}`,{
       },{
           headers: {'Content-Type': 'application/json',
           Authorization : 'Bearer ' + localStorage.token,
           'Access-Control-Allow-Origin': '*'
         },
           credentials: 'include',
         }).then((response) =>{
         const data = response.data;
         console.log(data);
         this.getTabheri();
        alert("Nyika has been deleted");
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
      async getNyika() {
          console.log("Fetching Nyika Data....");
          this.loading = true;
         const URL= `http://localhost:8080/greaters/get{id}?id=${localStorage.scopeId}`;
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
             this.errors.greaterId = "GreaterId is required";
         }
         if(!this.nyika){
             this.errors.nyika = "Nyika name is required";
         }
         if(!this.financialGroup){
            this.errors.financialGroup = "Select financial group";
         }
         if (Object.keys(this.errors).length === 0) {
    // Your code for handling the login form submission
    this.loading = true;
    const scope = localStorage.getItem('scopeId')
    try{
     await axios.post(`http://localhost:8080/nyikas/create?greaterId=${scope}`,
     {
     name:this.nyika,
     financialGroup: this.financialGroup
     },{
         headers: {'Content-Type': 'application/json',
         Authorization : 'Bearer ' + localStorage.token,
         'Access-Control-Allow-Origin': '*'
       },
         credentials: 'include',
       }).then((response) =>{
       const data = response.data;
       console.log(data);
       this.nyika = "";
       this.getNyika();
        alert("New Nyika Added");
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
      this.getNyika()
    }
    }
    </script>
    
    <style>
    
    </style>