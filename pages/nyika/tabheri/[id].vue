<template>
  <NuxtLayout name="default">
    <TabheriMembers :id="this.$route.params.id"/>
    <div class="bg-white border-gray-300 border rounded-md my-4">
    <p v-if="loading">Loading</p>
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
  </NuxtLayout>
</template>

<script>
export default {
  data(){
    return{
      loading:false,
      collection:[]
    }
  },
methods:{
  async getCollection() {
      console.log("Fetching collection Data....");
      this.loading = true;
      const scope = this.$router.params.id;
     const URL= `http://localhost:8080/financials/reports/nyika/${scope}`;
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
},
mounted(){
  this.getCollection();
}
}
</script>

<style>

</style>