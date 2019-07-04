<template>
    <v-card ref="form" class="mx-auto">
        <v-toolbar color="accent-4" cards light flat>
            <v-card-title class="title font-weight-regular">
                <div v-if="this.todoItem">Edit ToDo</div>
                <div v-else>New ToDo</div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn v-if="collapsable" icon @click="collapsed = !collapsed; lazyLoad()">
                <v-icon v-if="collapsed">mdi-chevron-double-right</v-icon>
                <v-icon v-else>mdi-chevron-double-down</v-icon>
            </v-btn>
        </v-toolbar>
        <v-form v-if="!collapsed" v-model="valid" v-on:submit.prevent>
            <v-card-text>
                <v-text-field :label="`Title`" box autocomplete="off" :rules="[todoForm.required, todoFormTitleRules.maxLength]" type="text" v-model="todo.title" placeholder="Add your title here" counter maxlength="80"></v-text-field>
                <v-textarea :label="`Description`" box autocomplete="off" type="text" v-model="todo.description" placeholder="Add your description here"></v-textarea>
                <v-select v-model="todo.assigneeId" :items="users" item-value="id" item-text="displayName" :rules="[todoForm.required]" label="Assignee"/>
                <v-text-field :label="`Due Date`" box autocomplete="off" type="text"  :rules="[todoFormDueDateRules.verify]" v-model="todo.dueDate" placeholder="YYYY-MM-DD"></v-text-field>
                <v-text-field :label="`Reference Link`" box autocomplete="off" type="text" v-model="todo.referenceLink" placeholder="Add your Reference Link"></v-text-field>
                <v-checkbox v-model="todo.isExternal" :label="`is external ToDo?`"></v-checkbox>
                <v-checkbox v-if="todo.isExternal" v-model="todo.isBillable" :label="`is billable?`"></v-checkbox>
                <v-checkbox v-model="todo.status" :label="`is Done?`"></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="this.todoItem" type="submit" large :disabledinactive="!valid" class="mx-0" @click="updateTodo()">update</v-btn>
                <v-btn v-else               type="submit" large :disabledinactive="!valid" class="mx-0" @click="saveToDo()">create</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>
 
<script>
  export default {
    data: () => ({
      valid: true,
      todo: {
        title: '',
        description: '',
        status: false,
        referenceLink: '',
        assigneeId: '',
        dueDate: null,
        creationDate: new Date().toISOString().split('T')[0],
        isExternal: false,
        isBillable: false
      },
      users: [],
      collapsed: false,
      persisted: false
    }),
    props: {
        todoItem : {}, 
        collapsable: {
            default: false,
            type: Boolean
        }, 
        collapsedAtBeginning: {
            default: false,
            type: Boolean
        }
    },
    async mounted() {
      if (this.todoItem && this.todoItem.id !== null){
          this.todo = this.todoItem;
      }
      this.collapsed = this.collapsedAtBeginning;
    },
    computed : {
        todoForm(){
            return {
                required: value => !!value || "Entry is missing!",
            }
        },
        todoFormDueDateRules(){
            return {
                verify: value => !value || /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test('abc1') || Date.parse(value) > Date.parse(this.todo.creationDate) || "If set, date must be in the future and needs format YYYY-MM-DD",
            }
        },
        todoFormTitleRules() {
            return {
                maxLength: value => value.length <= 80 || 'Title must be less than 80 characters'
            }
        }
    },    
    methods: {
      async saveToDo() {
        let that = this;
        if (that.valid){
            await fetch('/todo', {
            method: 'POST', 
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(that.todo), 
            });
            this.persisted = true;
        }
      },
      async updateTodo() {
        let that = this;
        await fetch(`/todo/${that.todo.id}`, {
          method: 'PUT', 
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(that.todo),
        });
        this.todoItem = this.todo;
      },
      async lazyLoad(){
          if (!this.collapsed){
            const response = await fetch('/user');
            this.users = await response.json();
          }
      }
    }
  }
 
</script>