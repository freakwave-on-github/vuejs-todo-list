import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        users: [],
        todos: [],
        statusTypes: [],
        loading: 0,
        reloading: 0
    },
    mutations: {
        startLoading(state) {
            state.loading += 1;
        },
        stopLoading(state) {
            state.loading -= 1;
        },
        startReloading(state) {
            state.reloading += 1;
        },
        stopReloading(state) {
            state.reloading -= 1;
        },
        changeUsers(state, users) {
            state.users = users
        },
        changeToDos(state, todos) {
            state.todos = todos;
        },
        changeStatusTypes(state, statusTypes) {
            state.statusTypes = statusTypes;
        }
    },
    actions: {
        async loadUsers({ commit }) {
            commit('startLoading');
            var usersResponse = await fetch('/user');
            commit('changeUsers', await usersResponse.json());
            commit('stopLoading');
        },
        async loadTodos({ commit }) {
            commit('startLoading');
            var todosResponse = await fetch('/todo');
            commit('changeToDos', await todosResponse.json());
            commit('stopLoading');
        },
        async loadStatusTypes({ commit }) {
            commit('startLoading');
            var statustypesResponse = await fetch('/statustype');
            commit('changeStatusTypes', await statustypesResponse.json());
            commit('stopLoading');
        },
        async reloadTodos({ commit }) {
            commit('startReloading');
            await this.dispatch('loadTodos');
            commit('stopReloading');
        }
    },
    getters: {
        users: state => state.users,
        todos: state => state.todos,
        statusTypes: state => state.statusTypes
    }
})