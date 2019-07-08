<template>
 <div>
    <v-dialog v-model="showEditModal">
        <TodoForm v-bind:todoItem="todo"/>
        <v-btn light @click="showEditModal = false;">close</v-btn>
    </v-dialog>

    <v-card>
        <v-toolbar color="accent-4" cards light flat>
            <v-card-title class="title font-weight-regular" v-bind:class="{ done: todo.done, open: !todo.done }">
                <div>
                    <span v-if="todo.statusTypeId">✔</span>
                    <span v-else>✘</span>
                    {{todo.title}}
                </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon @click="deleteTodo()">mdi-delete</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon @click="showEditModal = true">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="isNotCollapsed = !isNotCollapsed; lazyLoad()">
                <v-icon v-if="isNotCollapsed">mdi-chevron-double-down</v-icon>
                <v-icon v-else>mdi-chevron-double-right</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text>
            <div v-if="isNotCollapsed">
                <!-- Description -->
               <v-layout v-if="todo.description" row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Description</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text>{{todo.description}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Due date -->
               <v-layout v-if="todo.dueDate" row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Due date</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text>{{todo.dueDate}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Status -->
               <v-layout row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Status</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text>{{$store.getters.statusTypes.find(statusType => statusType.id === todo.statusTypeId).displayName}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Reference link -->
               <v-layout v-if="todo.referenceLink" row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Reference link</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text><a v-bind:href="todo.referenceLink" target="_blank">{{todo.referenceLink}}</a></v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Assignee -->
               <v-layout row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Assignee</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text>{{$store.getters.users.find(user => user.id === todo.assigneeId).displayName}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Is External ToDo -->
               <v-layout row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Is External ToDo</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text>{{todo.isExternal ? 'Yes': 'No'}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <!-- Is Billable -->
               <v-layout v-if="todo.isExternal" row justify-space-around>
                    <v-flex xs3>
                        <v-card dark color="grey">
                        <v-card-text>Is Billable</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex offset-xs1 xs5>
                        <v-card dark color="green">
                        <v-card-text>{{todo.isBillable ? 'Yes': 'No'}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

            </div>
        </v-card-text>
    </v-card>
  </div>
</template>
 
<script>
  import TodoForm from './TodoForm';
  export default {
    components: {
      TodoForm
    },
    props: ['todo'],
    data() {
      return {
        isNotCollapsed: false,
        showEditModal: false,
        workingTimes : []
      };
    },
    methods: {
      async deleteTodo() {
        let that = this;
        await fetch(`/todo/${that.todo.id}`, {
          method: 'DELETE', 
          headers: {'content-type': 'application/json'}
        });
        await this.$store.dispatch('reloadTodos')
      },
      async lazyLoad() {
        if (this.isNotCollapsed && (!this.workTimes || this.workTimes.length === 0) ) {
            const workTimeResponse = await fetch('/workTime?todoId=' + this.todo.id);
            this.workTimes = await workTimeResponse.json();
        }
      }
    }
  }
</script>
 