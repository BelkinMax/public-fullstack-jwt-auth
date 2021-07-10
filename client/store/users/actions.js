import UserService from "~/app/services/UserService";

export const actions = {
  handler: () => {},

  async fetchUsers({ commit }, params) {
    const { excludeCurrent } = params;

    try {
      const res = await UserService.fetchUsers({ excludeCurrent });

      console.log(res); // TEST

      const users = res.data;

      commit("SET_USERS", users);
    } catch (e) {
      console.error(e.response?.data?.message);
    }
  }
};
