<template>
<NuxtLayout name="default">
 
<div class="px-4 sm:px-6 lg:px-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-xl font-semibold text-gray-900">Church Members</h1>
      <p class="mt-2 text-sm text-gray-700">A list of all the members in your account including their name, title, email and role.</p>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <NuxtLink to="./add/newUser" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add member</NuxtLink>
    </div>
  </div>
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full">
            <thead class="bg-white">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mobile</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th> -->
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Taberi</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="border-t border-gray-200">
                <th colspan="5" scope="colgroup" class="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6">All Members</th>
              </tr>

              <tr v-for="(member,index) in members" :key="index" class="border-t border-gray-300">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ member.firstname }} {{ member.lastname }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.mobileNumber }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.email}}</td>
                <!-- <td v-if="member.position !== null" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ member.position }}</td> -->
                <!-- <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td> -->
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{member.tabheri}}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm text-center font-medium sm:pr-6">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">{{ member.firstname }}</span></a>
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
    members: [],
    errors:{},
    errored: false
  }
},
methods:{
  async getProperties() {
      console.log("Fetching Members Data....");
      this.loading = true;
     const URL= "http://localhost:8080/members";
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
        this.members = res.data;
        // this.loadImages();
        var x= 0;
     
        //   for(x=0;x<this.properties.length;x++){
        //     this.getImages(this.properties[x].id)
        //     console.warn("Property: "+this.properties[x].id)
        //   }
        this.imgs = this.members.images;
        console.log(this.members);
        console.log(typeof (this.members))
        console.log("Fetching  Members Data Completed...");
      }).catch(error => {
        console.warn(error.code)
        this.error = error.code;
        this.errored = true

      }).finally(() => this.loading = false);
    },
},
mounted(){
  this.getProperties()
}
}
</script>

<style>

</style>