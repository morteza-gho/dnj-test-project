import axios from "axios";
import { BASE_URL } from './../Constants';
import { createStore } from "vuex";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const store = createStore({

  state: {
    discussions: [],
    users: []
  },

  getters: {
    allDiscussions(state) {
      return state.discussions
    },
    allUsers(state) {
      return state.users
    }
  },

  mutations: {

    setDiscussions(state, data) {
      state.discussions = data; // set discussions to store
    },

    setUsers(state, data) {
      state.users = data; // set users to store
    },

    addDiscussion(state, newItem) {
      state.discussions.unshift(newItem);
    },

    updateDiscussion(state, updtedItem) {
      const taskIndex = state.discussions.findIndex(x => x.id === updtedItem.id);
      state.discussions[taskIndex] = updtedItem;
    },

    deleteDiscussion(state, itemId) {
      const taskIndex = state.discussions.findIndex(x => x.id === itemId);
      state.discussions.splice(taskIndex, 1);
    },
  },

  actions: {

    async fetchUsers({ commit }) {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/users`);
        if (status === 200) {
          commit('setUsers', data);
        }
      } catch (err) {
        $toast.error(err.message);
      }
    },

    async fetchDiscussions({ commit }) {
      try {
        const { status, data } = await axios.get(`${BASE_URL}/discussions`);
        if (status === 200) {
          commit('setDiscussions', data);
        }
      } catch (err) {
        $toast.error(err.message);
      }
    },

    async addDiscussion({ commit }, dataModel) {
      try {
        const { status, data } = await axios.post(`${BASE_URL}/discussions`, dataModel);
        if (status === 201) {
          commit('addDiscussion', data);
        }
      } catch (err) {
        $toast.error(err.message);
      }
    },

    async updateDiscussion({ commit }, updatedItem) {
      try {
        const { status, data } = await axios.put(`${BASE_URL}/discussions/${updatedItem.id}`, updatedItem);
        if (status === 200) {
          commit('updateDiscussion', data)
        }
      } catch (err) {
        $toast.error(err.message);
      }
    },

    async deleteDiscussion({ commit }, itemId) {
      try {
        const { status, data } = await axios.delete(`${BASE_URL}/discussions/${itemId}`);
        if (status === 200) {
          commit('deleteDiscussion', itemId)
        }
      } catch (err) {
        $toast.error(err.message);
      }
    },

  }

});

export default store;