import $api from "../http";

export default class AuthService {
  static async login(params) {
    const { email, password } = params;

    return $api.post("/login", { email, password });
  }

  static async registration(params) {
    const { email, password } = params;

    return $api.post("/registration", { email, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
