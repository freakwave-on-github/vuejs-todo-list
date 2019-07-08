<template>
  <v-app id="app">
    <v-layout row>
      <v-flex xs12 offset-sm1 sm4>
        <TodoForm collapsable collapsedAtBeginning/> <!--to create new todos-->
      </v-flex>
      <v-flex xs12 offset-sm1 sm5>
        <TodoList /> <!-- Overview of existing tickets with filter -->
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import TodoList from './components/TodoList.vue'
import TodoForm from './components/TodoForm';

export default {
  name: 'app',
  async mounted() {
    await this.$store.dispatch('loadUsers');
    await this.$store.dispatch('loadTodos');
    await this.$store.dispatch('loadStatusTypes');
  },
  components: {
    TodoList,
    TodoForm
  },
  data() {
    return {};
  },
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
</style>
