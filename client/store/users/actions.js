import UserService from "~/app/services/UserService";

export const actions = {
  handler: () => {},

  async fetchUsers({ commit }) {
    try {
      const res = await UserService.fetchUsers();

      console.log(res); // TEST

      const users = res.data;

      commit("SET_USERS", users);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  }
};
