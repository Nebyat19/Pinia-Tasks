<template>
    <div>
      <form
        @submit.prevent="handlesubmit"
        class=" text-gray-50 mb-4 flex gap-2 justify-center rounded-lg"
        
      >
     
        <input  type="text" v-model="title" class="w-2/3 py-2  px-5 text-gray-500 rounded-lg" placeholder="I need to ..." />
        <button type="submit" class="bg-[#ffcc44] px-5 text-sm  text-gray-900 rounded-lg">Add</button>
      </form>
    </div>
  </template>
   <script>
  
   import {useTaskStore} from '../stores/TaskStore.js';
   import { ref } from 'vue';
   export default{
    props: [],
     setup(){
           const title= ref('')
          
           const handlesubmit=()=>{
               if (title.value.length > 0) {
                   
                useTaskStore().addTask({
                     title: title.value,
                     isFav: false,
                     id: Date.now(),
                     isComplited: false,
                     userId: localStorage.getItem('userId')
                  });
                  title.value = '';
              
                  
               }
           }
   
           return {title, handlesubmit}
       }
   }
   </script>
  
 
  