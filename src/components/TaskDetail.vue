<template>

<div  class="cursor-pointer flex justify-between  bg-white rounded-lg p-3 my-5">
    <h2  @click="TaskStore.toggleisComplited(task.id)" :class="task.isComplited ? 'text-[#81df8c]': ' text-slate-950 '" class="text-red w-full text-md font-bold">{{ task.title }}</h2>
   
 <div class="flex gap-3">  <i
     @click="TaskStore.removeTask(task.id)" 
     class="material-icons text-gray-500 hover:text-slate-500 cursor-pointer">delete</i>
   <i
    @click="TaskStore.toggleisFav(task.id)"
    :class="task.isFav?'text-red-500' :'text-gray-600'"  class="hover:text-red-300 active:text-red-500 material-icons cursor-pointer">favorite</i></div>
   
</div>
</template>


<script>
import {useTaskStore} from '../stores/TaskStore'
export default {
    props: ['task'],
 setup(){
    const TaskStore = useTaskStore()
     return {TaskStore}
 }
}
</script>