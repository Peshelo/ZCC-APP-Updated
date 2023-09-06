<template>
    <div>
      <div v-if="loading" class="loading-page">
      <p>Loading...</p>
    </div>
      <h1 class="text-2xl font-bold mb-4">Collection Report</h1>
      <div class="flex flex-row justify-between items-center">
        <div class="p-2 w-fit flex flex-row gap-x-2 rounded-md border border-green-500">
  
          <select @change="getCollection(term,purpose)" v-model="term" class="w-fit p-2 px-4 bg-white rounded-md border">
            <option v-for="(item,index) in terms" :key="index" :value="item.id">{{ item.name }}</option>
          </select>
          <select @change="getGreater(tabheri,purpose)" v-model="purpose" class="w-fit p-2 px-4 bg-white border rounded-md text-gray-800">
            <option v-for="(item,index) in purposes" :key="index" :value="item.id">{{ item.name }}</option>
          </select>
          <select @change="getTabheri(tabheri,purpose)" v-model="purpose" class="w-fit p-2 px-4 bg-white border rounded-md text-gray-800">
            <option v-for="(item,index) in centers.greaters" :key="index" :value="item.id">{{ item.name }}</option>
          </select>
          <select @change="getCollection(nyika)" v-model="nyika" class="w-fit p-2 px-4 bg-white border rounded-md text-gray-800">
            <option v-for="(item,index) in greaters.nyikas" :key="index" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <!-- <NuxtLink to="../financials/" class="w-fit p-2 px-4 rounded-md text-white bg-green-400">
            Add New
          </NuxtLink> -->
      </div>
  
      <!-- Table -->
      <div class="bg-white border-gray-300 border rounded-md my-4">
      <p v-if="loading">Loading</p>
      <!-- <p>{{ members }}</p> -->
          <!-- Committee Members Table -->
          
            <table v-else class="min-w-full my-4">
              <thead class="bg-white">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Purpose</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Term</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Expected</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Received Amounts</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Percentage %</th>
  
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr class="border-t border-gray-200">
                  <th colspan="7" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">Collections Report</th>
                </tr>
  
                <tr v-for="(item,index) in collection" :key="index" class="border-t border-gray-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.purpose.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.term.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 font-bold">{{ item.expectedAmounts.USD }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
  
              <thead v-if="Object.keys(item.receivedAmounts).length > 1" class="bg-white">
                <tr>
                  <th scope="col" class="py-1 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">USD</th>
                  <th scope="col" class="py-1 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ZAR</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ZWL</th>
                </tr>
              </thead>
              <tbody v-if="Object.keys(item.receivedAmounts).length > 1" class="bg-white">
                <tr :key="index" class="border-t border-gray-300">
                  <td class="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.receivedAmounts.USD}}</td>
                  <td class="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.receivedAmounts.ZAR}}</td>
                  <td class="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.receivedAmounts.ZWL}}</td>
                </tr>
  
                <!-- More people... -->
              </tbody>
              <td v-else>No collections yet!</td>
                  </td>
                  <!-- <td v-if="member.position !== null" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.position }}</td> -->
                  <!-- <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td> -->
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button>50</button>
                  </td>
                </tr>
  
                <!-- More people... -->
              </tbody>
            </table>
  
          </div>
        </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    // loading: true,
  data(){
    return{
      loading: false,
      collection: [],
      terms:[],
      term:1,
      greaters:[],
      tabheris:[],
      centers:[],
      purposes:[],
      purpose:1,
      tabheri:{id:1},
      errors:{},
      errored: false
    }
  },
  methods:{
    asPDF(){
        this.exportTableToCSV(null, 'Tabheri Report.csv');
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

      async getCenter() {
        console.log("Fetching center Data....");
        this.loading = true;
        const scopeId = localStorage.getItem('scopeId')
        const URL= `http://13.244.64.153:7635/centers/get${scopeId}`;
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
          this.centers = res.data;
          // this.tabheriMembers = res.data.members
          console.log(this.centers);
          console.log("Fetching center Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true;
  
        }).finally(() => this.loading = false);
      },
    async getCollection(id) {
        console.log("Fetching collection Data....");
        this.loading = true;
        // const scope = localStorage.getItem('scopeId')
       const URL= `http://13.244.64.153:7635/financials/reports/nyika/${id}`;
        await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.token,
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*'
          }
        }).then((res) => {
          this.collection = res.data;
          console.log(this.collection)
          console.log("Fetching collection Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async getGreater(id) {
        console.log("Fetching Greater Data....");
        this.loading = true;
       const URL= `http://13.244.64.153:7635/greaters/get{id}?id=${id}`;
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
          this.greaters = res.data;
          // this.loadImages();
          var x= 0;
          //   for(x=0;x<this.properties.length;x++){
          //     this.getImages(this.properties[x].id)
          //     console.warn("Property: "+this.properties[x].id)
          //   }
          // this.imgs = this.center.images;
          console.log(this.greaters);
          console.log(typeof (this.greaters))
          console.log("Fetching Greaters Data Completed...");
        }).catch(error => {
          console.warn(error.code);
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      // async getTabheris() {
      //   console.log("Fetching Tabheris Data....");
      //   this.loading = true;
      //  const URL= "http://13.244.64.153:7635/nyikas/get/1";
      //   // const token = localStorage.token;
      //   // console.log('Token is string: ' + isString(token))
      //   // console.log(token);
      //   await axios.get(URL, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization : 'Bearer ' + localStorage.token,
      //       'Accept': '*/*',
      //       'Access-Control-Allow-Origin': '*'
      //     }
      //   }).then((res) => {
      //     this.tabheris = res.data;
      //     // console.log(typeof (this.tabheri))
      //     console.log("Fetching Data Completed...");
      //   }).catch(error => {
      //     console.warn(error.code)
      //     alert(error);
      //     this.error = error.code;
      //     this.errored = true
  
      //   }).finally(() => this.loading = false);
      // },
      async getTerm() {
        console.log("Fetching Term Data....");
        this.loading = true;
       const URL= "http://13.244.64.153:7635/term/all";
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
          this.terms = res.data;
          // console.log(typeof (this.tabheri))
          console.log("Fetching Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async getPurpose() {
        console.log("Fetching Purpose Data....");
        this.loading = true;
       const URL= "http://13.244.64.153:7635/purpose/all";
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
          this.purposes = res.data;
          // console.log(typeof (this.tabheri))
          console.log("Fetching Data Completed...");
        }).catch(error => {
          console.warn(error.code)
          alert(error);
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
      async fetchStart(){
        await  this.getCenter();
        await this.getGreater(this.centers.greaters[0].id);
        await this.getCollection(this.greaters.nyikas[0].id);
      }
  },
  async mounted(){
    // this.getCollection(localStorage.getItem('scopeId'));
    // this.getTabheris(); 
    await this.getTerm();
    this.getPurpose();
    this.fetchStart();

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
    </style>
  