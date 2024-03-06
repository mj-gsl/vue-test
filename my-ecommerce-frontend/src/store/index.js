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
    async logoutUser({ commit }) {
      try {
        // Replace with your backend's logout endpoint
        await axios.get('http://localhost:3001/auth/logout', { withCredentials: true });
        commit('SET_USER', null);
        // Optional: Redirect to login page or home page
        // router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        // Handle logout error (e.g., show a notification to the user)
      }
    },
  },
});
