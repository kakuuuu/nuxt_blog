export const state = () => ({
  isLogin: false
});

export const mutations = {
  SET_isLogin(state, value) {
    state.isLogin = value;
  }
};