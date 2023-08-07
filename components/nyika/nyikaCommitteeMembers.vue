<template>
    <div>
      <div class="modal backdrop-brightness-50 overflow-y-auto flex flex-col items-center h-full" v-if="this.addMember">
        <button @click="addNewMember()" class="text-sm w-fit text-left text-white bg-red-500 p-3 rounded-md my-3">Close</button>
      </div>
      <div class="modal backdrop-brightness-50 flex flex-col items-center h-full" v-if="this.modalUser">
        <button @click="showModalMember(0)" class="text-white bg-red-500 p-2 text-sm my-2 w-fit rounded-md text-right">Close</button> 
        <div class="bg-white text-black shadow-lg text-sm p-10 rounded-md flex flex-col items-center w-fit h-fit">
          <label class="text-center font-bold text-lg">Member Details</label>
          <br>
                      <p class="text-center">
                        Name: {{ this.currentMember.firstname }} {{ this.currentMember.lastname }}<br>
                      </p>
                      <p class="text-center">
                        Date of Birth: {{ this.currentMember.dateOfBirth }}<br>
                      </p>
                      <p class="text-center">
                        Gender: {{ this.currentMember.gender }}<br>
                      </p>
                      <p class="text-center">
                        Mobile: {{ this.currentMember.mobileNumber }}<br>
                      </p>
        </div>
                     
        </div>

      <div v-if="loading" class="loading-page">
      <p>Loading...</p>
    </div>
  
      <h1 class="text-2xl font-bold mb-4">{{tabheri.name}} Nyika Committee members</h1>
      <!-- Table -->
      <div class="bg-white border border-gray-300 pb-2 rounded-md my-4">
        <div class="flex flex-row justify-between items-center my-2 px-2">
       <downloadCSV @click="asPDF()"/>
  <input v-model="searchParam" type="text" placeholder="Search..." class="rounded-md p-2 border border-gray-400" @keyup="filterTable(tabheriMembers,searchParam)"/>
        </div>
       
      <p v-if="loading">Loading</p>
      <!-- <p>{{ members }}</p> -->
      <div v-else>
          <!-- Committee Members Table -->
            <table class="min-w-full my-4">
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
  
                <tr v-for="(member,index) in this.committeMembers" :key="index" class="border-t border-gray-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td>
  
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.firstname }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.lastname }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.gender }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.dateOfBirth }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.user.mobileNumber }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.user.email}}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.position}}</td>
  
                  <!-- <td v-if="member.position !== null" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.position }}</td> -->
                  <!-- <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td> -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Edit</td>
                </tr>
  
                <!-- More people... -->
              </tbody>
            </table>
          </div>
          </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
// import tabheriAddMember from '../tabheri/tabheriAddMember.vue'
  
  export default {
  // components: { tabheriAddMember },
    props: {
    id: {
      type: String,
      required: true,
    }
  },
    loading: true,
  data(){
    return{
      loading: false,
      tabheri: [],
      tabheriMembers:[],
      committeMembers: [],
      errors:{},
      errored: false,
      memberz:true,
      committe: false,
      modal: false,
      currentId: '',
      currentMember: '',
      positions: '',
      currentPosition:'CHAIRMAN',
      modalUser: false,
      searchParam: '',
      foundArray:[],
      addMember:false
    }
  },
  methods:{
   
    async handleSubmit(){
           this.errors = {};
           if (Object.keys(this.errors).length === 0) {
            this.modal = false;
            console.log("Sending")
      // Your code for handling the form submission
          this.loading = true;
          const URL = `http://localhost:8080/nyikas/create/committeeMembers?userId=${this.currentMember.id}&position=${this.currentPosition}&nyikaId=${this.id}`
      try{
       await axios.post(URL,
       { 
        headers: 
        {'Content-Type': 'application/json',
           Authorization : 'Bearer ' + localStorage.token,
           'Access-Control-Allow-Origin': '*',
           'Accept' : '*/*'
         },
           credentials: 'include',
         }).then((response) =>{
         const data = response.data;
         console.log(data);
        alert("New Committee Member Added");
       }).catch(error => {
       console.log(error);
       this.errored = true
       
     }).finally(() => this.loading = false);
  
  }catch(err){
  this.errors.network = "Error: " + err.message;
  this.errors.ERR = err;
  console.log("Error:",err.message)
  
  }
     }
       },
       
    showModal(member){
      this.currentMember = member;
      this.currentId = member.id;
      this.modal = !this.modal;
    },
    showModalMember(member){
      this.currentMember = member;
      this.currentId = member.id;
      this.modalUser = !this.modalUser;
    },
    showCommitte(id){
      this.currentId = id;
      this.memberz = false,
      this.committe = true
    },
    showMember(){
      this.memberz = true,
      this.committe = false
    },
    addNewMember(){
      this.addMember = !this.addMember
    },
    asPDF(){
        this.exportTableToCSV(null, 'Tabheri Members.csv');
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
    async getTabheri() {
        console.log("Fetching Tabheri Data....");
        this.loading = true;
        const URL= `http://localhost:8080/taberis/get${this.id}`;
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
          this.tabheri = res.data;
          this.tabheriMembers = res.data.members
          console.log(this.tabheri);
          console.log("Fetching Tabheri Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true;
  
        }).finally(() => this.loading = false);
      },
      async getCommittee() {
        console.log("Fetching Committee Data....");
        this.loading = true;
        const URL= `http://localhost:8080/nyikas/${this.id}/members`;
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
          var count = 0;
          res.data.forEach(info => {
            this.committeMembers.push(res.data[count]);
            count++;
          });
          // for(var i=0;i<res.data.length();i++){
          //   this.committeMembers.push(res.data[i].user);
          // }
          console.log(this.committeMembers);
          console.log("Fetching Committee Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true;
  
        }).finally(() => this.loading = false);
      },
      async getPositions() {
        console.log("Fetching Position Data....");
        this.loading = true;
        const URL= "http://localhost:8080/enums/committee-posts";
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
          this.positions = res.data;
          console.log(this.positions);
          console.log("Fetching Positions Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true;
  
        }).finally(() => this.loading = false);
      },
      async deleteMember(id){
           
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
       await axios.delete(`http://localhost:8080/members/delete/${this.id}`,{
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
        alert("User has been deleted");
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
       filterTable(arr, searchParams){
        if(searchParams != ''){
         this.foundArray = searchArray(arr,searchParams);
          this.tabheriMembers = this.foundArray;
          console.log(this.foundArray);
        }else{
          this.tabheriMembers = this.tabheri.members
        }
       },
  },
  mounted(){
    this.getTabheri();
    this.getPositions();
    this.getCommittee();
    this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
  }
  }
  </script>
  
  <style>
    .loading-page {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      text-align: center;
      padding-top: 200px;
      font-size: 30px;
      font-family: sans-serif;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 200px;
      font-size: 30px;
      font-family: sans-serif;
    }
    #parent_div {
    position: relative;
    height: 100px;
    width: 100px;
  }
  
  #background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: red;
    filter: blur(3px);
    z-index: -1;
  }
    </style>
  