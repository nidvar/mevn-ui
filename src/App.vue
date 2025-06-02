<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <ul>
      <RouterLink to="/">Home</RouterLink><br />
      <RouterLink to="/todos">Todos Page</RouterLink><br />
    </ul>
  </header>

  <RouterView />
</template>