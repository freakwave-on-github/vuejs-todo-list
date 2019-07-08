<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>Todo List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field :label="``" box autocomplete="on" type="text" v-model="searchString" placeholder="Filter..."></v-text-field>
    </v-toolbar>
    <TodoListItem v-for="todo in filteredTodosBySearchString" v-bind:todo="todo" v-bind:key="todo.id"></TodoListItem>
  </div>
</template>
 
<script>
  import TodoListItem from './TodoListItem';
 
  export default {
    async mounted() {
      
    },
    components: {
      TodoListItem
    },
    name: 'TodoList',
    data() {
      return {
        searchString: ''
      };
    },
    computed: {
        filteredTodosBySearchString() {
          return this.$store.getters.todos.filter(todoItem => 
            (todoItem.title.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1) ||
            (todoItem.referenceLink.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1) ||
            (todoItem.status.toString().toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1) ||
            (todoItem.description.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1)
          );
        }
    }
  }
</script>
