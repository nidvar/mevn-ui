<script lang="js" setup>
    import getTodos from '../modules/todoscrud';
    import { onMounted, ref } from 'vue';

    const module = getTodos();
    const state = module.state
    const selectedTodo = module.selectedTodo;

    const editTodo = function(id){
        console.log('edit', id);
        module.editTodo(id)
    }

    onMounted(()=>{
        module.getAllTodos();
        module.getSpecificTodo();
    });
</script>
<template>
    <h1>Todo Details</h1>
    <p>{{ selectedTodo.author }}</p>
    <p>{{ selectedTodo.todo }}</p>
    <div>
        <input type="text" v-model="state.newAuthor" placeholder="new author"><br />
        <input type="text" v-model="state.newTodo" placeholder="new todo"><br />
        <button @click="editTodo(selectedTodo._id)">EDIT</button>
    </div>
</template>