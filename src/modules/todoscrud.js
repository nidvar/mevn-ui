import {ref, computed} from 'vue';
import { useRoute, useRouter} from 'vue-router'

const getTodos = function(){

    const route = useRoute();
    const router = useRouter();

    const todoId = computed(()=>{
        return route.params.id;
    }) 

    const state = ref({
        todos:[],
        newAuthor:'',
        newTodo:'',
    })
    const getAllTodos = async function(){
        try{
            const response = await fetch('http://localhost:3000/todos');
            const data = await response.json();
            state.value.todos = [];
            data.forEach((item)=>{
                state.value.todos.push(item);
            });
        }catch(err){
            console.log(err);
        }
    }
    const newTodo = function(){
        console.log(state.value.newAuthor, state.value.newTodo)
        fetch('http://localhost:3000/todos/new', {
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                author: state.value.newAuthor,
                todo: state.value.newTodo,
            })
        })
        .then(()=>{
            getAllTodos();
        });
    }
    const deleteTodo = function(id){
        fetch('http://localhost:3000/todos/delete/' + id, {
            method:'DELETE'
        })
        .then(()=>{
            getAllTodos();
        });
    }
    const editTodo = function(id){
        const responseOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: state.value.newAuthor,
                todo: state.value.newTodo
            }) 
        };
        fetch('http://localhost:3000/todos/update/' + id, responseOptions)
        .then((res)=>{
            console.log(res.body)
            return res.body
        })
        .then((res)=>{
            console.log(res);
            router.push('/')
        });
    }
    const selectedTodo = ref({})
    const getSpecificTodo = async function(){
        const todo = await fetch('http://localhost:3000/todos/get/' + todoId.value);
        selectedTodo.value =  await todo.json();
    }
    return{
        state,
        getAllTodos,
        newTodo,
        deleteTodo,
        editTodo,
        getSpecificTodo,
        selectedTodo
    }
}

export default getTodos