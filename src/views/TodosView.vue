<script lang="js" setup>
    import getTodos from '../modules/todoscrud';
    import { onMounted } from 'vue';

    const module = getTodos();
    const state = module.state;

    const addNew = function(){
        module.newTodo();
    };

    const deleteTodo = function(id){
        module.deleteTodo(id);
    }

    onMounted(()=>{
        module.getAllTodos();
    });

</script>
<template>
    <h1>Todos</h1>
    <div>
        <input type="text" v-model="state.newAuthor" placeholder="new author"><br />
        <input type="text" v-model="state.newTodo" placeholder="new todo"><br />
        <button @click="addNew">ADD NEW TODO</button>
    </div>
    <div>
        <ul>
            <li v-for="item in state.todos" :key="item._id">
                {{ item.author }} - {{ item.todo }}
                <RouterLink :to="'/tododetails/' + item._id">
                    <button>UPDATE</button>
                </RouterLink>
                <button @click="deleteTodo(item._id)">DELETE</button>
            </li>
        </ul>
    </div>
</template>