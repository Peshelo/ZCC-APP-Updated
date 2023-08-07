<template>
    <div>
      <div v-if="loading" class="loading-page">
      <p>Loading...</p>
    </div>
      <h1 class="text-2xl font-bold mb-4">Nyika Reports</h1>
      <!-- <div class="flex flex-row shadow-md border p-2 justify-between items-center">
        <div class="p-2 w-fit rounded-md">
          <button class="w-fit p-2 px-4 bg-green-400 shadow-md rounded-md border">
            Collections
          </button>
          <button class="w-fit p-2 px-4 rounded-md text-gray-400">
            Financial Reports
          </button>
        </div>
        <NuxtLink to="../financials/" class="w-fit p-2 px-4 rounded-md text-white bg-green-400">
            Add New
          </NuxtLink>
      </div> -->
  
      <!-- Table -->
      <div class="bg-white border border-gray-300 rounded-md my-4">
      <p v-if="loading">Loading</p>
      <!-- <p>{{ members }}</p> -->
          <!-- Committee Members Table -->
            <table v-else class="min-w-full my-4">
              <thead class="bg-white">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
  
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Term</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Purpose</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">USD</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">RANDS</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">RTGS</th>
                  <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th> -->
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr class="border-t border-gray-200">
                  <th colspan="7" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">Collections Report</th>
                </tr>
  
                <tr v-for="(item,index) in collection" :key="index" class="border-t border-gray-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td>
  
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.localDate }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.term.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.purpose.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${{ item.receivedAmounts.USD.toLocaleString('en-US')  }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${{ item.receivedAmounts.ZAR.toLocaleString('en-US')  }}</td>

                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${{ item.receivedAmounts.ZWL.toLocaleString('en-US')  }}</td>
                  <!-- <td v-if="member.position !== null" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.position }}</td> -->
                  <!-- <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td> -->
                  <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Edit</td> -->
                </tr>
  
                <!-- More people... -->
              </tbody>
            </table>
            <!-- <table class="min-w-full my-4">
              <thead class="bg-white">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
  
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Term</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Purpose</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Received</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
  
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr class="border-t border-gray-200">
                  <th colspan="7" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">Financial Report</th>
                </tr>
  
                <tr v-for="(item,index) in collection" :key="index" class="border-t border-gray-300">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td>
  
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.localDate }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.term.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.purpose.name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ item.receivedAmounts }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Edit</td>
                </tr>
  
              </tbody>
            </table>
   -->
          </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    props:{
        id:{
            type: String,
            required: true
        }
    },
    // loading: true,
  data(){
    return{
      loading: false,
      collection: [],
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
    async getcollection() {
        console.log("Fetching collection Data....");
        this.loading = true;
       const URL= `http://localhost:8080/financials/collections/${this.id}`;
        // const token = localStorage.token;
        // console.log('Token is string: ' + isString(token))
        // console.log(token);
        await axios.get(URL, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.token,
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'application/json'
          }
        }).then((res) => {
          this.collection = res.data;
          console.log(typeof (this.collection))
          console.log("Fetching collection Data Completed...");
        }).catch(error => {
          console.warn(error.code)  
          alert(error);
          this.error = error.code;
          this.errored = true
  
        }).finally(() => this.loading = false);
      },
  },
  mounted(){
    this.getcollection();
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
  