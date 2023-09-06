<template>
    <div>
      <!-- <div class="modal backdrop-brightness-50 overflow-y-auto flex flex-col justify-center items-region h-full" v-if="this.addMember">
        <button @click="addNewMember()" class="text-sm w-fit text-left text-white bg-red-500 p-3 rounded-md my-3">Close</button>
        <tabheriAddMember :id="this.id"/> 
      </div> -->
      <div class="modal backdrop-brightness-50 flex flex-col items-region h-full" v-if="this.modalUser">
        <button @click="showModalMember(0)" class="text-white bg-red-500 p-2 text-sm my-2 w-fit rounded-md text-right">Close</button> 
        <div class="bg-white text-black shadow-lg text-sm p-10 rounded-md flex flex-col items-region w-fit h-fit">
          <label class="text-center font-bold text-lg">Make Nyika Admin</label>
          <br>
                      <p class="text-center">
                        Id: {{ this.currentMember.id }}<br>

                        Name: {{ this.currentMember.firstname }} {{ this.currentMember.lastname }}<br>
                      </p>
                      <br>
                      <p class="text-center font-bold text-green-500">
                       Select Nyika
                      </p>
                      <p v-if="this.errors.currentNyika" class="text-center text-red-500">
                        *Nyika is required<br>
                      </p>
                      <select v-model="currentNyika" class="border p-2 w-full text-black rounded bg-slate-50 border-gray-400">
                                    <option selected disabled>Select Role...</option>
                                    <option v-for="(nyika,index) in this.greater.nyikas" :key="index" :value="nyika.id">{{ nyika.name }}</option>
                      </select>
                      <button @click="this.makeAdmin(this.currentMember.id)" class="bg-green-500 mt-2 text-white font-semibold p-3 rounded-md w-full">Submit</button>
        </div>

        </div>
      <div class="modal backdrop-brightness-50 flex flex-col items-region h-full" v-if="this.modal">
        <button @click="showModal(0)" class="text-white bg-red-500 p-2 my-2 w-fit rounded-md text-right text-sm">Close</button> 
        <div class="bg-white border-2 text-black text-sm p-10 rounded-md flex flex-col items-region shadow-md w-fit h-fit">
          <label class="text-center font-bold text-lg">Make Committe Member</label>
          <br>
                      <p class="text-center">
                        Name: {{ this.currentMember.firstname }} {{ this.currentMember.lastname }}<br>
                      </p>
                      <form @submit.prevent="handleSubmit()" class="committee flex flex-col w-full items-region justify-center my-2">
                                <!-- <label>Committee Role</label> -->
                                <select v-model="currentPosition" class="border p-2 text-black rounded bg-slate-50 border-gray-400">
                                    <option selected disabled>Select Role...</option>
                                    <option v-for="(position,index) in this.positions" :key="index" :value="position">{{ position }}</option>
                                </select>
                                <button class="bg-green-500 mt-2 text-white font-semibold p-3 rounded-md w-full">Submit</button>
                      </form>
        </div>
                     
        </div>
      <div v-if="loading" class="loading-page">
      <p>Loading...</p>
    </div>
        <div class="flex flex-row justify-between items-center">
        <div class="p-2 w-fit rounded-md border border-green-500">
          <button @click="showMember()" class="w-fit bg-white p-2 px-4 shadow-md rounded-md border">
            Members
          </button>
          <button @click="showCommitte()" class="w-fit p-2 px-4 rounded-md text-gray-400 bg-gray-100">
            Committee
          </button>
        </div>
        <!-- <button @click="addNewMember()" class="w-fit p-2 px-4 rounded-md text-white bg-green-400 hover:bg-green-500 hover:shadow-md duration-150 ">
            Add New
        </button> -->
      </div>
  
      <!-- Table -->
      <div class="bg-white border border-gray-300 rounded-md my-4">
          <div class="flex flex-row justify-between items-region my-2 px-2">
            <downloadCSV @click="asPDF()"/>
            <div class="flex flex-row justify-center items-center gap-x-2">
              <label>Filter by</label>
              <select v-model="searchGender" type="text" class="rounded-md border p-2 border-gray-400 bg-white" @change="filterTable(members,searchGender)">
                <option selected disabled value="">Gender</option>
                <option value="">All</option>
                <option value="MALE">Male</option>  
                <option value="FEMALE">Female</option>
              </select>
              <input v-model="searchParam" type="text" placeholder="Search" class="rounded-md border p-2 border-gray-400" @keyup="filterTable(members,searchParam)"/>
            </div>
        </div>
      <p v-if="loading">Loading</p>
      <!-- <p>{{ members }}</p> -->
      <div v-else>
      <table v-if="this.memberz == true" class="min-w-full">
              <thead class="bg-white">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Firstame</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Lastname</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Gender</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">DOB</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Skill</th>
                  <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tabheri</th> -->
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr class="border-t border-gray-200">
                  <th v-if="members == null ||  members.length < 1" colspan="8" scope="colgroup" class="bg-gray-50 px-4 py-2 text-center h-32 text-sm font-semibold text-gray-900 sm:px-6">No items found!</th>
                  <th v-else colspan="7" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">All Members</th>
                </tr>
                <tr v-for="(member,index) in members" :key="index" class="border-t border-gray-300 hover:bg-gray-100 duration-150">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index+1 }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.firstname }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.lastname }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.gender }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.dateOfBirth }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.mobileNumber }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.email}}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.category}}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.skill}}</td>
                  <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.taberi.name}}</td> -->

                  <!-- <td v-if="member.position !== null" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.position }}</td> -->
                  <!-- <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td> -->
                  <td class="whitespace-nowrap flex flex-row gap-2 px-3 py-4 text-xs text-gray-500">
                    <button @click="deleteMember(member.id)" class="bg-red-500 text-white p-2 rounded">Delete</button> 
                    <button @click="showModalMember(member)" class="bg-blue-500 text-white p-2 rounded" >Make Admin</button> 
                    <button @click="showModal(member)" class="bg-green-500 text-white p-2 rounded">Make Committe</button>
                  </td>
                </tr>
                <!-- More people... -->
              </tbody>
            </table>
          <!-- Committee Members Table -->
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
  
                <tr v-for="(member,index) in this.committeMembers" :key="index" class="border-t border-gray-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td>
  
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.firstname }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.lastname }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.gender }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.user.dateOfBirth }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.user.mobileNumber }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.user.email}}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{this.committeMembers[index].position}}</td>
  
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
  import downloadCSV from '@/components/shared/downloadCSV.vue';
  // import {searchArray} from '@/plugins/search'
// import tabheriAddMember from './tabheriAddMember.vue'
  
  export default {
  // components: { tabheriAddMember },
  components:{downloadCSV},
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
      members: [],
      greater:[],
      currentNyika:[],
      committeMembers: [],
      errors:{},
      region:[],
      errored: false,
      memberz:true,
      committe: false,
      modal: false,
      currentId: '',
      currentMember: '',
      positions: '',
      currentPosition:'',
      modalUser: false,
      searchParam: '',
      foundArray:[],
      addMember:false,
      tempMembers: '',
      searchGender:'ALL'
    }
  },
  methods:{
    async getNyikas() {
        console.log("Fetching Greater Data....");
        this.loading = true;
        const URL= `http://13.244.64.153:7635/greaters/get{id}?id=${this.id}`;

        await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.token,
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((res) => {
        
          this.greater = res.data;
          // this.tabheriMembers = res.data.members
          console.table(this.greater);
          console.log("Fetching Center Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true;
  
        }).finally(() => this.loading = false);
      },
    async handleSubmit(){
           this.errors = {};
           if (Object.keys(this.errors).length === 0) {
            this.modal = false;
            console.log("Sending...")
      // Your code for handling the form submission
          this.loading = true;
          //Endpoint to add member
          //Munashe add endpoint to add member. Just use fixed parameters
          const URL = `http://13.244.64.153:7635/greater/create/committeeMembers?userId=${this.currentMember.id}&position=${this.currentPosition}&greaterId=${this.id}`;
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
 async makeAdmin(memberId){
           this.errors = {};
           if(!this.currentNyika){
              this.errors.currentNyika ="Nyika is required"
           }
           if (Object.keys(this.errors).length === 0) {
            this.modal = false;
            console.log("Sending...")
      // Your code for handling the form submission
          this.loading = true;
          const scope = localStorage.getItem('scopeId');
          const URL = `http://13.244.64.153:7635/admin/create?UserId=${memberId}&scopeId=${this.currentNyika}&scope=NYIKA`;
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
        alert("New Admin Member Added");
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
        this.exportTableToCSV(null, 'region Members.csv');
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
    async getMembers() {
        console.log("Fetching Members Data....");
        this.loading = true;
        const URL= `http://13.244.64.153:7635/members`;
        
        await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.token,
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((res) => {
          this.members = res.data;
          this.tempMembers = this.members;
          console.log(this.members);
          console.log("Fetching Members Data Completed...");
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
        const URL= `http://13.244.64.153:7635/greaters/${this.id}/members`;
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
        const URL= "http://13.244.64.153:7635/enums/committee-posts";
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
       await axios.delete(`http://13.244.64.153:7635/members/delete/${this.id}`,{
       },{
           headers: {'Content-Type': 'application/json',
           Authorization : 'Bearer ' + localStorage.token,
           'Access-Control-Allow-Origin': '*'
         },
           credentials: 'include',
         }).then((response) =>{
         const data = response.data;
         console.log(data);
         this.getNyikas();
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

       filterTable(data, searchParam){
        let result = [];
        if(searchParam != ""){
          this.tempMembers.forEach(item => {
              let currentItem = JSON.stringify(Object.values(item));

              currentItem = currentItem.toLowerCase();
              searchParam = searchParam.toLowerCase();

              if(searchParam != "," || "{" || "}"){
                  if(currentItem.includes(searchParam)){
                              result.push(item);
                  }
              }
          
          });

          this.members = result;
        }else{
        this.members = this.tempMembers

        }
       
        // let temp = data;
        
       },
  },
  mounted(){
    this.getMembers();
    this.getPositions();
    this.getNyikas();
    // this.getCommittee();
    this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
  }
  }
  </script>
  
  <style>
  table{
    background-color: white;
  }
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
      padding-top: 10px;
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
  