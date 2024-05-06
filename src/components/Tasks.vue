<template>

<div  class="" v-for="task in TaskStore.tasks" :key="task.id"  v-if="filter==='all'">
<TaskDetail :task="task" />
</div>

<div  class=" " v-for="task in TaskStore.favs" :key="task.id" v-if="filter === 'favs'">
<TaskDetail :task="task" />

</div>
   
</template>

<script>
import {useTaskStore} from '../stores/TaskStore'
import TaskDetail from './TaskDetail.vue'
export default {
    props: ['filter'],
  components: {
    TaskDetail
  },
  setup(){
    const TaskStore = useTaskStore()
    return {TaskStore}
  }
}
</script>