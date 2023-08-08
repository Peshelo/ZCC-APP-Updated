<template>
  <div>
    <!-- MOdal -->
    <div class="modal z-10 backdrop-brightness-50 pt-[50px] flex flex-col items-center h-full" v-if="this.modal">
      <button @click="showModal()" class="text-white w-fit bg-red-500 p-2 my-2 text-sm rounded-md">Close</button> 

    <div class="bg-white border-2 text-black text-sm p-10 rounded-md flex flex-col items-center shadow-md w-fit h-fit">
      <label class="text-center font-bold text-lg">Add new tabheri</label>
      <br>
                  <!-- <p class="text-center">
                    Nyika Name: {{ this.taberis.name }}<br>
                  </p> -->
                  <form @submit.prevent="handleSubmit()" class="committee flex flex-col w-full items-center justify-center my-2">
                            <input v-model="name" class="p-2 border text-black rounded bg-slate-50 border-gray-400" placeholder="Tabheri name">
                            <label v-if="this.errors.name" class="text-sm my-1 text-red-500">{{ this.errors.name }}</label>
                            <button type="submit" class="bg-green-500 mt-2 text-white font-semibold p-3 rounded-md w-full">Submit</button>
                  </form>
    </div>
                 
    </div>
  <div class="px-4 sm:px-6 lg:px-4">
    <div class="my-4">
      <h1 class="text-2xl font-semibold text-gray-900">{{ taberis.name }} Tabheris</h1>
      <p class="text-md font-semibold text-gray-900">Financial Group: {{ taberis.financialGroup }}</p>
    </div>
      <div class="flex flex-row justify-between items-center">
    <div class="p-2 w-fit rounded-md border border-green-500">
      <button @click="showTabheri()" class="w-fit bg-white p-2 px-4 shadow-md rounded-md border">
        Tabheri
      </button>
      <button @click="showCommitte()" class="w-fit p-2 px-4 rounded-md text-gray-400 bg-gray-100">
        Nyika Committee
      </button>
    </div>
    <button @click="showModal()" class="w-fit p-2 px-4 rounded-md text-white bg-green-400">
        Add New
      </button>
  </div>
     
    <div class="mt-8 flex flex-col">
      <div class="">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-md bg-white rounded-md ring-1 ring-black ring-opacity-5">
            <div class="flex flex-row justify-between items-center my-2 p-4">
     <downloadCSV @click="asPDF()"/>
<input type="text" placeholder="Search" class="rounded-md p-2 border border-gray-400"/>
      </div>
            <table  v-if="this.tab == true" class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="sticky top-0 z-1 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">No.</th>
                  <th scope="col" class="sticky top-0 z-1 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Tabheri</th>
                  <th scope="col" class="sticky top-0 z-1 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">No. of Members</th>
                  <th scope="col" class="sticky top-0 z-1 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(taberi,index) in taberis.taberis" :key="index">
                  <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ index + 1 }}</td>
                  <td class="whitespace-nowrap border-b border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{taberi.name}}</td>
                  <td class="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{{taberi.members.length}}</td>
                  <td class="relative whitespace-nowrap border-b flex flex-row gap-x-2 justify-center border-gray-200 py-4 pr-4 pl-3 text-center text-sm font-medium sm:pr-6 lg:pr-8">
                      <NuxtLink :to="'./'+taberi.id" class="bg-blue-500 text-white p-2 rounded">View</NuxtLink>
                      <NuxtLink :to="'./tabheri/'+taberi.id" class="bg-yellow-500 text-white p-2 rounded">View</NuxtLink>
                      <button @click="deleteTabheri(taberi.id)" class="bg-red-500 text-white p-1 px-2 rounded">Delete</button> 
                  </td>
                </tr>
  
                <!-- More people... -->
              </tbody>
            </table>
            <table v-if="this.committe == true"  class="min-w-full my-4">
          <thead class="bg-white">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Firstame</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Lastname</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Gender</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">DOB</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th>

              <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th> -->
              <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Taberi</th> -->
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>

            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="border-t border-gray-200">
              <th colspan="7" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">Committee Members</th>
            </tr>

            <tr v-for="(member,index) in this.taberis.committeMembers" :key="index" class="border-t border-gray-300">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.firstname }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.lastname }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.gender }}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.dateOfBirth }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.mobileNumber }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.email}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{this.committeMembers[index].position}}</td>              
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><button @click="showDetails(member)" class="bg-blue-500 text-white p-2 rounded-md" >View</button> </td>
            </tr>
            <!-- More people... -->
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
  </template>

  
<script>
import axios from 'axios'
import downloadCSV from '../shared/downloadCSV.vue'
export default {
components: { downloadCSV },
  props:{
      id:{
          type: String,
          required: true
      }
  },
data(){
  return{
    loading: false,
    taberis: [],
    taberi:"",
    currentTabheri: [],
    name:"",
    nyikaId:"",
    errors:{},
    errored: false,
    searchText:'',
    modal: false,
    errors:[],
    committe: false,
    tab: true,
    details: false
  }
},
methods:{

  showCommitte(){

  this.tab = false,
  this.committe = true
},
showTabheri(){
this.tab = true,
this.committe = false
},
  async handleSubmit(){
        //  alert("Subo")
        
         this.errors = {};
         if(!this.name){
             this.errors.name = "Tabheri Name is required";
         }
         if (Object.keys(this.errors).length === 0) {
          this.modal =false,
    // Your code for handling the form submission
        this.loading = true;
        //Endpoint to add member
        const URL = 'http://localhost:8080/taberis/create?nyikaId='+ this.id;
    try{
     await axios.post(URL,
     {
     name:this.name
     },{
         headers: {'Content-Type': 'application/json',
         Authorization : 'Bearer ' + localStorage.token,
         'Access-Control-Allow-Origin': '*'
       },
         credentials: 'include',
       }).then((response) =>{
       const data = response.data;
        this.tabheri = response;
        this.getTaberis();
       console.log(data);
        alert("New Tabheri Added");
     }).catch(error => {
     console.log(error)
     this.errored = true
     alert(error)
     
   }).finally(() => this.loading = false);

}catch(err){
this.errors.network = "Error: " + err.message;
this.errors.ERR = err;
console.log("Error:",err.message)

}
   }
     },
  showModal(){
      this.modal = !this.modal;
  },
  asPDF(){
    this.exportTableToCSV(null, `Nyika ${ this.id } Tabheri Records.csv`);
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

  push(id){
    this.$router.push("./" + id);
  },
  search(){
      let x = 0;
      for(x=0;x<=this.taberis.length();x++){
          if(this.taberis[x].contains(this.searchText)){
              console.log(this.taberis[x]);
          }
      }
  },
  async getTaberis() {
      console.log("Fetching Tabhera Data....");
      this.loading = true;
     const URL= "http://localhost:8080/nyikas/get/"+this.id;
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
        console.table(res.data)
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
       if (Object.keys(this.errors).length() === 0) {
  // Your code for handling the login form submission
  this.loading = true;
  try{
   await axios.post('http://localhost:8080/taberis/add?nyikaId='+ this.nyikaId,
   {
   name:this.taberi,
   },{
       headers: {'Content-Type': 'application/json',
       Authorization : 'Bearer ' + localStorage.token,
       'Access-Control-Allow-Origin': '*',
     },
       credentials: 'include',
     }).then((response) =>{
     const data = response.data;
     console.log(data);
      alert("New Region Added");
      this.getTaberis();
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
   async deleteTabheri(id){
         
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
     await axios.delete(`http://localhost:8080/taberis/delete?id=${id}`,{
     },{
         headers: {'Content-Type': 'application/json',
         Authorization : 'Bearer ' + localStorage.token,
         'Access-Control-Allow-Origin': '*'
       },
         credentials: 'include',
       }).then((response) =>{
       const data = response.data;
       console.log(data);
       this.getTaberis();
      alert("Tabheri has been deleted");
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
tr:hover{
  background-color: rgb(248, 246, 246);
}
</style>