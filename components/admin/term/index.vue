<template>
    <div>
        <div v-if="loading" class="loading-page">
        <p>Loading...</p>
      </div>
        <h1 class="text-2xl font-bold mb-4">Add New Term</h1>
        <label v-if="this.errors.ERR" class="text-md text-red-400 bg-red-200 border p-2 w-full rounded border-red-400">required</label>
        <form @submit.prevent="handleSubmit()">
        <div class="shadow-md border rounded-md p-4 w-full flex flex-row justify-between flex-wrap">
                <div class="flex flex-col w-1/2 mb-2 p-2">
                    <label>Year<sup class="text-red-400">*</sup> <label v-if="this.errors.firstname" class="text-xs text-red-400">required</label></label>
                    <input v-model="firstname" type="text" name="field" id="" class="border rounded bg-slate-50 border-gray-400">
                </div>
        </div>
        <div class="shadow-md border rounded-md p-4 my-2 w-full flex flex-row items-center justify-between flex-wrap">
            <p>Click button to add new member</p>
            <button type="submit" class="bg-green-400 text-white rounded p-2 text-md">Submit</button>
        </div>    
    </form>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    export default {
    
        data(){
            return{
              loading:false,
              firstname: '',
              lastname: '',
              email: '',
              username: '',
              skill: '',
              category: '',
              gender: '',
              mobileNumber: '',
              imageUrl: '',
              nationalId: '',
              dateOfBirth: '',
              skills: [],
              password:'1234',
              categories:[],
              errors:[],
              tabheriId: ''
            }
        },
        methods:{
            async handleSubmit(){
            //  alert("Subo")
             this.errors = {};
             if(!this.firstname){
                 this.errors.firstname = "Firstname is required";
             }
             if(!this.lastname){
                 this.errors.lastname = "Lastname is required";
             }
             if(!this.dateOfBirth){
                 this.errors.dateOfBirth = "DOB is required";
             }
             if(!this.gender){
                 this.errors.gender = "Gender is required";
             }
             if(!this.nationalId){
                 this.errors.nationalId = "National is required";
             }
             if(!this.mobileNumber){
                 this.errors.mobile = "Mobile number is required";
             }
    
             alert(this.errors)
             if (Object.keys(this.errors).length === 0) {
              console.log("Sending")
        // Your code for handling the form submission
            this.loading = true;
            //Endpoint to add member
            //Munashe add endpoint to add member. Just use fixed parameters
            const URL = 'http://13.244.64.153:7635/auth/register';
        try{
         await axios.post(URL,
         {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          username: 'user',
          skill: this.skill,
          category: this.category,
          gender: this.gender,
          password: '1234',
          mobileNumber: this.mobileNumber,
          imageUrl: "string",
          nationalId: this.nationalId,
          dateOfBirth: "1922-07-03",
          taberi: {
            id: localStorage.scopeId
          }
         },{
             headers: {
              'Content-Type': 'application/json',
              Authorization : 'Bearer ' + localStorage.token,
             'Access-Control-Allow-Origin': '*',
             'Accept' : '*/*' 
           }
           }).then((response) =>{
           const data = response.data;
           console.log(data);
          alert("New Member Added");
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
         async getSkills() {
          console.log("Fetching Skills Data....");
          this.loading = true;
         const URL= "http://13.244.64.153:7635/enums/skills";
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
            this.skills= res.data;
            // console.log(typeof (this.tabheri))
            console.log("Fetching Data Completed...");
          }).catch(error => {
            console.warn(error.code)
            alert(error);
            this.error = error.code;
            this.errored = true
    
          }).finally(() => this.loading = false);
        },
        async getCategory() {
          console.log("Fetching Category Data....");
          this.loading = true;
         const URL= "http://13.244.64.153:7635/enums/category";
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
            this.categories = res.data;
            // console.log(typeof (this.tabheri))
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
            this.getSkills();
            this.getCategory();
            this.tabheriId = localStorage.scopeId;
        }
    }
    </script>
    
    <style>
    
    </style>