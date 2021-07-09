const SET_IS_AUTH = (state, payload) => {
  state.isAuth = payload;
};

const SET_USER = (state, payload) => {
  state.user = payload;
};

export default {
  SET_IS_AUTH,
  SET_USER
};
