<template>
  <div class=" bg-gray-200 flex flex-col items-center">
 <h1 class= "flex  align-middle px-20 pt-10 pb-3 items-center justify-center gap-3 text-gray-500 text-2xl rotate-1 font-extrabold">
  <img class="w-10 h-14" src="./assets/img/pinialogo.png" alt="" srcset=""> Pinia Tasks</h1>
  <div>
    <TaskForm/>
</div>
</div>
<div class=" bg-gray-100 h-full px-8 md:px-20 py-3">
  <div class="flex w-full justify-end gap-5"> 
  
 <button 
 class=" text-gray-800 text-sm rounded-lg px-3 py-1 border border-slate-800" @click="filter='favs'">Favorite ({{ TaskStore.countFav }})</button>
 <button 
 class="text-sm text-gray-800 rounded-lg px-3 py-1  border border-slate-800 " @click="filter='all'">All Tasks ({{ TaskStore.count }})</button>

</div>
<h1 class="text-sm text-gray-600 mt-5">You have [{{TaskStore.notComplited  }}] Tasks left to do</h1>
<div v-if="TaskStore.isLodding" class=" text-sm text-gray-800 font-bold">Loding...</div>
<div class="text-xs text-red-500" v-if="TaskStore.error">{{ TaskStore.error }}</div>
<Tasks :filter="filter" />
</div>
</template>


<script>
//import {StoreToRefs} from 'pinia'
import {useTaskStore} from './stores/TaskStore.js';
import Tasks from './components/Tasks.vue';
import TaskForm from './components/TaskForm.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
export default {
  components: {
    Tasks,TaskForm
  },
  setup() {
    const TaskStore= useTaskStore();
  //const {tasks} =StoreToRefs(TaskStore)
    //fetch tasks

 
    const filter =ref('all')
    const isHidden=ref(false)
    const addTask =ref('addTask')
    const userId=ref('')
   
    onMounted(()=>{
    userId.value=localStorage.getItem('userId') 
    if(!userId.value){
    userId.value=Date.now()
    localStorage.setItem('userId', userId.value)
    }
 
   
   console.log(TaskStore.userId)

   })

   
   TaskStore.setUserId(userId.value)
   TaskStore.fetchTasks();

   return {filter,TaskStore ,addTask, isHidden};
}
}

</script>