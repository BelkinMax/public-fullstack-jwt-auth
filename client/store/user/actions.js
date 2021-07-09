import axios from "axios";
import { API_URL } from "~/app/http";
import AuthService from "~/app/services/AuthService";

export const actions = {
  handler: () => {},

  async login({ commit }, params) {
    const { email, password } = params;

    try {
      const res = await AuthService.login({ email, password });

      console.log(res); // TEST

      const { user, accessToken } = res.data;

      localStorage.setItem("token", accessToken);

      commit("SET_AUTH", true);
      commit("SET_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async registration({ commit }, params) {
    const { username, email, password } = params;

    try {
      const res = await AuthService.registration({ username, email, password });

      console.log(res); // TEST

      const { user, accessToken } = res.data;

      localStorage.setItem("token", accessToken);

      commit("SET_AUTH", true);
      commit("SET_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async logout() {
    try {
      await AuthService.logout();

      localStorage.removeItem("token");

      commit("SET_AUTH", false);
      commit("SET_USER", {});
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async checkAuth({ commit }) {
    try {
      const res = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true
      });

      const { user, accessToken } = res.data;

      localStorage.setItem("token", accessToken);

      commit("SET_AUTH", true);
      commit("SET_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  }
};
