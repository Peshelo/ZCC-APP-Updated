<template>
<NuxtLayout name="auth" class="h-screen">
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- <img class="mx-auto h-32 w-auto" src="../../assets/images/zcc.png" alt="Your Company" /> -->
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <NuxtLink to="./register" class="font-medium hover:text-indigo-500 underline underline-offset-2">Create an acount</NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white border border-gray-300 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <p v-if="loading" class="text-center">Loading...</p>
        <form v-else @submit.prevent="handleSubmit()" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
            <!-- <p v-if="this.errors.email" class="text-sm text-red-600 text-left mb-2">*{{this.errors.email}}</p> -->
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
            <!-- <p v-if="this.errors.password" class="text-sm text-red-600 text-left mb-2">*{{this.errors.password}}</p> -->

          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-sky-600 hover:text-sky-500">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-sky-700 py-3 px-4 text-md font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</NuxtLayout>
</template>


<script>
import axios from 'axios'
import jwt_decode from "jwt-decode";
export default {
    layout:'auth',
    data(){
        return{
            email: "",
            password: "",
            loading: false,
            errored:false,
            errors: {},
            loading: false,
            errored: false
        }
    },
    methods:{
        async handleSubmit(){
         
            this.errors = {};
            if(!this.email){
                this.errors.email = "Email is required";
            }
            if(!this.password){
                this.errors.password = "Enter password";
            }
            if (Object.keys(this.errors).length === 0) {
       // Your code for handling the login form submission
       this.loading = true;
       try{
        await axios.post('http://localhost:8080/auth/login',{
        email:this.email,
        password :this.password
        },{
            headers: {'Content-Type': 'application/json',
            // Authorization : 'Bear' + localStorage.token,
            'Access-Control-Allow-Origin': '*'
          },
            credentials: 'include',
          }).then((response) =>{
          const data = response.data;
          console.log(data);

          if(response.data == "User Not Found"){
            this.errors.failed = "Wrong Login details...";
            alert(this.errors.failed);
          }else{
            // const parts = data.split(':')
              // this.token = parts[1].trim().replace(' role', '').replace('')
              // this.role = parts[2].trim().replace('[', '').replace(']', '')
              // this.token.replace('token: ',"")
              // tokenValue = this.getTokenValue(token)
              // localStorage.token = this.getTokenValue(data).replace('token : ',"").replace(' role : [OWNER]',"");
              // localStorage.role = this.role;
            this.success="";
            this.success = "Login Sucessful...";
            alert(this.success);
            console.log("Login Successful..")
            // localStorage.removeItem(token);
            localStorage.token = response.data;
            localStorage.token = this.getTokenValue(response.data);
            localStorage.role = this.getUserRole(response.data);

            localStorage.scopeId = jwt_decode(localStorage.token).scopeId;
            if(localStorage.role === "TABHERA_ADMIN"){
              this.$router.push('../tabheri/')
            }
            if(localStorage.role === "NYIKA_ADMIN"){
              this.$router.push('../nyika/')
            }
            if(localStorage.role === "GREATER_ADMIN"){
              this.$router.push('../greater/')
            }

            if(localStorage.role === "CENTER_ADMIN"){
              this.$router.push('../center/')
            }
            if(localStorage.role === "REGIONAL_ADMIN"){
              this.$router.push('/region/')
            }
            if(localStorage.role === "JERUSALEM_ADMIN"){
              this.$router.push('/jerusalem/')
            }
          }
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
        push(){
      this.$router.push("../agentAccount/dashboard")
    },
    getTokenValue(tokenString) {
    const tokenArray = tokenString.split(' ')
    const tokenValue = tokenArray[tokenArray.indexOf('token') + 2]
    return tokenValue
    },
    getUserRole(tokenString) {
    const tokenArray = tokenString.split(' ')
    const tokenValue = tokenArray[tokenArray.indexOf('role') + 2].replace("[","").replace("]","");
    return tokenValue
    },
    }
    

}
</script>

<style>

</style>