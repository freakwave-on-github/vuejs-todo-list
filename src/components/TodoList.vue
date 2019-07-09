<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>Todo List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field :label="``" box autocomplete="on" type="text" @change="updateCSVDownload('#csvDataSet', getCSVTodos(true), 'Filtered_CSV_Download_'+ searchString +'_'+ new Date().toISOString()+'.csv')" v-model="searchString" placeholder="Filter..."></v-text-field>
    </v-toolbar>
    <TodoListItem v-for="todo in filteredTodosBySearchString" v-bind:todo="todo" v-bind:key="todo.id"></TodoListItem>
    <v-btn><a id="csvDataSet" download="" href="#">Export CSV</a></v-btn>
  </div>
</template>
 
<script>
  import TodoListItem from './TodoListItem';

  //only needed to create CSV-File on Browser-Side, should be removed when csv-Generation comes from Server side
  import JQuery from 'jquery'
  let $ = JQuery   
 
  export default {
    async mounted() {
      this.updateCSVDownload('#csvDataSet', this.getCSVTodos(true), 'Filtered_CSV_Download_'+ this.searchString +'_'+ new Date().toISOString()+'.csv')
    },
    components: {
      TodoListItem
    },
    name: 'TodoList',
    data() {
      return {
        searchString: '',
        blobObject: null
      };
    },
    computed: {
        filteredTodosBySearchString() {
          return this.filterTodosBySearchString();
        }
    },
    methods:{
        getCSVTodos(filtered) {
          var filteredTodos = filtered ? this.filterTodosBySearchString() : this.$store.getters.todos;
          var csv = ""; 
          if (filteredTodos.length > 0){
            const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
            const header = Object.keys(filteredTodos[0]);
            csv = filteredTodos.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
            csv.unshift(header.join(','));
            csv = csv.join('\r\n');
          }
          return csv;
        },
        filterTodosBySearchString() {
          return this.searchString.length > 0 ? (this.$store.getters.todos.filter(todoItem => 
            (todoItem.title.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1) ||
            (todoItem.referenceLink.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1) ||
            (this.$store.getters.statusTypes.find(statusType => statusType.id === todoItem.statusTypeId).displayName.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1) ||
            (todoItem.description.toUpperCase().indexOf(this.searchString.toUpperCase()) !== -1)
          )) : this.$store.getters.todos;
        },
        updateCSVDownload(anchorSelector, content, fileName){
          if(window.navigator.msSaveOrOpenBlob) {
            var fileData = [content];
            this.blobObject = new Blob(fileData);
            $(anchorSelector).click(function(){
              window.navigator.msSaveOrOpenBlob(this.blobObject, fileName);
            });
          } else {
            var url = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
            $(anchorSelector).attr("href", url);
            $(anchorSelector).attr("download", fileName);
          }
        }
    }
  }
</script>
