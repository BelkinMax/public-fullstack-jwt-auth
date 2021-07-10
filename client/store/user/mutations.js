const SET_AUTH = (state, payload) => {
  state.isAuth = payload;
};

const SET_USER = (state, payload) => {
  state.user = payload;
};

const SET_ERROR = (state, payload) => {
  state.error = payload
}

export default {
  SET_AUTH,
  SET_USER,
  SET_ERROR
};
