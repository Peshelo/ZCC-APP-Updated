<template>
    <!--
    This example requires some changes to your config:
    
    ```
    // tailwind.config.js
    module.exports = {
      // ...
      plugins: [
        // ...
        require('@tailwindcss/forms'),
      ],
    }
    ```
  -->
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
  
      <div class="pt-8">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">Add new member</h3>
          <p class="mt-1 text-sm text-gray-500">.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
            <div class="mt-1">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
            <div class="mt-1">
              <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium text-gray-700">Tabheri</label>
            <div class="mt-1">
              <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>Tabheri 1</option>
                <option>Tabheri 2</option>
                <option>Tabheri 3</option>
              </select>
            </div>
          </div>
  
          <div class="sm:col-span-6">
            <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
            <div class="mt-1">
              <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div class="sm:col-span-2">
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <div class="mt-1">
              <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div class="sm:col-span-2">
            <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
            <div class="mt-1">
              <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
  
          <div class="sm:col-span-2">
            <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
            <div class="mt-1">
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
        </div>
      </div>
  
    </div>
  
    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
        <button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </form>
  
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>