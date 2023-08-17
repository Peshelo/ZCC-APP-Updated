<template>
    <NuxtLayout name="default">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">All Church Tabheri</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the church tabheri</p>
        </div>
        <form @submit.prevent="addNew()" class="sm:mt-0 sm:ml-16 sm:flex-none flex flex-row items-center gap-2">
          <div class="sm:col-span-3">
        </div>
          <input disabled v-model="tabheri" type="text" name="Region" class="h-fit border border-gray-400 rounded-md" id="region" placeholder="New nyika name...">
          <button disabled type="submit" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add</button>
        </form>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="">
          <div class="inline-block min-w-full py-2 align-middle">
            <button class="flex flex-row items-center p-2 rounded-md border border-blue-400 text-blue-500" @click="asPDF()"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-download" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
   <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
   <path d="M12 17v-6"></path>
   <path d="M9.5 14.5l2.5 2.5l2.5 -2.5"></path>
</svg> Download CSV</button>
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Tabheri</th>
                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No. of Members</th>
                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="(taberi,index) in taberis" :key="index">
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{taberi.name}}</td>
                    <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{taberi.members.length}}</td>
                    <td class="relative whitespace-nowrap border-b border-gray-200 py-4 pr-4 pl-3 text-center text-sm font-medium sm:pr-6 lg:pr-8">
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
  export default {
  data(){
    return{
      loading: false,
      taberis: [],
      taberi:"",
      nyikaId:"",
      errors:{},
      errored: false
    }
  },
  methods:{
    asPDF(){
      this.exportTableToCSV(null, 'Tabheri Records.csv');
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
    async getTaberis() {
        console.log("Fetching Tabhera Data....");
        this.loading = true;
       const URL= "http://localhost:8080/taberis";
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
          this.taberis = res.data;
          // this.loadImages();
          var x= 0;
       
          //   for(x=0;x<this.properties.length;x++){
          //     this.getImages(this.properties[x].id)
          //     console.warn("Property: "+this.properties[x].id)
          //   }
          // this.imgs = this.nyika.images;
          console.log(this.taberis);
          console.log(typeof (this.taberis))
          console.log("Fetching taberis Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async addNew(){
         
         this.errors = {};
         if(!this.taberi){
             this.errors.taberi = "Email is required";
         }
         if(!this.nyikaId){
             this.errors.nyikaId = "Email is required";
         }
         if (Object.keys(this.errors).length === 0) {
    // Your code for handling the login form submission
    this.loading = true;
    try{
     await axios.post('http://localhost:8080/taberis/add?nyikaId='+ this.nyikaId,
     {
     name:this.taberi,
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
  },
  mounted(){
    this.getTaberis()
  }
  }
  </script>
  
  <style>
  
  </style>