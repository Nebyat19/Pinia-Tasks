import {defineStore} from 'pinia'
import { config } from '@/config'
 export const useTaskStore=defineStore('TaskStore', {

state: () => (
     {   
     tasks: [],
     isLodding:false,
     error:null,
     userId:null
    }
),
getters:{

    notComplited(){

        return this.tasks.filter(t=>!t.isComplited).length
    },

    favs(){
        return this.tasks.filter(t=>t.isFav)
    },
    countFav(){
        return this.tasks.reduce((p,c) =>{
            return c.isFav ? p+1 : p
        },0
     )
    },
    count: (state)=> state.tasks.length
   
},
actions:{
    setUserId(userId){
        this.userId=userId
    },
     async fetchTasks(){
        this.isLodding=true
       
       try{ 
        const res= await fetch(config.taskUrl+'?userId='+localStorage.getItem('userId') )
        if(!res.ok){
            throw new Error('Something went wrong')
       
        }
            const data= await res.json()
            this.tasks=data
        }
        
         catch(e){
              this.error=e
         }
            finally{
                this.isLodding=false
               
            }
     },
    async addTask(task){
     try{ 
        const res = await fetch(config.taskUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(task)
        })
        if(res.error)   throw new Error('Something went wrong')
    }catch(e){
      this.error=e
      return
    }
        this.tasks.push(task)
       
    },
   async removeTask(id){
       

        this.tasks=this.tasks.filter(t=>t.id!==id)
        const res= await fetch(`${config.taskUrl}/${id}`,{
            method:'DELETE'
        })
        if(res.error) console.log(res.error)
    },
   
    async toggleisFav(id){
        const task=this.tasks.find(t=>t.id===id)
        task.isFav=!task.isFav

      const res = await fetch(`${config.taskUrl}/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(task)
        })
    },
    async toggleisComplited(id){
        const task=this.tasks.find(t=>t.id===id)
        task.isComplited=!task.isComplited

      const res = await fetch(`${config.taskUrl}/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(task)
        })
    },
}

})

