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

      const { user, accessToken, refreshToken } = res.data;

      localStorage.setItem("token", accessToken);
      document.cookie = `refreshToken=${refreshToken}`;

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

      const { user, accessToken, refreshToken } = res.data;

      localStorage.setItem("token", accessToken);
      document.cookie = `refreshToken=${refreshToken}`;

      commit("SET_AUTH", true);
      commit("SET_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async logout({ commit }) {
    try {
      const res = await AuthService.logout();

      if (res.status) {
        localStorage.removeItem("token");
        document.cookie = `refreshToken=expired`;

        commit("SET_AUTH", false);
        commit("SET_USER", {});
      }
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async checkAuth({ commit }) {
    try {
      const res = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true
      });

      const { user, accessToken, refreshToken } = res.data;

      localStorage.setItem("token", accessToken);
      document.cookie = `refreshToken=${refreshToken}`;

      commit("SET_AUTH", true);
      commit("SET_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  }
};
