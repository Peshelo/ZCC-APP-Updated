<template>
    <NuxtLayout name="default">
      <div class="bg-white border border-gray-300 rounded-md p-4">

      <div v-if="loading" class="loading-page">
      <p>Loading...</p>
    </div>
    
        <h1 class="text-2xl font-bold mb-4">Add New Collection</h1>
        <label v-if="this.errors.ERR" class="text-md text-red-400 bg-red-200 border p-2 w-full rounded border-red-400">required</label>
        <form @submit.prevent="handleSubmit()">
        <div class=" border-t-2 pt-3 w-full flex flex-row justify-between flex-wrap">
                <div class="flex flex-col w-1/2 mb-10 p-2">
                    <label>Purpose<sup v-if="this.errors.purposes" class="text-xs text-red-400">*required</sup></label>
                    <select v-model="purpose"  class="border rounded p-2 bg-slate-50 border-gray-400">
                        <option selected disabled>Select Purpose...</option>
                        <option v-for="(item,index) in this.purposes" :key="index" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="flex flex-col w-1/2 mb-10 p-2">
                    <label>Date<sup v-if="this.errors.date" class="text-xs text-red-400">*required</sup></label>
                    <input v-model="date" type="date" name="field" id="" class="border rounded p-2 bg-slate-50 border-gray-400">
                </div>
                <div class="flex flex-col w-1/2 mb-10 p-2">
                    <label>Amount<label v-if="this.errors.prop1" class="text-xs text-red-400">required</label></label>
                    <input v-model="prop1" placeholder="USD" type="text" name="field" id="" class="border rounded p-2 bg-slate-50 border-gray-400">
                </div>
                <div class="flex flex-col w-1/2 mb-10 p-2">
                    <label>Amount<label v-if="this.errors.prop2" class="text-xs text-red-400">required</label></label>
                    <input v-model="prop2" type="text" placeholder="RANDS" name="field" id="" class="border rounded p-2 bg-slate-50 border-gray-400">
                </div>
                <div class="flex flex-col w-1/2 mb-10 p-2">
                    <label>Amount<label v-if="this.errors.prop3" class="text-xs text-red-400">required</label></label>
                    <input v-model="prop3" type="text" placeholder="ZWL" name="field" id="" class="border rounded p-2 bg-slate-50 border-gray-400">
                </div>
                <div class="flex flex-col w-1/2 mb-10 p-2">
                  </div>
                <div class="flex flex-col w-1/2 mb-10 p-2">
                  <label class="font-light text-sm text-red-500" v-if="this.errors.prop">* {{ this.errors.prop }}<label v-if="this.errors.currency" class="text-xs text-red-400">required</label></label>
                </div>

                <div class="border border-gray-300 rounded p-2 md:p-4 my-2 w-full flex flex-row items-center justify-between flex-wrap">
            <p>Click button to add collection</p>
            <button type="submit" class="bg-green-400 text-white rounded p-2 text-md">Submit</button>
        </div>  
        </div>
        
    </form>
    
  </div>
    <!-- <button @click="test()">Test</button> -->
    <p v-if="loading" class="bg-white border-2 shadow-md animate-bounce border-orange-500 text-orange-500 p-3 rounded-md fixed bottom-1 right-2">Adding new Collection {{ this.result }}</p>
    </NuxtLayout>
    </template>
    
    <script>
    import axios from 'axios'
    export default {
    
        data(){
            return{
              loading: false,
          tabheri: 1,
          purposes: '',
          date:'',
          purpose:'',
          prop1: '',
          prop2: '',
          prop3: '',
          result: '',
          errors:[]
            }
        },
      
        methods:{
          // write a nuxt js function?
          test(){
            const button = document.createElement('button');
        button.innerHTML = 'Click Me';
        this.$refs.container.appendChild(button);
          },
            async handleSubmit(){
              const scope = localStorage.getItem('scopeId')
            //  alert("Subo")
             this.errors = {};
             if(!this.purpose){
                 this.errors.purposes = "Purpose is required";
             }
             if(!this.date){
                 this.errors.date = "Date is required";
             }
             if(!this.prop1 && !this.prop2 && !this.prop3){
                 this.errors.prop = "Enter atleast one amount";
             }

             if (Object.keys(this.errors).length === 0) {
              this.$nextTick(() => {
        this.$nuxt.$loading.start()
        
          })
        // Your code for handling the form submission
            this.loading = true;
            //Endpoint to add member
            const URL = 'http://localhost:8080/financials/collections/create-record';
        try{
         await axios.post(URL,
         {
    taberi: {
      id: scope
    },
    purpose: {
      id: this.purpose
    },
    receivedAmounts: {
      "USD": this.prop1,
      "ZAR": this.prop2,
      "ZWL": this.prop3
    }
    // localDate: this.date
         },{
             headers: {'Content-Type': 'application/json',
             Authorization : 'Bearer ' + localStorage.token,
             'Access-Control-Allow-Origin': '*'
           },
             credentials: 'include',
           }).then((response) =>{
           const data = response.data;
           console.log(data);
           this.result = data;
            alert("New Collection Added");
         }).catch(error => {
         console.log(error)
         this.errored = true
         
       }).finally(() =>{setTimeout(() => this.$nuxt.$loading.finish(), 500),this.loading = false} );
    
    }catch(err){
    this.errors.network = "Error: " + err.message;
    this.errors.ERR = err;
    console.log("Error:",err.message)
    
    }
       }
         },
         async getPurpose() {
        console.log("Fetching Purpose Data....");
        this.loading = true;
       const URL= "http://localhost:8080/purpose/all";
        await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.token,
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((res) => {
          this.purposes = res.data;
          console.log(typeof (this.tabheri))
          console.log("Fetching Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
        },
        mounted(){
          this.getPurpose();
        }
    }
    </script>
    
    <style>
    
    </style>