import AuthService from "~/app/services/AuthService";

export const actions = {
  handler: () => {},

  async login({ commit }, params) {
    const { email, password } = params;

    try {
      const res = await AuthService.login({ email, password });
      const { user, accessToken } = res.data;

      localStorage.setItem("token", accessToken);

      commit("SER_AUTH", true);
      commit("SER_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async registration({ commit }, params) {
    const { email, password } = params;

    try {
      const res = await AuthService.logout({ email, password });
      const { user, accessToken } = res.data;

      localStorage.setItem("token", accessToken);

      commit("SER_AUTH", true);
      commit("SER_USER", user);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  },

  async logout() {
    try {
      await AuthService.logout();

      localStorage.removeItem("token");

      commit("SER_AUTH", false);
      commit("SER_USER", {});
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  }
};
