const authMutations = {
  setAuthUser(state, userObj) {
    state.authUser = userObj
  },
  clearAuthUser(state) {
    state.authUser = null
  }
}

export default authMutations
