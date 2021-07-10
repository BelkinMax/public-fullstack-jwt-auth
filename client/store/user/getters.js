const isAuth = state => {
  return state.isAuth;
};

const user = state => {
  return state.user;
};

const userError = state => {
  return state.error;
};

export default {
  isAuth,
  user,
  userError
};
