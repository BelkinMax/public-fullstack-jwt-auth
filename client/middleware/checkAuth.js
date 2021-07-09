export default async function({ store, redirect }) {
  if (localStorage.getItem("token")) {
    await store._actions["user/checkAuth"][0]();
  }

  const isAuth = store.state.user.isAuth;

  if (!isAuth) {
    return redirect("/login");
  }
}
