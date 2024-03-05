import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        // Make sure to replace 'http://localhost:3001/auth/login/success' with the correct endpoint
        // to fetch the currently logged-in user's data.
        const response = await axios.get('http://localhost:3001/auth/login/success', { withCredentials: true });
        if (response.data.success) {
          commit('SET_USER', response.data.user);
        } else {
          commit('SET_USER', null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        commit('SET_USER', null);
      }
    },
    logoutUser({ commit }) {
      commit('SET_USER', null);
      // You should also invalidate the session on the backend here.
    },
  },
});
