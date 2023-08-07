<template>
  <NuxtLayout name="default">
      <h1 class="text-2xl font-bold mb-4">Add New Tabheri</h1>
      <label v-if="this.errors.ERR" class="text-md text-red-400 bg-red-200 border p-2 w-full rounded border-red-400">{{ this.errors }}</label>
      <form @submit.prevent="handleSubmit()">
      <div class="shadow-md border rounded-md p-4 w-full flex flex-row justify-between flex-wrap">
              <div class="flex flex-col w-1/2 mb-2 p-2">
                  <label>Name of Tabheri<sup class="text-red-400">*</sup> <label v-if="this.errors.name" class="text-xs text-red-400">required</label></label>
                  <input v-model="name" type="text" name="field" id="" class="border rounded bg-slate-50 border-gray-400">
              </div>
      </div>
      <div class="shadow-md border rounded-md p-4 my-2 w-full flex flex-row items-center justify-between flex-wrap">
          <p>Click button to add new tabheri</p>
          <button type="submit" class="bg-green-400 text-white rounded p-2 text-md">Submit</button>
      </div>    
      </form>
      <div class="bg-green-200 border border-green-400 p-4 rounded-md text-green-400">
        <p>Status</p>
        <p>{{ this.tabheri.id }}</p>
        <p>{{ this.tabheri.name }}</p>
      </div>
  </NuxtLayout>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
  
      data(){
          return{
            name:'',
            nyikaId:1,
            tabheri:[],
        errors:[]
          }
      },
      methods:{
          async handleSubmit(){
          //  alert("Subo")
           this.errors = {};
           if(!this.name){
               this.errors.name = "Tabheri Name is required";
           }
          
           if (Object.keys(this.errors).length === 0) {
      // Your code for handling the form submission
          this.loading = true;
          //Endpoint to add member
          const URL = 'http://localhost:8080/taberis/add?nyikaId='+ this.nyikaId;
      try{
       await axios.post(URL,
       {
       name:this.nyikaId,
       },{
           headers: {'Content-Type': 'application/json',
           // Authorization : 'Bear' + localStorage.token,
           'Access-Control-Allow-Origin': '*'
         },
           credentials: 'include',
         }).then((response) =>{
         const data = response.data;
          this.tabheri = response;
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
      }
  }
  </script>
  
  <style>
  
  </style>