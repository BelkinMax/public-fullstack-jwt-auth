import $api from "../http";

export default class UserService {
  static async fetchUsers(params) {
    const { excludeCurrent } = params;

    if (excludeCurrent) {
      return $api.get("/clientUsers");
    } else {
      return $api.get("/users");
    }
  }
}
